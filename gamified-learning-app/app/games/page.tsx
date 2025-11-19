"use client";
import { useState, useEffect } from "react";
import Head from "next/head";
import styles from '../Home.module.css';

export default function Games() {
  const [mounted, setMounted] = useState(false);
  const [currentView, setCurrentView] = useState('welcome');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(0);
  const [gamePhase, setGamePhase] = useState('intro');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState(false);
  const [codeInput, setCodeInput] = useState('');
  
  const [unlockedLevels, setUnlockedLevels] = useState<number[]>([0]);
  const [levelScores, setLevelScores] = useState<Record<string, number>>({});

  useEffect(() => {
    setMounted(true);
    const savedProgress = localStorage.getItem('gameProgress');
    if (savedProgress) {
      const progress = JSON.parse(savedProgress);
      setUnlockedLevels(progress.unlockedLevels || [0]);
      setLevelScores(progress.levelScores || {});
    }
  }, []);

  useEffect(() => {
    if (mounted) {
      localStorage.setItem('gameProgress', JSON.stringify({
        unlockedLevels,
        levelScores
      }));
    }
  }, [unlockedLevels, levelScores, mounted]);

  const levels = [
    { 
      id: 1, 
      name: "APRENDIZ", 
      description: "Resuelve problemas simples de 1-2 pasos", 
      stars: 1,
      requirements: "Variables, tipos de datos, condicionales simples",
      questionsCount: 15
    },
    { 
      id: 2, 
      name: "PROGRAMADOR", 
      description: "Crea programas con múltiples condiciones y repeticiones", 
      stars: 2,
      requirements: "Condicionales múltiples, bucles, funciones simples",
      questionsCount: 15,
      locked: true
    },
    { 
      id: 3, 
      name: "EXPERTO", 
      description: "Desarrolla programas robustos con manejo de errores y funciones avanzadas", 
      stars: 3,
      requirements: "Funciones avanzadas, manejo de errores, operadores complejos",
      questionsCount: 15,
      locked: true
    }
  ];

  const languages = [
    { id: 'python', name: 'Python', color: '#3776ab' },
    { id: 'javascript', name: 'JavaScript', color: '#f7df1e' }
  ];

  const fundamentalsContentByLanguage: Record<string, Record<string, { title: string; content: string }>> = {
    javascript: {
      intro: {
        title: "¿Qué es la Programación?",
        content: "La programación es el proceso de crear instrucciones que una computadora puede seguir para realizar tareas específicas. Es como escribir una receta detallada que la computadora ejecuta paso a paso."
      },
      helloworld: {
        title: "Hola Mundo en JavaScript",
        content: `El programa 'Hola Mundo' es tradicionalmente el primer programa. En JavaScript, para mostrar un mensaje en la consola del navegador, se usa <code>console.log()</code>.<pre><code>console.log("Hola Mundo");</code></pre>`
      },
      operations: {
        title: "Operaciones Aritméticas en JavaScript",
        content: `JavaScript permite realizar operaciones matemáticas:<ul><li>Suma: <code>5 + 3</code></li><li>Resta: <code>10 - 4</code></li><li>Multiplicación: <code>4 * 5</code></li><li>División: <code>20 / 4</code></li><li>Raíz cuadrada: <code>Math.sqrt(25)</code></li></ul>`
      },
      variables: {
        title: "Variables en JavaScript",
        content: `En JavaScript, se usan <code>let</code> o <code>const</code> para declarar variables.<ul><li>Número: <code>let edad = 25;</code></li><li>Texto: <code>let nombre = "Ana";</code></li><li>Constante: <code>const PI = 3.14;</code></li></ul>`
      },
      text: {
        title: "Manipulación de Texto en JavaScript",
        content: `JavaScript ofrece métodos para trabajar con cadenas de texto (strings).<ul><li>Concatenación: <code>"Hola" + " Mundo"</code></li><li>Longitud: <code>"Hola".length</code></li><li>Mayúsculas: <code>"hola".toUpperCase()</code></li></ul>`
      }
    },
    python: {
      intro: {
        title: "¿Qué es la Programación?",
        content: "La programación es el proceso de crear instrucciones que una computadora puede seguir para realizar tareas específicas. Es como escribir una receta detallada que la computadora ejecuta paso a paso."
      },
      helloworld: {
        title: "Hola Mundo en Python",
        content: `El programa 'Hola Mundo' es tradicionalmente el primer programa. En Python, para mostrar un mensaje en la pantalla, se usa la función <code>print()</code>.<pre><code>print("Hola Mundo")</code></pre>`
      },
      operations: {
        title: "Operaciones Aritméticas en Python",
        content: `Python permite realizar operaciones matemáticas de forma muy intuitiva:<ul><li>Suma: <code>5 + 3</code></li><li>Resta: <code>10 - 4</code></li><li>Multiplicación: <code>4 * 5</code></li><li>División: <code>20 / 4</code></li><li>Raíz cuadrada: <code>25 ** 0.5</code></li></ul>`
      },
      variables: {
        title: "Variables en Python",
        content: `En Python, no necesitas palabras clave para declarar variables. Simplemente les asignas un nombre y un valor.<ul><li>Número: <code>edad = 25</code></li><li>Texto: <code>nombre = "Ana"</code></li><li>Constante (por convención): <code>PI = 3.14</code></li></ul>`
      },
      text: {
        title: "Manipulación de Texto en Python",
        content: `Python ofrece funciones y métodos para trabajar con cadenas de texto (strings).<ul><li>Concatenación: <code>"Hola" + " Mundo"</code></li><li>Longitud: <code>len("Hola")</code></li><li>Mayúsculas: <code>"hola".upper()</code></li></ul>`
      }
    }
  };

  const questionsByLanguage: Record<string, Record<number, { type: string; question: string; codeSnippet: string; correctCompletion: string; explanation: string }[]>> = {
    javascript: {
      0: [
        { type: "code", question: "Completa el código para mostrar un mensaje en la consola:", codeSnippet: 'console.___("Hola Mundo");', correctCompletion: 'log', explanation: "En JavaScript, console.log() se utiliza para mostrar mensajes en la consola del navegador." },
        { type: "code", question: "Completa el código para crear una variable llamada 'edad' con valor 30:", codeSnippet: '___ edad = 30;', correctCompletion: 'let', explanation: "En JavaScript, se usa 'let' para declarar variables que pueden cambiar su valor." },
        { type: "code", question: "Completa el código para declarar una constante:", codeSnippet: '___ PI = 3.1416;', correctCompletion: 'const', explanation: "En JavaScript, 'const' se usa para declarar variables cuyo valor no cambiará." },
        { type: "code", question: "Completa el código para sumar dos números:", codeSnippet: 'let resultado = 5 ___ 3;', correctCompletion: '+', explanation: "El operador '+' se usa para sumar números en JavaScript." },
        { type: "code", question: "Completa el código para verificar si un número es mayor que otro:", codeSnippet: 'if (10 ___ 5) { console.log("Mayor"); }', correctCompletion: '>', explanation: "El operador '>' se usa para comparar si un valor es mayor que otro." },
        { type: "code", question: "Completa el código para obtener la longitud de un string:", codeSnippet: 'let longitud = "Hola".___;', correctCompletion: 'length', explanation: "La propiedad 'length' devuelve el número de caracteres en un string." },
        { type: "code", question: "Completa el código para convertir texto a mayúsculas:", codeSnippet: 'let mayusculas = "hola".___();', correctCompletion: 'toUpperCase', explanation: "El método toUpperCase() convierte todos los caracteres a mayúsculas." },
        { type: "code", question: "Completa el código para crear un array:", codeSnippet: 'let frutas = ["manzana", "banana", ___];', correctCompletion: '"naranja"', explanation: "Los arrays en JavaScript se crean con corchetes y los elementos separados por comas." },
        { type: "code", question: "Completa el código para acceder al primer elemento de un array:", codeSnippet: 'let primero = numeros[___];', correctCompletion: '0', explanation: "Los arrays en JavaScript son indexados desde 0, por lo que el primer elemento está en el índice 0." },
        { type: "code", question: "Completa el código para crear una función simple:", codeSnippet: '___ saludar() { return "Hola"; }', correctCompletion: 'function', explanation: "La palabra clave 'function' se usa para declarar una función en JavaScript." },
        { type: "code", question: "Completa el código para hacer un comentario de una línea:", codeSnippet: '___ Esto es un comentario', correctCompletion: '//', explanation: "Los comentarios de una línea en JavaScript comienzan con //" },
        { type: "code", question: "Completa el código para verificar igualdad estricta:", codeSnippet: 'if (5 ___ "5") { console.log("Iguales"); }', correctCompletion: '===', explanation: "El operador '===' verifica igualdad tanto de valor como de tipo." },
        { type: "code", question: "Completa el código para obtener el tipo de dato:", codeSnippet: 'let tipo = typeof ___;', correctCompletion: '42', explanation: "typeof devuelve el tipo de dato de una variable o valor." },
        { type: "code", question: "Completa el código para hacer un bucle for:", codeSnippet: '___ (let i = 0; i < 5; i++) { console.log(i); }', correctCompletion: 'for', explanation: "La palabra clave 'for' se usa para crear bucles que se repiten un número determinado de veces." },
        { type: "code", question: "Completa el código para retornar un valor de una función:", codeSnippet: 'function duplicar(x) { ___ x * 2; }', correctCompletion: 'return', explanation: "La palabra clave 'return' se usa para devolver un valor desde una función." }
      ],
      1: [
        { type: "code", question: "Completa el código para un bucle while:", codeSnippet: '___ (contador < 10) { contador++; }', correctCompletion: 'while', explanation: "El bucle 'while' se ejecuta mientras la condición sea verdadera." },
        { type: "code", question: "Completa el código para un condicional if-else:", codeSnippet: 'if (edad >= 18) { console.log("Mayor"); } ___ { console.log("Menor"); }', correctCompletion: 'else', explanation: "'else' se ejecuta cuando la condición del 'if' es falsa." },
        { type: "code", question: "Completa el código para un condicional else if:", codeSnippet: 'if (nota >= 90) { console.log("A"); } ___ if (nota >= 80) { console.log("B"); }', correctCompletion: 'else', explanation: "'else if' permite verificar múltiples condiciones en secuencia." },
        { type: "code", question: "Completa el código para crear una función con parámetros:", codeSnippet: 'function sumar(a, ___) { return a + b; }', correctCompletion: 'b', explanation: "Las funciones pueden recibir múltiples parámetros separados por comas." },
        { type: "code", question: "Completa el código para agregar un elemento a un array:", codeSnippet: 'numeros.___(5);', correctCompletion: 'push', explanation: "El método push() agrega un elemento al final del array." },
        { type: "code", question: "Completa el código para eliminar el último elemento de un array:", codeSnippet: 'let ultimo = numeros.___();', correctCompletion: 'pop', explanation: "El método pop() elimina y devuelve el último elemento del array." },
        { type: "code", question: "Completa el código para unir todos los elementos de un array:", codeSnippet: 'let texto = palabras.___(" ");', correctCompletion: 'join', explanation: "El método join() une todos los elementos del array en un string." },
        { type: "code", question: "Completa el código para crear un objeto:", codeSnippet: 'let persona = { nombre: "Juan", ___: 30 };', correctCompletion: 'edad', explanation: "Los objetos en JavaScript tienen propiedades con pares clave-valor." },
        { type: "code", question: "Completa el código para acceder a una propiedad de un objeto:", codeSnippet: 'let nombre = persona.___;', correctCompletion: 'nombre', explanation: "Se puede acceder a las propiedades de un objeto usando notación de punto." },
        { type: "code", question: "Completa el código para manejar errores:", codeSnippet: '___ { códigoRiesgoso(); } ___ (error) { console.log(error); }', correctCompletion: 'try catch', explanation: "try-catch permite manejar errores sin que el programa se detenga." },
        { type: "code", question: "Completa el código para convertir string a número:", codeSnippet: 'let numero = ___("123");', correctCompletion: 'parseInt', explanation: "parseInt() convierte una cadena de texto a un número entero." },
        { type: "code", question: "Completa el código para verificar si un array incluye un elemento:", codeSnippet: 'let existe = numeros.___(5);', correctCompletion: 'includes', explanation: "El método includes() verifica si un elemento existe en el array." },
        { type: "code", question: "Completa el código para obtener el valor absoluto:", codeSnippet: 'let absoluto = Math.___(-5);', correctCompletion: 'abs', explanation: "Math.abs() devuelve el valor absoluto de un número." },
        { type: "code", question: "Completa el código para generar un número aleatorio:", codeSnippet: 'let aleatorio = Math.___();', correctCompletion: 'random', explanation: "Math.random() genera un número aleatorio entre 0 y 1." },
        { type: "code", question: "Completa el código para redondear un número:", codeSnippet: 'let redondeado = Math.___(3.7);', correctCompletion: 'round', explanation: "Math.round() redondea un número al entero más cercano." }
      ],
      2: [
        { type: "code", question: "Completa el código para una función flecha:", codeSnippet: 'const sumar = (a, b) ___ a + b;', correctCompletion: '=>', explanation: "Las funciones flecha usan '=>' para definir el cuerpo de la función." },
        { type: "code", question: "Completa el código para filtrar un array:", codeSnippet: 'let pares = numeros.___(n => n % 2 === 0);', correctCompletion: 'filter', explanation: "El método filter() crea un nuevo array con elementos que cumplen una condición." },
        { type: "code", question: "Completa el código para mapear un array:", codeSnippet: 'let cuadrados = numeros.___(n => n * n);', correctCompletion: 'map', explanation: "El método map() crea un nuevo array aplicando una función a cada elemento." },
        { type: "code", question: "Completa el código para reducir un array:", codeSnippet: 'let suma = numeros.___((acc, n) => acc + n, 0);', correctCompletion: 'reduce', explanation: "El método reduce() aplica una función para reducir el array a un solo valor." },
        { type: "code", question: "Completa el código para una promesa:", codeSnippet: 'new ___((resolve, reject) => { resolve("Éxito"); });', correctCompletion: 'Promise', explanation: "Las Promesas manejan operaciones asíncronas en JavaScript." },
        { type: "code", question: "Completa el código para usar async/await:", codeSnippet: 'async function fetchData() { let data = await fetch(url); ___ data.json(); }', correctCompletion: 'return', explanation: "async/await simplifica el trabajo con operaciones asíncronas." },
        { type: "code", question: "Completa el código para una clase:", codeSnippet: '___ Persona { constructor(nombre) { this.nombre = nombre; } }', correctCompletion: 'class', explanation: "Las clases en JavaScript permiten crear objetos con propiedades y métodos." },
        { type: "code", question: "Completa el código para herencia de clases:", codeSnippet: 'class Estudiante ___ Persona { constructor(nombre, grado) { super(nombre); } }', correctCompletion: 'extends', explanation: "La palabra clave 'extends' permite que una clase herede de otra." },
        { type: "code", question: "Completa el código para una expresión regular:", codeSnippet: 'let regex = /___/; // para encontrar números', correctCompletion: '\\d', explanation: "\\d en expresiones regulares representa cualquier dígito." },
        { type: "code", question: "Completa el código para usar destructuring de objetos:", codeSnippet: 'let { nombre, ___ } = persona;', correctCompletion: 'edad', explanation: "El destructuring permite extraer propiedades de objetos en variables." },
        { type: "code", question: "Completa el código para el operador spread:", codeSnippet: 'let newArray = [...___, 4, 5];', correctCompletion: 'array', explanation: "El operador spread (...) expande un array en elementos individuales." },
        { type: "code", question: "Completa el código para una función recursiva:", codeSnippet: 'function factorial(n) { if (n <= 1) ___ 1; return n * factorial(n - 1); }', correctCompletion: 'return', explanation: "Una función recursiva se llama a sí misma hasta cumplir una condición base." },
        { type: "code", question: "Completa el código para un closure:", codeSnippet: 'function crearContador() { let count = 0; return function() { ___ count++; }; }', correctCompletion: 'return', explanation: "Un closure permite a una función acceder a variables de su ámbito exterior." },
        { type: "code", question: "Completa el código para el operador ternario:", codeSnippet: 'let resultado = (edad >= 18) ? "Mayor" : ___;', correctCompletion: '"Menor"', explanation: "El operador ternario es una forma concisa de escribir un if-else." },
        { type: "code", question: "Completa el código para verificar si una variable es null:", codeSnippet: 'if (variable ___ null) { console.log("Es null"); }', correctCompletion: '===', explanation: "Se usa el operador de igualdad estricta para verificar si una variable es null." }
      ]
    },
    python: {
      0: [
        { type: "code", question: "Completa el código para mostrar un mensaje en pantalla:", codeSnippet: '___("Hola Mundo")', correctCompletion: 'print', explanation: "En Python, la función print() se utiliza para mostrar texto en la consola." },
        { type: "code", question: "Completa el código para crear una variable llamada 'edad' con valor 30:", codeSnippet: '___ = 30', correctCompletion: 'edad', explanation: "En Python, se crea una variable simplemente asignándole un nombre y un valor." },
        { type: "code", question: "Completa el código para sumar dos números:", codeSnippet: 'resultado = 5 ___ 3', correctCompletion: '+', explanation: "El operador '+' se usa para sumar números en Python." },
        { type: "code", question: "Completa el código para verificar si un número es mayor que otro:", codeSnippet: 'if 10 ___ 5: print("Mayor")', correctCompletion: '>', explanation: "El operador '>' se usa para comparar si un valor es mayor que otro." },
        { type: "code", question: "Completa el código para obtener la longitud de un string:", codeSnippet: 'longitud = ___("Hola")', correctCompletion: 'len', explanation: "La función len() devuelve el número de caracteres en un string." },
        { type: "code", question: "Completa el código para convertir texto a mayúsculas:", codeSnippet: 'mayusculas = "hola".___()', correctCompletion: 'upper', explanation: "El método upper() convierte todos los caracteres a mayúsculas." },
        { type: "code", question: "Completa el código para crear una lista:", codeSnippet: 'frutas = ["manzana", "banana", ___]', correctCompletion: '"naranja"', explanation: "Las listas en Python se crean con corchetes y los elementos separados por comas." },
        { type: "code", question: "Completa el código para acceder al primer elemento de una lista:", codeSnippet: 'primero = numeros[___]', correctCompletion: '0', explanation: "Las listas en Python son indexadas desde 0, por lo que el primer elemento está en el índice 0." },
        { type: "code", question: "Completa el código para definir una función simple:", codeSnippet: '___ saludar(): return "Hola"', correctCompletion: 'def', explanation: "La palabra clave 'def' se usa para definir una función en Python." },
        { type: "code", question: "Completa el código para hacer un comentario:", codeSnippet: '___ Esto es un comentario', correctCompletion: '#', explanation: "Los comentarios en Python comienzan con el símbolo #" },
        { type: "code", question: "Completa el código para verificar igualdad:", codeSnippet: 'if 5 ___ 5: print("Iguales")', correctCompletion: '==', explanation: "El operador '==' verifica si dos valores son iguales." },
        { type: "code", question: "Completa el código para obtener el tipo de dato:", codeSnippet: 'tipo = ___(42)', correctCompletion: 'type', explanation: "La función type() devuelve el tipo de dato de una variable o valor." },
        { type: "code", question: "Completa el código para un bucle for:", codeSnippet: '___ i in range(5): print(i)', correctCompletion: 'for', explanation: "La palabra clave 'for' se usa para crear bucles que iteran sobre una secuencia." },
        { type: "code", question: "Completa el código para retornar un valor de una función:", codeSnippet: 'def duplicar(x): ___ x * 2', correctCompletion: 'return', explanation: "La palabra clave 'return' se usa para devolver un valor desde una función." },
        { type: "code", question: "Completa el código para convertir string a entero:", codeSnippet: 'numero = ___("123")', correctCompletion: 'int', explanation: "La función int() convierte una cadena de texto a un número entero." }
      ],
      1: [
        { type: "code", question: "Completa el código para un bucle while:", codeSnippet: '___ contador < 10: contador += 1', correctCompletion: 'while', explanation: "El bucle 'while' se ejecuta mientras la condición sea verdadera." },
        { type: "code", question: "Completa el código para un condicional if-else:", codeSnippet: 'if edad >= 18: print("Mayor") ___: print("Menor")', correctCompletion: 'else', explanation: "'else' se ejecuta cuando la condición del 'if' es falsa." },
        { type: "code", question: "Completa el código para un condicional elif:", codeSnippet: 'if nota >= 90: print("A") ___ nota >= 80: print("B")', correctCompletion: 'elif', explanation: "'elif' permite verificar múltiples condiciones en secuencia." },
        { type: "code", question: "Completa el código para una función con parámetros:", codeSnippet: 'def sumar(a, ___): return a + b', correctCompletion: 'b', explanation: "Las funciones pueden recibir múltiples parámetros separados por comas." },
        { type: "code", question: "Completa el código para agregar un elemento a una lista:", codeSnippet: 'numeros.___(5)', correctCompletion: 'append', explanation: "El método append() agrega un elemento al final de la lista." },
        { type: "code", question: "Completa el código para eliminar el último elemento de una lista:", codeSnippet: 'ultimo = numeros.___()', correctCompletion: 'pop', explanation: "El método pop() elimina y devuelve el último elemento de la lista." },
        { type: "code", question: "Completa el código para unir elementos de una lista:", codeSnippet: 'texto = " ".___(palabras)', correctCompletion: 'join', explanation: "El método join() une todos los elementos de la lista en un string." },
        { type: "code", question: "Completa el código para crear un diccionario:", codeSnippet: 'persona = {"nombre": "Juan", ___: 30}', correctCompletion: '"edad"', explanation: "Los diccionarios en Python tienen pares clave-valor." },
        { type: "code", question: "Completa el código para acceder a un valor de un diccionario:", codeSnippet: 'nombre = persona["___"]', correctCompletion: 'nombre', explanation: "Se puede acceder a los valores de un diccionario usando su clave entre corchetes." },
        { type: "code", question: "Completa el código para manejar excepciones:", codeSnippet: '___: código_riesgoso() ___ Exception as e: print(e)', correctCompletion: 'try except', explanation: "try-except permite manejar errores sin que el programa se detenga." },
        { type: "code", question: "Completa el código para convertir string a flotante:", codeSnippet: 'numero = ___("3.14")', correctCompletion: 'float', explanation: "La función float() convierte una cadena de texto a un número decimal." },
        { type: "code", question: "Completa el código para verificar si un elemento está en una lista:", codeSnippet: 'existe = 5 ___ numeros', correctCompletion: 'in', explanation: "El operador 'in' verifica si un elemento existe en la lista." },
        { type: "code", question: "Completa el código para obtener el valor absoluto:", codeSnippet: 'absoluto = ___(-5)', correctCompletion: 'abs', explanation: "La función abs() devuelve el valor absoluto de un número." },
        { type: "code", question: "Completa el código para generar un número aleatorio:", codeSnippet: 'import random; aleatorio = random.___()', correctCompletion: 'random', explanation: "random.random() genera un número aleatorio entre 0 y 1." },
        { type: "code", question: "Completa el código para redondear un número:", codeSnippet: 'redondeado = ___(3.7)', correctCompletion: 'round', explanation: "La función round() redondea un número al entero más cercano." }
      ],
      2: [
        { type: "code", question: "Completa el código para una función lambda:", codeSnippet: 'sumar = ___ a, b: a + b', correctCompletion: 'lambda', explanation: "Las funciones lambda son funciones anónimas definidas con la palabra clave lambda." },
        { type: "code", question: "Completa el código para filtrar una lista:", codeSnippet: 'pares = list(___(lambda x: x % 2 == 0, numeros))', correctCompletion: 'filter', explanation: "La función filter() crea una lista con elementos que cumplen una condición." },
        { type: "code", question: "Completa el código para mapear una lista:", codeSnippet: 'cuadrados = list(___(lambda x: x * x, numeros))', correctCompletion: 'map', explanation: "La función map() aplica una función a cada elemento de una lista." },
        { type: "code", question: "Completa el código para reducir una lista:", codeSnippet: 'from functools import ___; suma = reduce(lambda a, b: a + b, numeros)', correctCompletion: 'reduce', explanation: "La función reduce() aplica una función para reducir la lista a un solo valor." },
        { type: "code", question: "Completa el código para una lista por comprensión:", codeSnippet: 'cuadrados = [x*x ___ x in range(10)]', correctCompletion: 'for', explanation: "Las listas por comprensión permiten crear listas de forma concisa." },
        { type: "code", question: "Completa el código para definir una clase:", codeSnippet: '___ Persona: def __init__(self, nombre): self.nombre = nombre', correctCompletion: 'class', explanation: "Las clases en Python permiten crear objetos con atributos y métodos." },
        { type: "code", question: "Completa el código para herencia de clases:", codeSnippet: 'class Estudiante(___ Persona): def __init__(self, nombre, grado): super().__init__(nombre)', correctCompletion: 'object', explanation: "La herencia permite que una clase herede atributos y métodos de otra." },
        { type: "code", question: "Completa el código para un decorador:", codeSnippet: '@___ def mi_funcion(): pass', correctCompletion: 'decorador', explanation: "Los decoradores modifican el comportamiento de funciones o métodos." },
        { type: "code", question: "Completa el código para una expresión regular:", codeSnippet: 'import re; pattern = r"___" # para encontrar números', correctCompletion: '\\d', explanation: "\\d en expresiones regulares representa cualquier dígito." },
        { type: "code", question: "Completa el código para desempaquetar una tupla:", codeSnippet: 'nombre, ___ = persona', correctCompletion: 'edad', explanation: "El desempaquetado permite asignar elementos de una tupla a variables." },
        { type: "code", question: "Completa el código para el operador de expansión:", codeSnippet: 'new_list = [*___, 4, 5]', correctCompletion: 'old_list', explanation: "El operador * expande una lista en elementos individuales." },
        { type: "code", question: "Completa el código para una función recursiva:", codeSnippet: 'def factorial(n): if n <= 1: ___ 1; return n * factorial(n-1)', correctCompletion: 'return', explanation: "Una función recursiva se llama a sí misma hasta cumplir una condición base." },
        { type: "code", question: "Completa el código para un closure:", codeSnippet: 'def crear_contador(): count = 0; def incrementar(): nonlocal count; count += 1; ___ count', correctCompletion: 'return', explanation: "Un closure permite a una función acceder a variables de su ámbito exterior." },
        { type: "code", question: "Completa el código para el operador ternario:", codeSnippet: 'resultado = "Mayor" ___ edad >= 18 else "Menor"', correctCompletion: 'if', explanation: "El operador ternario en Python usa la sintaxis 'valor if condicion else valor_falso'." },
        { type: "code", question: "Completa el código para verificar si una variable es None:", codeSnippet: 'if variable ___ None: print("Es None")', correctCompletion: 'is', explanation: "Se usa el operador 'is' para verificar si una variable es None." }
      ]
    }
  };

  const startExperience = () => setCurrentView('language');
  const selectLanguage = (language: string) => { setSelectedLanguage(language); setCurrentView('level'); };
  const selectLevel = (level: number) => { 
    if (unlockedLevels.includes(level)) {
      setSelectedLevel(level); 
      setCurrentView('game'); 
      setGamePhase('intro'); 
    }
  };
  const backToMenu = () => { setCurrentView('welcome'); setSelectedLanguage(''); setSelectedLevel(0); resetGame(); };

  const resetGame = () => {
    setGamePhase('intro'); setCurrentQuestion(0); setScore(0); setAnswers([]);
    setShowFeedback(false); setSelectedAnswer(null); setIsCorrect(false); setCodeInput('');
  };

  const nextPhase = () => {
    if (gamePhase === 'intro') setGamePhase('helloworld');
    else if (gamePhase === 'helloworld') setGamePhase('operations');
    else if (gamePhase === 'operations') setGamePhase('variables');
    else if (gamePhase === 'variables') setGamePhase('text');
    else if (gamePhase === 'text') setGamePhase('questions');
  };

  const handleAnswer = (answerIndex?: number) => {
    const questions = questionsByLanguage[selectedLanguage]?.[selectedLevel] || [];
    const currentQ = questions[currentQuestion];
    if (!currentQ) return;
    
    let correct = false;
    let userAnswer = '';

    if (currentQ.type === 'code') {
      userAnswer = codeInput;
      correct = codeInput === currentQ.correctCompletion;
    } else if (currentQ.type === 'multiple-choice') {
      userAnswer = answerIndex?.toString() || '';
      correct = answerIndex === currentQ.correct;
    }

    setSelectedAnswer(userAnswer);
    setShowFeedback(true);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
    }
    
    setAnswers([...answers, userAnswer]);
  };

  const handleSkip = () => {
    const skippedAnswer = ''; 
    setSelectedAnswer(skippedAnswer);
    setShowFeedback(true);
    setIsCorrect(false); 
    setAnswers([...answers, skippedAnswer]);
    setCodeInput(''); 
  };

  const handleSkipAll = () => {
    const questions = questionsByLanguage[selectedLanguage]?.[selectedLevel] || [];
    const numberOfRemainingQuestions = questions.length - currentQuestion;
    
    const skippedAnswers = new Array(numberOfRemainingQuestions).fill('');
    
    setAnswers([...answers, ...skippedAnswers]);
    
    setGamePhase('results');
  };

  const nextQuestion = () => {
    const questions = questionsByLanguage[selectedLanguage]?.[selectedLevel] || [];
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setShowFeedback(false);
      setSelectedAnswer(null);
      setCodeInput('');
    } else {
      completeGame();
    }
  };
  
  const completeGame = () => {
    const questions = questionsByLanguage[selectedLanguage]?.[selectedLevel] || [];
    const percentage = (score / questions.length) * 100;
    
    const levelKey = `${selectedLanguage}-${selectedLevel}`;
    const newLevelScores = { ...levelScores, [levelKey]: score };
    setLevelScores(newLevelScores);
    
    if (percentage >= 70 && selectedLevel < levels.length - 1) {
      const nextLevel = selectedLevel + 1;
      if (!unlockedLevels.includes(nextLevel)) {
        setUnlockedLevels([...unlockedLevels, nextLevel]);
      }
    }
    
    setGamePhase('results');
  };

  // Obtenemos el contenido y las preguntas del lenguaje y nivel seleccionado
  const fundamentalsContent = fundamentalsContentByLanguage[selectedLanguage]?.[gamePhase] || {};
  const questions = questionsByLanguage[selectedLanguage]?.[selectedLevel] || [];

  // Calcular porcentaje actual basado en el total de 15 preguntas
  const currentPercentage = questions.length > 0 ? (score / questions.length) * 100 : 0;
  const needsToUnlock = 70;
  const isProgressSufficient = currentPercentage >= needsToUnlock;
  const correctAnswersNeeded = Math.ceil((needsToUnlock * questions.length / 100) - score);
  const questionsRemaining = questions.length - currentQuestion - (showFeedback ? 1 : 0);

  return (
    <>
      <Head>
        <title>Minijuego VR/AR — Aprende a Programar</title>
        <script src="https://aframe.io/releases/1.4.0/aframe.min.js"></script>
      </Head>

      <main className="min-h-screen relative overflow-hidden">
        {/* Fondo animado con partículas 3D */}
        <div className="fixed inset-0 z-0">
          {/* Gradiente animado de fondo */}
          <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 animate-gradient-shift"></div>
          
          {/* Partículas flotantes */}
          <div className="absolute inset-0">
            {[...Array(50)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full opacity-60 animate-float-particle"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 5}s`,
                  animationDuration: `${15 + Math.random() * 10}s`
                }}
              />
            ))}
          </div>

          {/* Geometrías animadas de fondo */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-20 left-20 w-32 h-32 border-4 border-cyan-400/20 rounded-full animate-spin-slow"></div>
            <div className="absolute top-40 right-32 w-24 h-24 border-4 border-purple-400/20 rounded-lg animate-bounce-slow"></div>
            <div className="absolute bottom-32 left-40 w-40 h-40 border-4 border-pink-400/20 rotate-45 animate-pulse-slow"></div>
            <div className="absolute bottom-20 right-20 w-28 h-28 border-4 border-yellow-400/20 rounded-full animate-spin-reverse-slow"></div>
          </div>
        </div>

        {/* El video de fondo (solo para menús) */}
        {currentView !== 'game' && (
          <div className="fixed inset-0 z-0">
            <video
              autoPlay
              loop
              muted
              playsInline
              className={`${styles.backgroundVideo} ${mounted ? 'opacity-30' : 'opacity-0'} transition-opacity duration-1000`}
            >
              <source src="/background-video.mp4" type="video/mp4" />
              Tu navegador no soporta videos HTML5.
            </video>
            <div className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/40 z-0 ${mounted ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}></div>
          </div>
        )}

        {/* El contenido de tu página */}
        <div className={`relative z-10 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-10'} transition-all duration-1000`}>
          {/* Encabezado animado */}
          <header className="fixed top-0 left-0 w-full bg-white/10 backdrop-blur-lg border-b border-white/20 shadow-2xl z-30 animate-slide-down">
            <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative group">
                  <img src="/UNAL.webp" alt="Logo UNAL" width={50} height={50} className="hover:rotate-12 transition-all duration-300 drop-shadow-lg group-hover:scale-110" />
                  <div className="absolute inset-0 bg-blue-500/30 rounded-full animate-ping"></div>
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                </div>
                <h1 className="text-2xl font-bold text-white drop-shadow-lg animate-glow">
                  Minijuego VR/AR — Aprende a Programar
                </h1>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110 relative group">
                  Inicio
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
                <a href="/games" className="text-white font-medium relative group">
                  Juegos
                  <span className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg opacity-20 blur group-hover:opacity-40 transition-all duration-300"></span>
                </a>
              </nav>
            </div>
          </header>

          {/* Contenido Principal */}
          <div className="max-w-7xl mx-auto pt-24 px-6 pb-12">
            {/* Vista de Bienvenida */}
            {currentView === 'welcome' && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-12 max-w-3xl animate-fade-in-up border border-white/20 relative overflow-hidden group">
                  {/* Efecto de brillo en el fondo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  
                  <div className="relative z-10">
                    <h2 className="text-5xl font-bold text-white mb-8 animate-slide-in-left">
                      Aprende a Programar en <span className="bg-gradient-to-r from-cyan-400 to-purple-400 bg-clip-text text-transparent">VR/AR</span>
                    </h2>
                    <p className="text-xl text-white/90 mb-10 animate-slide-in-right">
                      Explora un mundo inmersivo mientras dominas el código con experiencias interactivas y gamificadas.
                    </p>
                    <div className="flex gap-4 justify-center">
                      <button 
                        onClick={startExperience}
                        className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-10 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl animate-bounce-slow"
                      >
                        <span className="relative z-10 flex items-center gap-2">
                          <span>Comenzar Aventura</span>
                          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                          </svg>
                        </span>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vista de Selección de Lenguaje */}
            {currentView === 'language' && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-3xl animate-fade-in-up border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-8 animate-slide-in-left">
                    Elige tu Lenguaje
                  </h2>
                  <p className="text-xl text-white/90 mb-10 animate-slide-in-right">
                    Selecciona la tecnología que quieres dominar en tu viaje de aprendizaje.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {languages.map((language, index) => (
                      <button
                        key={language.id}
                        onClick={() => selectLanguage(language.id)}
                        className={`group relative p-8 rounded-2xl shadow-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl border-2 border-transparent hover:border-white/30 animate-fade-in-up`}
                        style={{ 
                          backgroundColor: language.color + '20',
                          animationDelay: `${index * 0.1}s`
                        }}
                      >
                        <div className="relative z-10">
                          <div className="text-4xl font-bold mb-4 transition-all duration-300 group-hover:scale-110" style={{ color: language.color }}>
                            {language.name}
                          </div>
                          <div className="text-white/70 text-sm">
                            {language.id === 'python' ? 'Perfecto para principiantes y ciencia de datos' : 'El lenguaje de la web'}
                          </div>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                      </button>
                    ))}
                  </div>
                  <button 
                    onClick={backToMenu}
                    className="mt-10 text-white/70 hover:text-white transition-all duration-300 hover:scale-110 group relative"
                  >
                    <span className="flex items-center gap-2">
                      <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                      </svg>
                      Volver
                    </span>
                  </button>
                </div>
              </div>
            )}

            {/* Vista de Selección de Nivel */}
            {currentView === 'level' && (
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-4xl animate-fade-in-up w-full border border-white/20">
                  <h2 className="text-4xl font-bold text-white mb-8 animate-slide-in-left">
                    {languages.find(l => l.id === selectedLanguage)?.name} - Niveles
                  </h2>
                  <p className="text-xl text-white/90 mb-10 animate-slide-in-right">
                    Selecciona el nivel de dificultad y comienza tu desafío:
                  </p>
                  <div className="space-y-6 w-full">
                    {levels.map((level, index) => {
                      const isUnlocked = unlockedLevels.includes(index);
                      const levelKey = `${selectedLanguage}-${index}`;
                      const hasScore = levelScores[levelKey] !== undefined;
                      const scorePercentage = hasScore ? (levelScores[levelKey] / level.questionsCount) * 100 : 0;
                      const isCompleted = scorePercentage >= 70;
                      
                      return (
                        <button
                          key={level.id}
                          onClick={() => selectLevel(index)}
                          disabled={!isUnlocked}
                          className={`group relative w-full p-6 rounded-2xl shadow-lg transition-all duration-500 hover:scale-102 hover:shadow-xl border-2 text-left animate-fade-in-up ${
                            isUnlocked 
                              ? 'border-white/20 hover:border-white/40 cursor-pointer hover:bg-white/5' 
                              : 'border-gray-600/30 bg-gray-800/20 cursor-not-allowed opacity-60'
                          }`}
                          style={{ animationDelay: `${index * 0.1}s` }}
                        >
                          <div className="flex items-center">
                            <div className={`w-16 h-16 text-white rounded-2xl flex items-center justify-center font-bold text-2xl mr-6 flex-shrink-0 transition-all duration-300 group-hover:scale-110 ${
                              isUnlocked 
                                ? isCompleted 
                                  ? 'bg-gradient-to-br from-green-500 to-emerald-600 shadow-lg' 
                                  : 'bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg' 
                                : 'bg-gray-600'
                            }`}>
                              {isUnlocked ? (isCompleted ? '✓' : level.id) : '🔒'}
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-2xl font-bold text-white">{level.name}</h3>
                                <div className="flex items-center gap-1">
                                  {Array.from({ length: level.stars }).map((_, i) => (
                                    <span key={i} className={`text-2xl transition-all duration-300 ${isCompleted ? 'text-yellow-400 animate-pulse' : 'text-gray-400'}`}>⭐</span>
                                  ))}
                                </div>
                              </div>
                              <p className="text-white/80 mb-2">{level.description}</p>
                              <p className="text-sm text-white/60">{level.requirements}</p>
                              {hasScore && (
                                <div className="mt-3">
                                  <div className="flex justify-between text-sm mb-2">
                                    <span className="text-white/80">Progreso: {levelScores[levelKey]}/{level.questionsCount}</span>
                                    <span className="font-bold text-white">{scorePercentage.toFixed(0)}%</span>
                                  </div>
                                  <div className="w-full bg-white/20 rounded-full h-3 relative overflow-hidden">
                                    <div 
                                      className={`h-3 rounded-full transition-all duration-700 relative overflow-hidden ${
                                        scorePercentage >= 70 ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                                      }`}
                                      style={{ width: `${scorePercentage}%` }}
                                    >
                                      <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 animate-shimmer"></div>
                                    </div>
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          {isUnlocked && (
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                  <div className="flex justify-between mt-10 w-full">
                    <button 
                      onClick={backToMenu}
                      className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 group relative"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver
                      </span>
                    </button>
                    <div className="text-sm text-white/60 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                      <p>🎯 Completa el 70% de las preguntas para desbloquear el siguiente nivel</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Vista del Juego - Fundamentos de Programación en VR/3D */}
            {currentView === 'game' && selectedLevel === 0 && (
              <div className="relative" style={{ height: '100vh', width: '100vw', position: 'fixed', top: 0, left: 0 }}>
                {/* Escena 3D mejorada con más elementos y animaciones */}
                <a-scene vr-mode-ui="enabled: true" embedded style={{ height: '100%', width: '100%' }}>
                  {/* Cielo animado con gradiente */}
                  <a-sky color="#1a1a2e" material="shader: gradient; topColor: #16213e; bottomColor: #0f3460"></a-sky>
                  
                  {/* Suelo con textura animada */}
                  <a-plane position="0 0 -4" rotation="-90 0 0" width="30" height="30" 
                    color="#7BC8A4" 
                    material="transparent: true; opacity: 0.8"
                    shadow
                    animation="property: material.opacity; to: 0.6; dir: alternate; dur: 3000; loop: true">
                  </a-plane>
                  
                  {/* Elementos 3D animados mejorados */}
                  <a-box position="-3 1.5 -5" rotation="0 45 0" color="#4CC3D9" 
                    shadow 
                    animation="property: rotation; to: 0 405 0; loop: true; dur: 10000"
                    animation__scale="property: scale; to: 1.2 1.2 1.2; dir: alternate; dur: 2000; loop: true">
                  </a-box>
                  
                  <a-sphere position="3 1.25 -5" radius="1.25" color="#EF2D5E" 
                    shadow 
                    animation="property: position; to: 3 2.5 -5; dir: alternate; loop: true; dur: 2000"
                    animation__color="property: color; to: #FF6B6B; dir: alternate; dur: 1500; loop: true">
                  </a-sphere>
                  
                  <a-cylinder position="0 0.75 -3" radius="0.5" height="1.5" color="#FFC65D" 
                    shadow
                    animation="property: rotation; to: 0 0 360; loop: true; dur: 8000">
                  </a-cylinder>
                  
                  {/* Nuevos elementos 3D */}
                  <a-torus position="-5 1 -6" radius="1" radius-tubular="0.2" color="#9B59B6"
                    animation="property: rotation; to: 360 0 0; loop: true; dur: 6000">
                  </a-torus>
                  
                  <a-octahedron position="5 1.5 -6" radius="0.8" color="#E74C3C"
                    animation="property: scale; to: 1.3 1.3 1.3; dir: alternate; dur: 1800; loop: true">
                  </a-octahedron>
                  
                  <a-tetrahedron position="0 2 -8" radius="0.6" color="#3498DB"
                    animation="property: rotation; to: 0 360 360; loop: true; dur: 4000">
                  </a-tetrahedron>
                  
                  {/* Partículas flotantes */}
                  <a-entity position="0 2 -4">
                    <a-sphere radius="0.1" color="#FFD700" 
                      animation="property: position; to: 2 3 -4; dir: alternate; dur: 3000; loop: true"
                      animation__opacity="property: material.opacity; to: 0.3; dir: alternate; dur: 1500; loop: true">
                    </a-sphere>
                    <a-sphere radius="0.08" color="#00FF00" 
                      animation="property: position; to: -2 3 -4; dir: alternate; dur: 2500; loop: true"
                      animation__opacity="property: material.opacity; to: 0.3; dir: alternate; dur: 1200; loop: true">
                    </a-sphere>
                    <a-sphere radius="0.12" color="#FF00FF" 
                      animation="property: position; to: 0 4 -4; dir: alternate; dur: 3500; loop: true"
                      animation__opacity="property: material.opacity; to: 0.3; dir: alternate; dur: 1800; loop: true">
                    </a-sphere>
                  </a-entity>
                  
                  {/* Sistema de partículas */}
                  <a-entity particle-system="preset: snow; particleCount: 200; color: #FFFFFF; size: 0.05"></a-entity>
                </a-scene>

                {/* Overlay HUD (Interfaz del Juego) */}
                <div className={`absolute inset-0 flex z-10 pointer-events-none ${gamePhase === 'results' ? 'items-start justify-center pt-10' : 'items-center justify-center'}`}>
                  {/* Fase de Introducción y Explicaciones */}
                  {(gamePhase === 'intro' || gamePhase === 'helloworld' || gamePhase === 'operations' || gamePhase === 'variables' || gamePhase === 'text') && (
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-4xl mx-auto pointer-events-auto animate-fade-in-up border border-white/20 relative overflow-hidden group">
                      {/* Efecto de brillo */}
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                      
                      <div className="relative z-10">
                        <h3 className="text-4xl font-bold text-white mb-8 animate-slide-in-left">
                          {fundamentalsContent.title}
                        </h3>
                        <div 
                          className="text-lg text-white/90 mb-8 leading-relaxed animate-slide-in-right"
                          dangerouslySetInnerHTML={{ 
                            __html: fundamentalsContent.content?.replace(/<pre><code>/g, '<pre class="bg-black/30 p-4 rounded-lg overflow-x-auto border border-white/20"><code class="text-sm text-cyan-300">').replace(/<\/code><\/pre>/g, '</code></pre>').replace(/<ul>/g, '<ul class="list-disc pl-6 space-y-2 text-white/80">').replace(/<li>/g, '<li>').replace(/<code>/g, '<code class="bg-black/30 px-2 py-1 rounded text-cyan-300">') 
                          }} 
                        />
                        <div className="flex justify-between">
                          <button 
                            onClick={backToMenu}
                            className="group relative text-white/70 hover:text-white transition-all duration-300 hover:scale-110"
                          >
                            <span className="flex items-center gap-2">
                              <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                              </svg>
                              Volver
                            </span>
                          </button>
                          <button 
                            onClick={nextPhase}
                            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              {gamePhase === 'text' ? 'Comenzar Juego' : 'Siguiente'}
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                  
                  {/* Fase de Preguntas */}
                  {gamePhase === 'questions' && (
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-5xl mx-auto text-white pointer-events-auto animate-fade-in-up border border-white/20 relative overflow-hidden">
                      {/* Barra de progreso y porcentaje mejorada */}
                      <div className="mb-8 bg-black/30 rounded-2xl p-6 border border-white/20 relative overflow-hidden">
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50"></div>
                        <div className="relative z-10">
                          <div className="flex justify-between items-center mb-4">
                            <span className="text-lg font-semibold flex items-center gap-2">
                              <svg className="w-6 h-6 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                              </svg>
                              Progreso del Nivel
                            </span>
                            <span className={`text-lg font-bold flex items-center gap-2 ${isProgressSufficient ? 'text-green-400' : 'text-yellow-400'}`}>
                              {currentPercentage.toFixed(1)}% / {needsToUnlock}% necesario
                              {isProgressSufficient && (
                                <svg className="w-6 h-6 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                              )}
                            </span>
                          </div>
                          <div className="w-full bg-white/20 rounded-full h-4 relative overflow-hidden">
                            <div 
                              className={`h-4 rounded-full transition-all duration-700 relative overflow-hidden ${
                                isProgressSufficient ? 'bg-gradient-to-r from-green-500 to-emerald-500' : 'bg-gradient-to-r from-blue-500 to-purple-500'
                              }`}
                              style={{ width: `${Math.min(currentPercentage, 100)}%` }}
                            >
                              <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/30 animate-shimmer"></div>
                            </div>
                            {/* Línea del 70% */}
                            <div 
                              className="absolute top-0 h-4 w-1 bg-yellow-400 shadow-lg shadow-yellow-400/50"
                              style={{ left: `${needsToUnlock}%` }}
                            ></div>
                          </div>
                          <div className="flex justify-between items-center mt-4">
                            <span className="text-sm text-white/80">
                              {score}/{questions.length} respuestas correctas
                            </span>
                            <span className={`text-sm font-medium ${isProgressSufficient ? 'text-green-400' : 'text-gray-400'}`}>
                              {isProgressSufficient 
                                ? '✨ ¡Nivel desbloqueado!' 
                                : correctAnswersNeeded > 0 
                                  ? `🎯 Necesitas ${correctAnswersNeeded} más para desbloquear` 
                                  : `🎯 Necesitas ${Math.ceil(needsToUnlock * questions.length / 100)} correctas en total`
                              }
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex justify-between items-center mb-8">
                        <h3 className="text-3xl font-bold flex items-center gap-3">
                          <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-lg">
                            Pregunta {currentQuestion + 1}
                          </span>
                          <span className="text-white/60">de {questions.length}</span>
                        </h3>
                        <div className="text-2xl font-semibold text-yellow-400 flex items-center gap-2">
                          <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
                          </svg>
                          Puntuación: {score}/{questions.length}
                        </div>
                      </div>
                      
                      <div className="mb-8">
                        <h4 className="text-2xl font-medium text-white mb-6">
                          {questions[currentQuestion]?.question}
                        </h4>
                        
                        <div className="bg-black/40 p-6 rounded-2xl font-mono text-xl mb-6 border border-white/20 relative overflow-hidden">
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                          <pre className="relative z-10">
                            <code className="text-cyan-300">
                              {questions[currentQuestion]?.codeSnippet.split('___').map((part, index) => (
                                <span key={index}>
                                  {part}
                                  {index < questions[currentQuestion]?.codeSnippet.split('___').length - 1 && (
                                    <input
                                      type="text"
                                      value={codeInput}
                                      onChange={(e) => setCodeInput(e.target.value)}
                                      disabled={showFeedback}
                                      className="mx-2 px-3 py-2 rounded-lg bg-white/10 text-white border-2 border-white/30 focus:border-cyan-400 focus:outline-none focus:bg-white/20 transition-all duration-300"
                                      style={{ width: `${Math.max(80, questions[currentQuestion]?.correctCompletion.length * 12)}px` }}
                                      placeholder="?"
                                    />
                                  )}
                                </span>
                              ))}
                            </code>
                          </pre>
                        </div>
                        
                        {!showFeedback && (
                          <div className="flex gap-4 flex-wrap justify-center">
                            <button 
                              onClick={() => handleAnswer()}
                              disabled={!codeInput}
                              className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Verificar Respuesta
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                            </button>
                            <button 
                              onClick={handleSkip}
                              className="group relative bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                                </svg>
                                Omitir Pregunta
                              </span>
                            </button>
                            <button 
                              onClick={handleSkipAll}
                              className="group relative bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
                            >
                              <span className="relative z-10 flex items-center gap-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                                Omitir Todo
                              </span>
                            </button>
                          </div>
                        )}
                      </div>
                      
                      {showFeedback && (
                        <div className={`p-6 rounded-2xl mb-6 relative overflow-hidden animate-slide-up ${
                          isCorrect ? 'bg-gradient-to-r from-green-600/90 to-emerald-600/90' : 'bg-gradient-to-r from-red-600/90 to-pink-600/90'
                        }`}>
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20"></div>
                          <div className="relative z-10">
                            <p className="font-bold text-xl mb-3 flex items-center gap-2">
                              {isCorrect ? (
                                <>
                                  <svg className="w-8 h-8 animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  ¡Excelente! Respuesta Correcta!
                                </>
                              ) : (
                                <>
                                  <svg className="w-8 h-8 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                  </svg>
                                  Incorrecto
                                </>
                              )}
                            </p>
                            <p className="text-lg">
                              {questions[currentQuestion]?.explanation}
                            </p>
                          </div>
                        </div>
                      )}
                      
                      <div className="flex justify-end">
                        {showFeedback && (
                          <button 
                            onClick={nextQuestion}
                            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              {currentQuestion < questions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
                              <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                              </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                  
                  {/* Fase de Resultados */}
                  {gamePhase === 'results' && (
                    <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-5xl mx-auto pointer-events-auto animate-fade-in-up results-container border border-white/20 relative overflow-hidden" style={{ maxHeight: '85vh', overflowY: 'auto' }}>
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10"></div>
                      <div className="relative z-10">
                        <h3 className="text-5xl font-bold text-white mb-8 text-center animate-bounce-slow">
                          🎉 ¡Juego Completado! 🎉
                        </h3>
                        <div className="mb-10 text-center">
                          <div className="text-7xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-6 animate-pulse">
                            {score}/{questions.length}
                          </div>
                          <div className="text-3xl font-semibold mb-6 text-white">{((score / questions.length) * 100).toFixed(0)}%</div>
                          <div className="text-xl text-white/90">
                            {score >= questions.length * 0.7 
                              ? '🏆 ¡Felicidades! Has desbloqueado el siguiente nivel.' 
                              : score >= questions.length * 0.5 
                              ? '👍 Buen trabajo! Tienes una comprensión sólida de los conceptos básicos.' 
                              : score >= questions.length * 0.25
                              ? '📚 Has aprobado, pero considera repasar algunos conceptos.' 
                              : '💪 Necesitas practicar más los fundamentos de programación.'}
                          </div>
                        </div>
                        
                        <div className="space-y-4 mb-10">
                          <h4 className="text-2xl font-semibold text-white mb-6">Revisión de Respuestas:</h4>
                          {questions.map((question, index) => (
                            <div key={index} className={`p-4 rounded-2xl text-left transition-all duration-300 hover:scale-102 ${
                              answers[index] === question.correctCompletion ? 'bg-green-600/30 border border-green-400/50' : 'bg-red-600/30 border border-red-400/50'
                            }`}>
                              <div className="flex items-start">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-4 text-white font-bold text-lg flex-shrink-0 ${
                                  answers[index] === question.correctCompletion ? 'bg-green-500' : 'bg-red-500'
                                }`}>
                                  {answers[index] === question.correctCompletion ? '✓' : '✗'}
                                </div>
                                <div className="flex-1">
                                  <p className="font-medium text-white mb-2">{index + 1}. {question.question}</p>
                                  <p className="text-sm text-white/80">
                                    Tu respuesta: <code className="bg-black/30 px-2 py-1 rounded text-cyan-300">{question.codeSnippet.replace('___', answers[index])}</code>
                                    {answers[index] !== question.correctCompletion && <span className="ml-2">| Respuesta correcta: <code className="bg-green-600/30 px-2 py-1 rounded text-green-300">{question.codeSnippet.replace('___', question.correctCompletion)}</code></span>}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        
                        <div className="flex justify-center gap-6 mt-8">
                          <button 
                            onClick={resetGame}
                            className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full shadow-2xl transition-all duration-300 hover:scale-110 hover:shadow-3xl"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                              </svg>
                              Jugar de Nuevo
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-purple-400 rounded-full opacity-0 group-hover:opacity-30 blur transition-all duration-300"></div>
                          </button>
                          <button 
                            onClick={backToMenu}
                            className="group relative bg-white/20 hover:bg-white/30 text-white font-bold py-3 px-8 rounded-full shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl border border-white/30"
                          >
                            <span className="relative z-10 flex items-center gap-2">
                              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                              </svg>
                              Volver al Menú
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            
            {/* Vista del Juego para otros niveles (placeholder) */}
            {currentView === 'game' && selectedLevel > 0 && (
              <div className="min-h-[80vh] animate-fade-in-up">
                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-6 mb-6 border border-white/20">
                  <div className="flex justify-between items-center">
                    <h2 className="text-3xl font-bold text-white">
                      {languages.find(l => l.id === selectedLanguage)?.name} - {levels[selectedLevel]?.name}
                    </h2>
                    <button 
                      onClick={backToMenu}
                      className="text-white/70 hover:text-white transition-all duration-300 hover:scale-110 group relative"
                    >
                      <span className="flex items-center gap-2">
                        <svg className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Volver al Menú
                      </span>
                    </button>
                  </div>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden shadow-2xl" style={{ height: '70vh' }}>
                  <div className="flex items-center justify-center h-full bg-white/10 backdrop-blur-xl border border-white/20">
                    <div className="text-center p-12">
                      <h3 className="text-4xl font-bold text-white mb-6 animate-pulse">
                        {levels[selectedLevel]?.name}
                      </h3>
                      <p className="text-xl text-white/90 mb-10">
                        Este nivel está en desarrollo. Próximamente podrás disfrutar de una experiencia inmersiva de {levels[selectedLevel]?.description.toLowerCase()}.
                      </p>
                      <div className="flex justify-center">
                        <div className="relative">
                          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-400"></div>
                          <div className="absolute inset-0 rounded-full h-16 w-16 border-t-4 border-b-4 border-purple-400 animate-spin-reverse"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-down {
          from {
            opacity: 0;
            transform: translateY(-30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes slide-in-left {
          from {
            opacity: 0;
            transform: translateX(-30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
        
        @keyframes slide-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes float-particle {
          0%, 100% {
            transform: translateY(0) translateX(0);
            opacity: 0.6;
          }
          25% {
            transform: translateY(-20px) translateX(10px);
            opacity: 1;
          }
          50% {
            transform: translateY(-10px) translateX(-10px);
            opacity: 0.8;
          }
          75% {
            transform: translateY(-30px) translateX(5px);
            opacity: 0.4;
          }
        }
        
        @keyframes spin-slow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        @keyframes spin-reverse-slow {
          from {
            transform: rotate(360deg);
          }
          to {
            transform: rotate(0deg);
          }
        }
        
        @keyframes bounce-slow {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-10px);
          }
        }
        
        @keyframes pulse-slow {
          0%, 100% {
            opacity: 0.3;
            transform: scale(1);
          }
          50% {
            opacity: 0.6;
            transform: scale(1.05);
          }
        }
        
        @keyframes gradient-shift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes glow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(147, 51, 234, 0.5);
          }
          50% {
            text-shadow: 0 0 30px rgba(147, 51, 234, 0.8), 0 0 40px rgba(147, 51, 234, 0.6);
          }
        }
        
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }
        
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        
        .animate-slide-in-left {
          animation: slide-in-left 0.8s ease-out;
        }
        
        .animate-slide-in-right {
          animation: slide-in-right 0.8s ease-out;
        }
        
        .animate-slide-up {
          animation: slide-up 0.5s ease-out;
        }
        
        .animate-float-particle {
          animation: float-particle 20s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse-slow {
          animation: spin-reverse-slow 15s linear infinite;
        }
        
        .animate-bounce-slow {
          animation: bounce-slow 3s ease-in-out infinite;
        }
        
        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }
        
        .animate-gradient-shift {
          background-size: 200% 200%;
          animation: gradient-shift 15s ease infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s ease-in-out infinite;
        }
        
        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse-slow 2s linear infinite;
        }

        /* Estilos para la barra de desplazamiento en la pantalla de resultados */
        .results-container::-webkit-scrollbar {
          width: 10px;
        }
        .results-container::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .results-container::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #3b82f6, #8b5cf6);
          border-radius: 10px;
        }
        .results-container::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #2563eb, #7c3aed);
        }
      `}</style>
    </>
  );
}