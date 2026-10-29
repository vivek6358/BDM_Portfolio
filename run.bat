@echo off
title Vivek Bandari Portfolio - Dev Server
echo ============================================================
echo   VIVEK BANDARI - PORTFOLIO DEV SERVER
echo ============================================================
echo.
cd /d "%~dp0"
set "PATH=%LOCALAPPDATA%\Microsoft\WinGet\Packages\OpenJS.NodeJS.LTS_Microsoft.Winget.Source_8wekyb3d8bbwe\node-v24.20.0-win-x64;%PATH%"

echo Starting local server on http://localhost:3000 ...
start http://localhost:3000

echo.
cmd /c "npm run dev"
pause
