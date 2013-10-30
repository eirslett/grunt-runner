function log(message){
    WScript.Echo(message);
}

function detectVersionOf(program){
    var fileSystemObject = WScript.CreateObject("Scripting.FileSystemObject");
    var fileHandler = fileSystemObject.OpenTextFile("package.json", 1);
    var contents = fileHandler.ReadAll();
    eval("packageJsonData = "+contents+";");

    if(packageJsonData.engines == null){
        log("ERROR: package.json hasn't specified 'engines' property.");
        WScript.Quit(1);
    }

    if(packageJsonData.engines[program] == null){
        log("ERROR: package.json hasn't specified 'engines."+program+"' property.");
        WScript.Quit(1);
    }

    var version = packageJsonData.engines[program];
    log(version);
    WScript.Quit(0);
}

detectVersionOf(WScript.arguments(0));