@echo off
echo ============================================
echo   Iniciando Plataforma de Gamificacion
echo   Frontend + Backend simultaneamente
echo ============================================
echo.

:: Iniciar Backend Django en una nueva ventana
echo [1/2] Iniciando Backend Django en puerto 8000...
start "Backend Django" cmd /k "cd /d %~dp0 && py manage.py runserver"

:: Esperar 3 segundos para que el backend inicie
timeout /t 3 /nobreak > nul

:: Iniciar Frontend Next.js en una nueva ventana
echo [2/2] Iniciando Frontend Next.js en puerto 3000...
start "Frontend Next.js" cmd /k "cd /d %~dp0\gamified-learning-app && npm run dev"

echo.
echo ============================================
echo   Servidores iniciados correctamente!
echo ============================================
echo.
echo   Backend Django:  http://localhost:8000
echo   Frontend Next.js: http://localhost:3000
echo.
echo   Presiona cualquier tecla para abrir el navegador...
pause > nul

:: Abrir navegador en la pagina principal
start http://localhost:8000

echo.
echo   Navegador abierto. Cierra esta ventana cuando termines.
echo   Los servidores siguen corriendo en sus propias ventanas.
echo.