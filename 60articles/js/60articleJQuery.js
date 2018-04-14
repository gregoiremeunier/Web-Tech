/*
 * Created by Stefan Korecko, 2016-18
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu
//Code executed when the script is loaded
writeArticle2Html("article");

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie



/**
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 *
 * opens dialog with error message
 * @param status -  value XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Chyba pri načítaní údajov zo servera.\nStatus= "+status);
}



/**
 * Zapíše údaje o článku do elementu s id=articleElmId.
 * @param articleElmId - Id elementu do ktorého sa článok má vypísať
 *
 * Writes article data to the element with id=articleElmId.
 * @param articleElmId - id of the html element to which the article data are written
 */
function writeArticle2Html(articleElmId){

    var artId = queryString2obj().id;

    if (isFinite(artId)){
        $.ajax({
            type: 'GET',
            url: "http://"+server+"/api/article/"+artId,
            dataType: "json",
            success: function (article) {
                $.get("templates/article.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#"+articleElmId).html(Mustache.render(template, article));
                    }
                    ,"text")
            },
            error:function(responseObj,textStatus, errorThrown){
                errorDialog(textStatus+"("+errorThrown+")");
            }
        });
    }
}
