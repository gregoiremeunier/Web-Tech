/*
 * Created by Stefan Korecko, 2016-18
 */

/**
 * Inserts HTML code to the element with id=targetElmId. The HTML code is rendered by Mustache from data in dataObject
 * according to a template in the element with id=templateElmId
 * @param dataObject - object with data
 * @param templateElmId - object with the Mustache template
 * @param targetElmId - element, where the resulting HTML is written
 */
function mrenderObjectWithTemplateFromElm(dataObject,templateElmId,targetElmId){
    document.getElementById(targetElmId).innerHTML =
        Mustache.render(document.getElementById(templateElmId).innerHTML, dataObject);
}

/**
 * Inserts HTML code to the element with id=targetElmId. The HTML code is rendered by Mustache from data in dataObject
 * according to a template in the file with URL =templateFileUrl
 * @param dataObject - object with data
 * @param templateFileUrl - URL of the file with the Mustache template
 * @param targetElmId - element, where the resulting HTML is written
 */
function mrenderObjectWithTemplateFromFile(dataObject,templateFileUrl,targetElmId){
    getTextFromUrl(
        templateFileUrl,

        {
            idOfTargetElm:targetElmId,
            data2Render:dataObject
        },

        function(template, paramObj){
            var targetElm = document.getElementById(paramObj.idOfTargetElm);
            if(targetElm) targetElm.innerHTML = Mustache.render(template, paramObj.data2Render);
        },

        function(errCode, paramObj){
            var targetElm = document.getElementById(paramObj.idOfTargetElm);
            if(targetElm) targetElm.innerHTML = "Error, code="+errCode;
        }
    );
}

