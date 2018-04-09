/**
 * Created by stefan.kr
 *
 * ziskajClanky means get articles
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Code executed after loading this script:

//Number of articles per one page
var articlesPerPage=2;

//Domain name of the server with the article database
var server="wt.kpi.fei.tuke.sk";

//Write first articlesPerPage articles to html and create a navigation part
writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//Functions:


/**
 * Creates and returns HTML code for the navigation part of the page
 * @param startIndex - index of the first of the displayed articles
 * @param articlesCount - number of displayed articles
 * @param articlesTotalCount  - total count of articles in the server database
 * @returns {string} - HTML code for the navigation part of the page

 */

function navHtml(startIndex, articlesCount, articlesTotalCount){
    var htmlKod="";
    if(articlesCount>0){
        htmlKod+="<hr> ";
        htmlKod+="Vypisujem články  "+(startIndex+1)+" až "+(startIndex+articlesCount)+" z "+ articlesTotalCount +" článkov. <br />";
        htmlKod+="(Displaying articles  "+(startIndex+1)+" to "+(startIndex+articlesCount)+" from "+ articlesTotalCount  +" articles.) <br /> <br />";

    }
    htmlKod+=" <button onclick=\"writeArticles2Html("+startIndex+
             ", articlesPerPage, server, 'clanky', 'navigacia')\">" +
             "Načítaj znova / Reload</button>";
    return htmlKod;
}



/**
 * Creates and returns HTML code with the list of articles, obtained from the object articles
 * @param articles  - JSON object with articles
 * @returns {string} - HTML code with the list of articles
 */
function articlesHtml(articles){
    var count;
    var htmlKod="";
    if(count=articles.articles.length){ //ak su nejake clanky (if there are some articles)
        for(var i=0; i<count; i++)
            htmlKod+="<p>"+articles.articles[i].author+": "+articles.articles[i].title+" </p>";
    }
    return htmlKod;
}


/**
 * Writes authors and names of articles to a html element
 * @param articles  - JSON object with articles
 * @param articlesElmId - id of the html element to which the authors and names are written
 * @param navElmId - id of the html element with the navigation part
 * @param startIndex - index of the first article that is displayed. Articles are indexed from 0.
 * @param max - maximum number of the displayed articles.
 */
function JSON2Html(articles, articlesElmId, navElmId, startIndex, max){
    var articlesElm=document.getElementById(articlesElmId);
    var navElm=document.getElementById(navElmId);
    if(articlesElm&&navElm){
        articlesElm.innerHTML=articlesHtml(articles);
        navElm.innerHTML=navHtml(startIndex, articles.articles.length,articles.meta.totalCount);
    }
}




/**
 * Opens a dialog window with an error message
 * @param status -  value os XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Error when reading server data.\nStatus= "+status);
}



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
    xhr.open('GET', url, true);
    xhr.onreadystatechange = function() { //alternativne mozem pouzit (alternatively we can use) xhr.addEventListener("readystatechange",funkcia, false),
        // ale tu je pouzita anonymna funkcia a bolo by to iba neprehladnejsie (but here we use an anonymous function)
        var status;
        var data;
        if (xhr.readyState === 4) { // DONE, alternativne sa da pouzit (alternatively we can use) XMLHttpRequest.DONE
            status = xhr.status;
            if (status === 200) { //uspesne vybavena poziadavka (succesfully processed request)
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
 * Writes article data to the element with id=articlesElmId and HTML code for the navigation part to the element with id=navElmId
 * @param startIndex - index of the first article that is displayed. Articles are indexed from 0
 * @param max - maximum number of the displayed articles
 * @param server - domain name of the server with the article database
 * @param articlesElmId - id of the html element to which the authors and names of the articles are written
 * @param navElmId - id of the html element with the navigation part
 */
function writeArticles2Html(startIndex, max, server, articlesElmId, navElmId){
    var restURL ="http://"+server+"/api/article/?max="+max+"&offset="+startIndex;
    console.log(restURL);
    getJSONAllBr(restURL,
        function(JSONObj){JSON2Html(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(status){errorDialog(status)});
}
