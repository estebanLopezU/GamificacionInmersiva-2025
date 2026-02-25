export interface Level {
  id: number;
  name: string;
  description: string;
  stars: number;
  requirements: string;
  questionsCount: number;
  locked?: boolean;
}

export interface Language {
  id: string;
  name: string;
  color: string;
}

export interface ContentItem {
  title: string;
  content: string;
}

export interface Question {
  type: string;
  question: string;
  codeSnippet: string;
  correctCompletion: string;
  explanation: string;
}

export const levels: Level[] = [
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

export const languages: Language[] = [
  { id: 'python', name: 'Python', color: '#3776ab' },
  { id: 'javascript', name: 'JavaScript', color: '#f7df1e' }
];

export const fundamentalsContentByLanguage: Record<string, Record<number, Record<string, ContentItem>>> = {
  javascript: {
    0: {
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
    1: {
      intro: {
        title: "Nivel Programador: Estructuras de Control",
        content: "¡Bienvenido al nivel Programador! Ahora que ya conoces los fundamentos, es hora de aprender a controlar el flujo de tus programas. Aprenderás sobre condicionales múltiples para tomar decisiones complejas, bucles para repetir tareas de forma eficiente y funciones para organizar y reutilizar tu código."
      },
      conditionals: {
        title: "Condicionales Múltiples (if-else if-else)",
        content: `<p>Para tomar decisiones en tu código, usamos condicionales. Cuando tienes múltiples posibilidades, la estructura <code>if-else if-else</code> es perfecta.</p>
        <h4>1. La primera condición: <code>if</code></h4>
        <p>El programa evalúa la condición del <code>if</code>. Si es verdadera, ejecuta su bloque de código y ignora el resto.</p>
        <pre><code>let nota = 85;
if (nota >= 90) {
console.log("Sobresaliente");
}</code></pre>
        <h4>2. Otras posibilidades: <code>else if</code></h4>
        <p>Si la condición del <code>if</code> es falsa, el programa pasa a evaluar la del <code>else if</code>. Puedes tener tantos <code>else if</code> como necesites.</p>
        <pre><code>let nota = 85;
if (nota >= 90) {
console.log("Sobresaliente");
} else if (nota >= 70) {
console.log("Aprobado");
}</code></pre>
        <h4>3. El caso por defecto: <code>else</code></h4>
        <p>Si ninguna de las condiciones anteriores fue verdadera, se ejecuta el bloque del <code>else</code>.</p>
        <pre><code>let nota = 85;
if (nota >= 90) {
console.log("Sobresaliente");
} else if (nota >= 70) {
console.log("Aprobado");
} else {
console.log("Reprobado");
}</code></pre>
        <p><b>En resumen:</b> El programa evalúa las condiciones en orden y ejecuta <b>solo el primer bloque</b> cuya condición sea verdadera.</p>`
      },
      loops: {
        title: "Bucles (for y while)",
        content: `<p>Los bucles te permiten ejecutar un bloque de código repetidamente, lo que es fundamental para automatizar tareas.</p>
        <h4>1. Bucle <code>for</code>: Ideal para cuando sabes cuántas veces repetir</h4>
        <p>El bucle <code>for</code> tiene tres partes: <b>inicialización</b> (se ejecuta una vez), <b>condición</b> (se evalúa antes de cada iteración) y <b>expresión de actualización</b> (se ejecuta al final de cada iteración).</p>
        <pre><code>// Este bucle se ejecutará 5 veces (para i = 0, 1, 2, 3, 4)
for (let i = 0; i < 5; i++) {
console.log("Iteración número: " + i);
}</code></pre>
        <h4>2. Bucle <code>while</code>: Se repite mientras una condición sea verdadera</h4>
        <p>El bucle <code>while</code> es más simple. Solo tiene una condición. Mientras esa condición sea verdadera, el bucle seguirá ejecutándose. ¡Cuidado con no crear un bucle infinito!</p>
        <pre><code>let contador = 0;
while (contador < 5) {
console.log("El contador es: " + contador);
contador++; // Importante: incrementa el contador para que el bucle termine algún día
}</code></pre>`
      },
      functions: {
        title: "Funciones: Reutilizando Código",
        content: `<p>Las funciones son bloques de código reutilizables que realizan una tarea específica. Son la base de la programación modular.</p>
        <h4>1. Definir una función</h4>
        <p>Usa la palabra clave <code>function</code> seguida de un nombre, paréntesis <code>()</code> (que pueden contener parámetros) y llaves <code>{}</code> para el cuerpo de la función.</p>
        <pre><code>// Función 'saludar' que acepta un parámetro llamado 'nombre'
function saludar(nombre) {
// La palabra clave 'return' devuelve un valor
return "Hola, " + nombre + "!";
}</code></pre>
        <h4>2. Llamar (invocar) a una función</h4>
        <p>Para usar una función, simplemente escribes su nombre seguido de paréntesis y le pasas los argumentos que necesita.</p>
        <pre><code>// Llamamos a la función 'saludar' y le pasamos "Ana" como argumento
let mensaje = saludar("Ana");
console.log(mensaje); // Imprime "Hola, Ana!" en la consola</code></pre>
        <p><b>Beneficios:</b> Reutilización de código, organización y facilidad de depuración.</p>`
      }
    }
  },
  python: {
    0: {
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
    },
    1: {
      intro: {
        title: "Nivel Programador: Estructuras de Control",
        content: "¡Bienvenido al nivel Programador! Ahora que ya conoces los fundamentos, es hora de aprender a controlar el flujo de tus programas. Aprenderás sobre condicionales múltiples para tomar decisiones complejas, bucles para repetir tareas de forma eficiente y funciones para organizar y reutilizar tu código."
      },
      conditionals: {
        title: "Condicionales Múltiples (if-elif-else)",
        content: `<p>Para tomar decisiones en tu código, usamos condicionales. Cuando tienes múltiples posibilidades, la estructura <code>if-elif-else</code> es perfecta.</p>
        <h4>1. La primera condición: <code>if</code></h4>
        <p>El programa evalúa la condición del <code>if</code>. Si es verdadera, ejecuta su bloque de código y ignora el resto.</p>
        <pre><code>nota = 85
if nota >= 90:
print("Sobresaliente")</code></pre>
        <h4>2. Otras posibilidades: <code>elif</code></h4>
        <p>Si la condición del <code>if</code> es falsa, el programa pasa a evaluar la del <code>elif</code> (abreviatura de "else if"). Puedes tener tantos <code>elif</code> como necesites.</p>
        <pre><code>nota = 85
if nota >= 90:
print("Sobresaliente")
elif nota >= 70:
print("Aprobado")</code></pre>
        <h4>3. El caso por defecto: <code>else</code></h4>
        <p>Si ninguna de las condiciones anteriores fue verdadera, se ejecuta el bloque del <code>else</code>.</p>
        <pre><code>nota = 85
if nota >= 90:
print("Sobresaliente")
elif nota >= 70:
print("Aprobado")
else:
print("Reprobado")</code></pre>
        <p><b>En resumen:</b> El programa evalúa las condiciones en orden y ejecuta <b>solo el primer bloque</b> cuya condición sea verdadera.</p>`
      },
      loops: {
        title: "Bucles (for y while)",
        content: `<p>Los bucles te permiten ejecutar un bloque de código repetidamente, lo que es fundamental para automatizar tareas.</p>
        <h4>1. Bucle <code>for</code>: Ideal para iterar sobre secuencias</h4>
        <p>En Python, el bucle <code>for</code> se usa comúnmente para iterar sobre una secuencia (como una lista, una tupla o un rango de números).</p>
        <pre><code># Este bucle se ejecutará 5 veces (para i = 0, 1, 2, 3, 4)
for i in range(5):
print(f"Iteración número: {i}")</code></pre>
        <h4>2. Bucle <code>while</code>: Se repite mientras una condición sea verdadera</h4>
        <p>El bucle <code>while</code> es más simple. Solo tiene una condición. Mientras esa condición sea verdadera, el bucle seguirá ejecutándose. ¡Cuidado con no crear un bucle infinito!</p>
        <pre><code>contador = 0
while contador < 5:
print(f"El contador es: {contador}")
contador += 1 # Importante: incrementa el contador para que el bucle termine algún día</code></pre>`
      },
      functions: {
        title: "Funciones: Reutilizando Código",
        content: `<p>Las funciones son bloques de código reutilizables que realizan una tarea específica. Son la base de la programación modular.</p>
        <h4>1. Definir una función</h4>
        <p>Usa la palabra clave <code>def</code> seguida de un nombre, paréntesis <code>()</code> (que pueden contener parámetros) y dos puntos <code>:</code>. El cuerpo de la función va indentado.</p>
        <pre><code># Función 'saludar' que acepta un parámetro llamado 'nombre'
def saludar(nombre):
# La palabra clave 'return' devuelve un valor
return f"Hola, {nombre}!"</code></pre>
        <h4>2. Llamar (invocar) a una función</h4>
        <p>Para usar una función, simplemente escribes su nombre seguido de paréntesis y le pasas los argumentos que necesita.</p>
        <pre><code># Llamamos a la función 'saludar' y le pasamos "Ana" como argumento
mensaje = saludar("Ana")
print(mensaje)  # Imprime "Hola, Ana!" en la consola</code></pre>
        <p><b>Beneficios:</b> Reutilización de código, organización y facilidad de depuración.</p>`
      }
    }
  }
};

export const questionsByLanguage: Record<string, Record<number, Question[]>> = {
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
      { type: "code", question: "Completa el código para un condicional 'else if':", codeSnippet: 'if (edad < 18) { console.log("Menor"); } ___ (edad < 65) { console.log("Adulto"); }', correctCompletion: 'else if', explanation: "'else if' se usa para verificar otra condición si la anterior 'if' fue falsa." },
      { type: "code", question: "Completa el bucle 'for' para que se ejecute 5 veces:", codeSnippet: 'for (let i = 0; i ___ 5; i++) { console.log(i); }', correctCompletion: '<', explanation: "La parte central del bucle 'for' es la condición que se evalúa antes de cada iteración." },
      { type: "code", question: "Completa el bucle 'while' para que se detenga cuando 'count' llegue a 10:", codeSnippet: 'let count = 0; while (count ___ 10) { console.log(count); count++; }', correctCompletion: '<', explanation: "El bucle 'while' continúa mientras la condición especificada sea verdadera." },
      { type: "code", question: "Completa la definición de la función 'sumar':", codeSnippet: 'function sumar(a, ___) { return a + b; }', correctCompletion: 'b', explanation: "Las funciones pueden aceptar múltiples parámetros separados por comas." },
      { type: "code", question: "Completa la llamada a la función 'saludar':", codeSnippet: 'function saludar(nombre) { return "Hola, " + nombre; } let mensaje = ___("Mundo");', correctCompletion: 'saludar', explanation: "Para llamar a una función, simplemente escribes su nombre seguido de paréntesis with los argumentos." },
      { type: "code", question: "Completa el código para agregar un elemento al final de un array:", codeSnippet: 'let colores = ["rojo", "verde"]; colores.___("azul");', correctCompletion: 'push', explanation: "El método 'push()' agrega uno o más elementos al final de un array." },
      { type: "code", question: "Completa el bucle 'for' para iterar sobre un array:", codeSnippet: 'let frutas = ["manzana", "pera"]; for (let i = 0; i < frutas.___; i++) { console.log(frutas[i]); }', correctCompletion: 'length', explanation: "La propiedad 'length' de un array devuelve el número de elementos que contiene." },
      { type: "code", question: "Completa el condicional para verificar si un número es par o impar:", codeSnippet: 'if (numero % 2 ___ 0) { console.log("Par"); } else { console.log("Impar"); }', correctCompletion: '==', explanation: "El operador de módulo (%) devuelve el resto de una división. Si el resto es 0, el número es par." },
      { type: "code", question: "Completa el bucle 'for...of' para iterar sobre los elementos de un array:", codeSnippet: 'let numeros = [1, 2, 3]; for (let num ___ numeros) { console.log(num); }', correctCompletion: 'of', explanation: "El bucle 'for...of' proporciona una forma sencilla de iterar sobre los elementos de un objeto iterable (como un array)." },
      { type: "code", question: "Completa la función para que retorne el cuadrado de un número:", codeSnippet: 'function cuadrado(x) { ___ x * x; }', correctCompletion: 'return', explanation: "'return' se usa dentro de una función para especificar el valor que la función debe devolver." },
      { type: "code", question: "Completa el código para verificar si una variable es de tipo string:", codeSnippet: 'let texto = "Hola"; if (typeof texto ___ "string") { console.log("Es un texto"); }', correctCompletion: '===', explanation: "'typeof' devuelve el tipo de una variable, y '===' comprueba si es igual al valor esperado." },
      { type: "code", question: "Completa el bucle 'do...while' para que se ejecute al menos una vez:", codeSnippet: 'let i = 0; ___ { console.log(i); i++; } while (i < 5);', correctCompletion: 'do', explanation: "El bucle 'do...while' siempre se ejecuta al menos una vez antes de verificar la condición." },
      { type: "code", question: "Completa la función para calcular el área de un rectángulo:", codeSnippet: 'function areaRectangulo(base, altura) { let area = base * altura; ___ area; }', correctCompletion: 'return', explanation: "La función calcula el área y luego usa 'return' para devolver ese valor." },
      { type: "code", question: "Completa el código para encontrar el número mayor entre dos:", codeSnippet: 'function mayor(a, b) { if (a > b) { ___ a; } else { return b; } }', correctCompletion: 'return', explanation: "La función compara 'a' y 'b' y devuelve el mayor de los dos usando 'return'." },
      { type: "code", question: "Completa el bucle 'for' para contar hacia atrás desde 10 hasta 1:", codeSnippet: 'for (let i = 10; i ___ 1; i--) { console.log(i); }', correctCompletion: '>=', explanation: "El bucle comienza en 10 y continúa mientras 'i' sea mayor o igual a 1, decrementando 'i' en cada iteración." }
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
      { type: "code", question: "Completa el código para un condicional 'elif':", codeSnippet: 'if edad < 18: print("Menor") ___ edad < 65: print("Adulto")', correctCompletion: 'elif', explanation: "'elif' en Python es la abreviatura de 'else if' y se usa para verificar múltiples condiciones." },
      { type: "code", question: "Completa el bucle 'for' para que se ejecute 5 veces:", codeSnippet: 'for i in range(5): print(i)', correctCompletion: 'range', explanation: "La función range(5) genera una secuencia de números del 0 al 4, que el bucle 'for' utiliza para iterar." },
      { type: "code", question: "Completa el bucle 'while' para que se detenga cuando 'count' llegue a 10:", codeSnippet: 'count = 0 while count ___ 10: print(count) count += 1', correctCompletion: '<', explanation: "El bucle 'while' continúa mientras la condición especificada sea verdadera." },
      { type: "code", question: "Completa la definición de la función 'sumar':", codeSnippet: 'def sumar(a, ___): return a + b', correctCompletion: 'b', explanation: "Las funciones pueden aceptar múltiples parámetros separados por comas." },
      { type: "code", question: "Completa la llamada a la función 'saludar':", codeSnippet: 'def saludar(nombre): return f"Hola, {nombre}" mensaje = ___("Mundo")', correctCompletion: 'saludar', explanation: "Para llamar a una función, simplemente escribes su nombre seguido de paréntesis with los argumentos." },
      { type: "code", question: "Completa el código para agregar un elemento al final de una lista:", codeSnippet: 'colores = ["rojo", "verde"] colores.___("azul")', correctCompletion: 'append', explanation: "El método 'append()' agrega un elemento al final de una lista." },
      { type: "code", question: "Completa el bucle 'for' para iterar sobre una lista:", codeSnippet: 'frutas = ["manzana", "pera"] for fruta ___ frutas: print(fruta)', correctCompletion: 'in', explanation: "El bucle 'for' en Python usa la sintaxis 'for variable in iterable' para iterar sobre cada elemento." },
      { type: "code", question: "Completa el condicional para verificar si un número es par o impar:", codeSnippet: 'if numero % 2 ___ 0: print("Par") else: print("Impar")', correctCompletion: '==', explanation: "El operador de módulo (%) devuelve el resto de una división. Si el resto es 0, el número es par." },
      { type: "code", question: "Completa la función para que retorne el cuadrado de un número:", codeSnippet: 'def cuadrado(x): ___ x * x', correctCompletion: 'return', explanation: "'return' se usa dentro de una función para especificar el valor que la función debe devolver." },
      { type: "code", question: "Completa el código para verificar si una variable es de tipo string:", codeSnippet: 'texto = "Hola" if isinstance(texto, ___): print("Es un texto")', correctCompletion: 'str', explanation: "La función isinstance() comprueba si un objeto es una instancia de una clase o tipo de datos determinado." },
      { type: "code", question: "Completa el bucle 'while' para que se ejecute al menos una vez:", codeSnippet: '# Python no tiene do-while, pero se puede simular\ni = 0\nwhile True:\n  print(i)\n  i += 1\n  if i ___ 5:\n    break', correctCompletion: '>=', explanation: "Se simula un bucle 'do-while' usando 'while True' y una condición 'break' para salir." },
      { type: "code", question: "Completa la función para calcular el área de un rectángulo:", codeSnippet: 'def area_rectangulo(base, altura): area = base * altura ___ area', correctCompletion: 'return', explanation: "La función calcula el área y luego usa 'return' para devolver ese valor." },
      { type: "code", question: "Completa el código para encontrar el número mayor entre dos:", codeSnippet: 'def mayor(a, b): if a > b: ___ a else: return b', correctCompletion: 'return', explanation: "La función compara 'a' y 'b' y devuelve el mayor de los dos usando 'return'." },
      { type: "code", question: "Completa el bucle 'for' para contar hacia atrás desde 10 hasta 1:", codeSnippet: 'for i in range(10, 0, ___): print(i)', correctCompletion: '-1', explanation: "La función range(start, stop, step) puede usar un paso negativo para contar hacia atrás." }
    ]
  }
};
