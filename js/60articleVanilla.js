/*
 * Created by Stefan Korecko, 2016-18
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Code executed when the script is loaded
writeArticle2Html("article");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functions

/**
 * opens dialog with error message
 * @param status -  value XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Error reading data from the server.\nStatus= "+status);
}


/**
 * Writes article data to the element with id=articleElmId.
 * @param articleElmId - id of the html element to which the article data are written
 */
function writeArticle2Html(articleElmId){
    var artId = queryString2obj().id;

    if (isFinite(artId)){
        var restURL ="http://"+server+"/api/article"+artId;
        console.log(restURL);
        getJSONAllBr(restURL,
            function(article){ mrenderObjectWithTemplateFromFile(article, "templates/article.mst", articleElmId);},
            function(status){errorDialog(status)});
    }

}
