function log(message){
    WScript.Echo(message);
}

function fileExists(filename){
    var fileSystemObject = WScript.createObject("Scripting.FileSystemObject");
    return fileSystemObject.FileExists(filename);
}

/**
 * Download file from specified URL
 *
 * @param {String} url Url to download
 * @param {String} filename Filename to save
 * @param {Function} callback Callback function when download is completed or failed
 */
function downloadFileIfNotExists(url, filename, callback) {
    if(fileExists(filename)){
        callback();
        return;
    }

    var xhr = WScript.createObject('Msxml2.XMLHTTP'),
        ostream = new ActiveXObject("Adodb.Stream");

    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                ostream.type = 1 /*adTypeBinary*/
                ;
                ostream.open();
                ostream.write(xhr.responseBody);
                log(filename);
                ostream.savetofile(filename, 2 /* adSaveCreateOverWrite */ );
                callback();
            } else {
                callback(new Error(xhr.status + ' ' + xhr.statusText));
            }
            xhr = null;
            ostream = null;
        }
    };

    try {
        xhr.open('GET', url, true);
        xhr.send(null);
    } catch (e) {
        callback(new Error('URL may be invalid'));
        xhr.abort();
    }
}

var destinationDirectory = WScript.arguments(0);

var files = ['fget.js','get_npm.js','nvmw.bat','unzip.js','wget.js'];
var completed = [false,false,false,false,false];

for(var i = 0; i < files.length; i++){
    var callback = (function(){
        var n = i;
        return function(err){
            if(err){
                WScript.Quit(1);
            } else {
                completed[n] = true;
            }
        }
    }());

    var url = 'https://raw.github.com/hakobera/nvmw/master/' + files[i];
    var destination = destinationDirectory+'grunt-runner\\nvmw\\' + files[i];
    log("From "+url+" to "+destination);
    downloadFileIfNotExists(url, destination, callback);
}

function allCompleted(){
    var allCompleted = true;
    for(var i = 0; i < files.length; i++){
        if(!completed[i]){
            allCompleted = false;
        }
    }
    return allCompleted;
}

while (!allCompleted()) {
    WScript.Sleep(1000);
}

WScript.Quit(0);