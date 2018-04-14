/*
 * Created by Stefan Korecko, 2016-18
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Code executed when the script is loaded

//Write first articlesPerPage articles to html and create a navigation part
writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia');

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Creates and returns HTML code for the navigation part of the page
 * @param startIndex - index of the first of the displayed articles
 * @param articlesCount - number of displayed articles
 * @param articlesTotalCount  - total count of articles in the server database
 * @returns {string} - HTML code for the navigation part of the page
 */

function navHtml(startIndex, articlesCount, articlesTotalCount)
{
    var htmlKod="";
    if(articlesCount>0)
    {
        htmlKod+="<hr> ";
        htmlKod+="(Displaying articles  "+(startIndex+1)+" to "+(startIndex+articlesCount)+" from "+ articlesTotalCount  +" articles.) <br /> <br />";
    }
    if((startIndex + 1 - articlesPerPage > 0 )&&(startIndex + articlesPerPage < articlesTotalCount)) //we are far from the border => we can go prev and next
    {
        var prev = startIndex - articlesPerPage;
        var next = startIndex + articlesPerPage;
       // document.write("prev1 :"+prev);
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+prev+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Prev</button>";
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+next+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Next</button>";
        return htmlKod;
    }
    else if((startIndex + articlesPerPage)< articlesTotalCount) //we are far from the upper border => we can go next
    {
        var next = startIndex + articlesPerPage;
        //document.write("next2 :"+next);
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Prev</button>";
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+next+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Next</button>";
        return htmlKod;
    }
    else if((startIndex + 1 - articlesPerPage) > 0) //we are far from the lower border => we can go prev
    {
        
        var prev = startIndex - articlesPerPage;
        //document.write("prev3 :"+prev);
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+prev+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Prev</button>";
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Next</button>";
        return htmlKod;
    }
    else
    {
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Prev</button>";
        htmlKod+=" <button class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Next</button>";
        return htmlKod;
    }
}

/**
 * Writes authors and article names to the html element
 * @param articles - array of objects with articles
 * @param articlesElmId - Id of the element to  the articles are to be added
 * @param navElmId - Id of the element to which the navigation links are to be added
 * @param startIndex - the article sequence number (from 0) from which articles are written
 * @param max - maximum number of articles.
 */
function renderListOfArticles(articles, articlesElmId, navElmId, startIndex, max){
    var articlesElm=document.getElementById(articlesElmId);
    var navElm=document.getElementById(navElmId);
    if(articlesElm&&navElm){
        //mrenderObjectWithTemplateFromFile(articles, "templates/listOfArticles.mst", articlesElmId);
        mrenderObjectWithTemplateFromElm(articles, "listOfArticlesMTemplate", articlesElmId);
        navElm.innerHTML=navHtml(startIndex, articles.articles.length,articles.meta.totalCount);
    }
}

/**
 * Opens a dialog window with an error message
 * @param status -  value os XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Chyba pri načítaní údajov zo servera.\nStatus= "+status);
}

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
        function(JSONObj){renderListOfArticles(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(status){errorDialog(status)});
}