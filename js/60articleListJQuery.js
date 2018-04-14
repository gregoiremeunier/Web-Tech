/*
 * Created by Stefan Korecko, 2016-18
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu
//Code executed when the script is loaded

console.log("Zacinam stahovat zoznam clankov ...");


//Výpis prvých maximálne articlesPerPage článkov a zápis informácie do navigačného panela
writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia');



////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//funkcie


/**
 * Vráti HTML kód pre navigačnú časť stránky
 * @param startIndex - index prvého zo zobrazených článkov
 * @param articlesCount - počet vypísaných článkov
 * @param articlesTotalCount  - celkový počet článkov v databáze servra
 * @returns {string} - HTML kód pre navigačnú časť stránky
 *
 * Creates and returns HTML code for the navigation part of the page
 * @param startIndex - index of the first of the displayed articles
 * @param articlesCount - number of displayed articles
 * @param articlesTotalCount  - total count of articles in the server database
 * @returns {string} - HTML code for the navigation part of the page
 *
 */
function navHtml(startIndex, articlesCount, articlesTotalCount){
    var htmlCode="";
    if(articlesCount>0){
        htmlCode+="Vypisujem články  "+(startIndex+1)+" až "+(startIndex+articlesCount)+" z "+ articlesTotalCount +" článkov. <br />";
        htmlCode+="(Displaying articles  "+(startIndex+1)+" to "+(startIndex+articlesCount)+" from "+ articlesTotalCount  +" articles.) <br /> <br />";


    }
    htmlCode+=" <button onclick=\"writeArticles2Html("+startIndex+
        ", articlesPerPage, server, 'clanky', 'navigacia')\">" +
        "Načítaj znova</button>";
    return htmlCode;
}

/**
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 *
 * Opens a dialog window with an error message
 * @param status -  value os XMLHttpRequest.status
 *
 */
function errorDialog(status){
    window.alert("Chyba pri načítaní údajov zo servera.\nStatus= "+status);
}

/**
 * Zapíše údaje o článkoch do elementu s id articlesElmId a HTML kód navigácie do elementu s id navElmId
 * Iba verzia s Mustache sablonou z elementu s id =listOfArticlesMTemplate
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 * @param server - doménové meno servera odkiaľ sa majú údaje stiahnuť.
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 *
 * Writes article data to the element with id=articlesElmId and HTML code for the navigation part to the element with id=navElmId
 * @param startIndex - index of the first article that is displayed. Articles are indexed from 0
 * @param max - maximum number of the displayed articles
 * @param server - domain name of the server with the article database
 * @param articlesElmId - id of the html element to which the authors and names of the articles are written
 * @param navElmId - id of the html element with the navigation part
 *
 */
function writeArticles2Html(startIndex, max, server, articlesElmId, navElmId){
    $.ajax({
        type: 'GET',
        url: "http://"+server+"/api/article/",
        data: { max: max, offset: startIndex },
        dataType: "json",
        success: function (articles) {
            $("#"+articlesElmId).html(Mustache.render($("#listOfArticlesMTemplate").html(), articles));
            $("#"+navElmId).html(navHtml(startIndex, articles.articles.length,articles.meta.totalCount));
        },
        error:function(responseObj,textStatus, errorThrown){
            errorDialog(textStatus+"("+errorThrown+")");
        }
    });
}