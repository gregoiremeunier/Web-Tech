/**
 * Created by stefan.kr
 *
 * ziskajClanky means get articles
 */

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Kód, ktorý sa vykoná pri načítaní skriptu:
//Code executed after loading this script:

//Počet naraz zobrazených článkov
    //Number of articles per one page, change the number to the desired number of articles per page
var articlesPerPage=10;

//Doménové meno servera s databázou článkov
//Domain name of the server with the article database
var server="wt.kpi.fei.tuke.sk"+"/api/article"

//Výpis prvých článkov a vytvorenie navigačného panela
//Write first articlesPerPage articles to html and create a navigation part
writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia', 'FooTer');




////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Funkcie:
//Functions:


/**
 * Vráti HTML kód pre navigačnú časť stránky
 * @param startIndex - index prvého zo zobrazených článkov
 * @param articlesCount - počet vypísaných článkov
 * @param articlesTotalCount  - celkový počet článkov v databáze servra
 * @returns {string} - HTML kód pre navigačnú časť stránky

 * Creates and returns HTML code for the navigation part of the page
 * @param startIndex - index of the first of the displayed articles
 * @param articlesCount - number of displayed articles
 * @param articlesTotalCount  - total count of articles in the server database
 * @returns {string} - HTML code for the navigation part of the page

 */

/*function navHtml(startIndex, articlesCount, articlesTotalCount){
    var htmlKod="";
    if(articlesCount>0){
        htmlKod+="<hr> ";
        htmlKod+="Vypisujem články  "+(startIndex+1)+" až "+(startIndex+articlesCount)+" z "+ articlesTotalCount +" článkov. <br />";
        htmlKod+="(Displaying articles  "+(startIndex+1)+" to "+(startIndex+articlesCount)+" from "+ articlesTotalCount  +" articles.) <br /> <br />";

    }
    htmlKod+=" <a onclick=\"writeArticles2Html("+startIndex+
             ", articlesPerPage, server, 'clanky', 'navigacia')\">" +
             "Načítaj znova / Reload</a>";
    return htmlKod;




}*/





function navHtml(startIndex, articlesCount, articlesTotalCount){
    var htmlKod="";
    if(articlesCount>0)

    if((startIndex + 1 - articlesPerPage > 0 )&&(startIndex + articlesPerPage < articlesTotalCount)) //we are far from the border => we can go prev and next
    {
        var prev = startIndex - articlesPerPage;
        var next = startIndex + articlesPerPage;
       // document.write("prev1 :"+prev);
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+prev+", articlesPerPage, server, 'clanky', 'navigacia','FooTer')\">" +"Previous</a>";
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+next+", articlesPerPage, server, 'clanky', 'navigacia','FooTer')\">" +"Next </a>";
        return htmlKod;
    }
    else if((startIndex + articlesPerPage)< articlesTotalCount) //we are far from the upper border => we can go next
    {
        var next = startIndex + articlesPerPage;
        //document.write("next2 :"+next);
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia','FooTer')\">" +"Previous</a>";
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+next+", articlesPerPage, server, 'clanky', 'navigacia','FooTer')\">" +"Next </a>";
        return htmlKod;
    }
    else if((startIndex + 1 - articlesPerPage) > 0) //we are far from the lower border => we can go prev
    {

        var prev = startIndex - articlesPerPage;
        //document.write("prev3 :"+prev);
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+prev+", articlesPerPage, server, 'clanky', 'navigacia')\">" +"Previous</a>";
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia'),'FooTer'\">" +"Next </a>";
        return htmlKod;
    }
    else
    {
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia','FooTer')\">" +"Previous</a>";
        htmlKod+=" <a class=\"link-btn\" onclick=\"writeArticles2Html("+startIndex+", articlesPerPage, server, 'clanky', 'navigacia','FooTer')\">" +"Next </a>";
        return htmlKod;
    }
}
function displayPages(startIndex, articlesCount, articlesTotalCount) {
    var htmlKod = "";
    if (articlesCount > 0) {
        htmlKod += "<hr> ";
        htmlKod += "(Displaying articles  " + (startIndex + 1) + " to " + (startIndex + articlesCount) + " from " + articlesTotalCount + " articles.) <br /> <br />";
        return htmlKod;
    }

}




/**
 * Vráti HTML kód so zoznamom článkov, získaného z objektu articles
 * @param articles  - JSON objekt s článkami
 * @returns {string} - HTML kód pre časť stránky s článkami
 *
 * Creates and returns HTML code with the list of articles, obtained from the object articles
 * @param articles  - JSON object with articles
 * @returns {string} - HTML code with the list of articles
 */
