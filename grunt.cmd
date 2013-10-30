:: ===============================================================
:: A more capable grunt runner, coincidentally also called grunt.
:: https://github.com/eirslett/grunt-runner
:: ===============================================================
@echo off

set GRUNT_DIR=%~dp0

if not exist package.json (
    echo ERROR: No package.json found in %CD%
    exit /b 1
)

:: === Download nvmw ===
if not exist %GRUNT_DIR%\grunt-runner\nvmw\nvmw.bat (
    echo Could not find nvmw, downloading from GitHub
    if not exist %GRUNT_DIR%\grunt-runner\nvmw (
        mkdir %GRUNT_DIR%\grunt-runner\nvmw
    )

    cscript /nologo %GRUNT_DIR%\grunt-runner\download_files.js %GRUNT_DIR%
    if not errorlevel 0 (
        exit /b 1
    )
)

:: === Get the right version of Node ===
FOR /F "usebackq tokens=*" %%r in (`CSCRIPT /nologo %GRUNT_DIR%\grunt-runner\version_of.js node`) DO SET VERSION_NODE_OR_ERROR=%%r
if not "x%VERSION_NODE_OR_ERROR:ERROR=%"=="x%VERSION_NODE_OR_ERROR%" (
    echo %VERSION_NODE_OR_ERROR%
    exit /b 1
)
set VERSION_NODE=%VERSION_NODE_OR_ERROR%

:: === Install Node if it isn't already installed
%GRUNT_DIR%\grunt-runner\nvmw\nvmw.bat ls | findstr "%VERSION_NODE%" > nul
if not %ERRORLEVEL%==0 (
    echo Installing Node version %VERSION_NODE% with npm
    cmd /c %GRUNT_DIR%\grunt-runner\nvmw\nvmw.bat install %VERSION_NODE% > nul
    echo Installed Node and npm.
)

call %GRUNT_DIR%\grunt-runner\nvmw\nvmw.bat use %VERSION_NODE% > nul

:: If no node_modules are installed yet, tell
:: the user why it's taking so long
if not exist node_modules (
    echo Running npm install, this may take some time...
    goto :npminstall
)

cscript /nologo %GRUNT_DIR%\grunt-runner\file_modified.js %CD%
if not %ERRORLEVEL%==0 (
    echo Updating node_modules
    goto :npminstall
) else (
    goto :grunt
)

:npminstall
:: Even if node_modules exists, run npm install anyways
:: echo Running npm install
call npm install --silent > nul
if not %ERRORLEVEL%==0 (
    echo Could not run npm install; something went wrong.
    echo Try running 'npm install' manually!
    exit /b 1
)
touch node_modules\last_modified

:grunt
:: Check if Grunt is installed
if not exist node_modules\grunt-cli\bin\grunt (
    echo ERROR: Local grunt-cli was not found in project!
    echo ERROR: Run 'npm install grunt grunt-cli --save-dev' to install Grunt locally.
    exit /b 1
)

:: Run grunt!
node node_modules\grunt-cli\bin\grunt %*