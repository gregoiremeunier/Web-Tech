/*
 * Created by Stefan Korecko, 2016-18
 */

/**
 * Executes XMLHttpRequest GET request and processes the response in the form of an object in the JSON format.
 * This version also works with old browsers (IE 5, 6)
 * (based on the code from: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL of the request
 * @param successHandler - function, which processes the data object, obtained from the response in the JSON format.
 *                         This object is the parameter of that function
 * @param errorHandler - function, which is called when error occurs.
 *                       Its parameter is the error status number
 */
function getJSONAllBr(url, successHandler, errorHandler){
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('GET', url, true); // GET = récupère des infos
    xhr.onreadystatechange = function() { //alternativne mozem pouzit xhr.addEventListener("readystatechange",funkcia, false),
        var status;
        var data;
        if (xhr.readyState === 4) { // nécessaire pour que la requête fonctionne
            status = xhr.status;
            if (status === 200) { // nécessaire pour que la requête fonctionne
                data = JSON.parse(xhr.responseText);
                successHandler && successHandler(data);
            } else {
                errorHandler && errorHandler(status);
            }
        }
    };
    xhr.send();
};

/**
 * Executes XMLHttpRequest GET request and processes the response in the form of an object in the JSON format.
 * This version works with modern browsers, which know the value "json" of the XMLHttpRequest.responseType
 * (based on the code from: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL of the request
 * @param successHandler - function, which processes the data object, obtained from the response in the JSON format.
 *                         This object is the parameter of that function
 * @param errorHandler - function, which is called when error occurs.
 *                       Its parameter is the error status number
 */
function getJSONModernBr(url, successHandler, errorHandler) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'json';
    xhr.onload = function() {
        var status = xhr.status;
        if (status === 200) {
            successHandler && successHandler(xhr.response);
        } else {
            errorHandler && errorHandler(status);
        }
    };
    xhr.send();
};


/**
 * Executes XMLHttpRequest GET request and processes the response in the form of a string (DOMString type).
 * It is used to get Mustache templates from separate files.
 * This version also works with old browsers (IE 5, 6)
 * It's like the function getJSONAllBr, but without processing the response to JSON.
 * @param url - URL of the request
 * @param paramObj - object with additional parameters for handlers
 * @param successHandler - function, which processes the string, obtained from the response. The string is its first parameter. The second parameter is an object with processing settings and data.
 * @param errorHandler   - function, which is called when error occurs.
 *                       Its parameters are the error status number and the object with processing settings and data.
 */
function getTextFromUrl(url, paramObj, successHandler, errorHandler){
        var xhr = typeof XMLHttpRequest != 'undefined'
            ? new XMLHttpRequest()
            : new ActiveXObject('Microsoft.XMLHTTP');
        xhr.open('GET', url, true);
        xhr.onreadystatechange = function() { //alternatively you can use xhr.addEventListener("readystatechange",function, false),
            var status;
            var data;
            if (xhr.readyState === 4) { // DONE, alternatively you can use XMLHttpRequest.DONE
                status = xhr.status;
                if (status === 200) { //successfully executed request
                    successHandler && successHandler(xhr.responseText,paramObj);
                } else {
                    errorHandler && errorHandler(status,paramObj);
                }
            }
        };
        xhr.send();
};