function articlesHtml(articles){
    var count;
    var htmlKod="";
    if(count=articles.articles.length){ //ak su nejake clanky (if there are some articles)
        for(var i=0; i<count; i++)
            htmlKod+="<p>"+articles.articles[i].author+": "+articles.articles[i].title+" <small> was written in " +articles.articles[i].dateCreated + "</small> </p>";
    }
    return htmlKod;
}


/**
 * Zapíše autorov a názvy článkov do daného html elementu
 * @param articles  - JSON objekt s článkami
 * @param articlesElmId - Id elementu do ktorého sa články majú vypísať
 * @param navElmId - Id elementu ktorý má obsahovať navigačné linky
 * @param startIndex - index (poradové číslo čláanku od 0) od ktorého sa články vypisujú
 * @param max - maximálny počet článkov.
 *
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
 * otvori dialogove okno s chybovym hlasenim
 * @param status -  hodnota XMLHttpRequest.status
 *
 * Opens a dialog window with an error message
 * @param status -  value os XMLHttpRequest.status
 */
function errorDialog(status){
    window.alert("Chyba pri načítaní údajov zo servera/Error when reading server data.\nStatus= "+status);
}



/**
 * Vykona XMLHttpRequest GET ziadost a spracuje odpoved v podobe objektu ziskaneho z odpovede v JSON formate.
 * Tato verzia je funkcna aj pre starsie prehliadace (IE 5, 6)
 * (povodny kod prevzaty z: https://mathiasbynens.be/notes/xhr-responsetype-json).
 * @param url - URL ziadosti
 * @param successHandler - funkcia, ktora spracuje objekt data, ziskany z odpovede v JSON formate.
 *                         Tento objekt by mal byt parametrom funkcie
 * @param errorHandler - funkcia, ktora sa vola, ked dojde k chybe.
 *                       Jej parametrom by malo byt cislo so statusom odpovede
 *
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
 * Zapíše údaje o článkoch do elementu s id articlesElmId a HTML kód navigácie do elementu s id navElmId
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
 */
/*function writeArticles2Html(startIndex, max, server, articlesElmId, navElmId){
    var restURL ="http://"+server+"/api/article/?max="+max+"&offset="+startIndex;
    console.log(restURL);
    getJSONAllBr(restURL,
        function(JSONObj){JSON2Html(JSONObj, articlesElmId, navElmId, startIndex, max)},
        function(status){errorDialog(status)});
}
*/

function writeArticles2Html(startIndex, max, server, articlesElmId, navElmId, footer){
    $.ajax({
        type: 'GET',
        url: "http://"+server,
        data: { max: max, offset: startIndex },
        dataType: "json",
        success: function (articles) {
            $("#"+articlesElmId).html(Mustache.render($("#listArtMT").html(), articles));
            $("#"+navElmId).html(navHtml(startIndex, articles.articles.length,articles.meta.totalCount));
            $("#"+footer).html(displayPages(startIndex, articles.articles.length,articles.meta.totalCount));

        },
        error:function(responseObj,textStatus, errorThrown){
            errorDialog(textStatus+"("+errorThrown+")");
        }
    });
}

function changeBodyBg()
{
    document.body.style.backgroundColor = "lightgreen";
}

function changefontSz()
{
    document.getElementById("clanky").style.fontSize="1.2em"
}

function NormalBackground()
{
    document.body.style.backgroundColor = "lightseagreen";
}

function NormalFontSize()
{
    document.getElementById("clanky").style.fontSize="1em"
}



//PopupToggle
var popupMenuDiv = document.getElementById("PopupMenu");

function OpenMenu ()
{
    popupMenuDiv.style.display = "block"
}

function CloseMenu ()
{
    popupMenuDiv.style.display = "none"
}


//<--When reaches the botton loads more pages>-->//
$(window).scroll(function() {
    if($(window).scrollTop() == $(document).height() - $(window).height()) {
        scrolldown();
    }
});


function scrolldown() {

    articlesPerPage+= articlesPerPage+3;

    writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia', 'FooTer');

}



function Article_Search(){

    var tmp_svr = server;
    var param = document.getElementById("search_parameter").value;

    var value = document.getElementById("search_value").value;
    var tmp_svr = server + "?"+param+"="+value;
    writeArticles2Html(0, articlesPerPage, tmp_svr, 'clanky', 'navigacia','FooTer');
}

function Clear_Search() {
    document.getElementById("search_form").reset();
    writeArticles2Html(0, articlesPerPage, server, 'clanky', 'navigacia','FooTer');

}

