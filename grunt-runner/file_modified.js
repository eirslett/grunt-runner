function log(message){
    WScript.Echo(message);
}

var basePath = WScript.arguments(0);

var fileSystem = WScript.CreateObject("Scripting.FileSystemObject");

var lastModifiedPath = basePath + '\\node_modules\\last_modified';

var nodeModules;
if(fileSystem.FileExists(lastModifiedPath)){
    nodeModules = fileSystem.GetFile(lastModifiedPath);
} else {
    nodeModules = fileSystem.GetFolder(basePath + '\\node_modules');
}

var packageJson = fileSystem.GetFile(basePath + '\\package.json');

var nodeModulesDate = nodeModules.DateLastModified;
var packageJsonDate = packageJson.DateLastModified;

if(nodeModulesDate > packageJsonDate){
    WScript.Quit(0);
} else {
    WScript.Quit(100);
}