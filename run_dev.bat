@echo off

REM Run FastAPI properly from the project root
cd fastapi
start /B python -m app.main
set BACKEND_PID=%ERRORLEVEL%
cd ..

REM Start frontend with Electron Forge using npx
cd ui
call npx electron-forge start

REM After frontend closes, kill backend
taskkill /F /PID %BACKEND_PID%
