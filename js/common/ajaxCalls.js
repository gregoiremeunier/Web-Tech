/*
 * Created by Stefan Korecko, 2016-18
 */

/**
 * Executes XMLHttpRequest request and processes the response.
 * Also works with old browsers (IE 5, 6)
 * @param method - request method. Possible values: "GET", "POST", "PUT", "DELETE"
 * @param url - URL of the request
 * @param contentType - value for the Content-Type header, e.g. "application/x-www-form-urlencoded", "application/json",  "application/json; charset=UTF-8"
 * @param data2send - data to be sent to theserver. Used for the POST or PUT methods.
 * @param responseHandler - function called after the response of the request is received. Should handle both the successful and unsuccessful request execution.
 *                         parameters: request object (including the received response), paramObj
 * @param paramObj - an object with additional responseHandler parameters
 *
 */
function AJAXCall(method, url, contentType, data2send, responseHandler, paramObj){

    //1.Check input parameters
    if(method!=="GET" && method!=="POST"  && method!=="PUT"  && method!=="DELETE") return;
    if(method!=="GET" && method!=="DELETE" && (data2send===undefined || data2send===null)) return;

    //2. Create XMLHttpRequest object
    var xhr = typeof XMLHttpRequest != 'undefined'
        ? new XMLHttpRequest()
        : new ActiveXObject('Microsoft.XMLHTTP');

    //3.Request initialisation
    xhr.open(method, url, true);

    //4.Set Content-Type header
    if(contentType){
        xhr.setRequestHeader("Content-Type", contentType);
    }

    //5.Set response processing
    xhr.onreadystatechange = function(){
        if (xhr.readyState === 4) { // 4 = XMLHttpRequest.DONE
            responseHandler && responseHandler(xhr,paramObj);};  //we can also use xhr.addEventListener("readystatechange",function, false)
        }

    //6.Send the request
    if(method!=="GET" && method!=="DELETE")
        xhr.send(data2send);
    else
        xhr.send();
}

/**
 * Executes XMLHttpRequest GET request and processes the response
 * This version also works with old browsers (IE 5, 6)
 * @param url - URL of the request
 * @param successHandler - function, which processes the data object, obtained from the response in the JSON format.
 *                         This object is the parameter of that function
 * @param errorHandler - function, which is called when error occurs.
 *                       Its parameter is the error status number
 * @param paramObj - an object with additional handler parameters
 *
 */
function AJAXGetCall(url, successHandler, errorHandler, paramObj){
    AJAXCall("GET", url, "", null,
        function(xhr,paramObj) {
            if (xhr.status === 200) { //uspesne vybavena GET poziadavka
                successHandler && successHandler(xhr,paramObj);
            } else {
                errorHandler && errorHandler(xhr,paramObj);
            }
        },
        paramObj);
}