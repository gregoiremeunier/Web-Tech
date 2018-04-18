//Domain name of the server with the article database
var server="wt.kpi.fei.tuke.sk";

//Code executed when the script is loaded
writeArticle2Html("article","comments");


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonctions

/**
 * opens dialog with error message
 * @param status -  value XMLHttpRequest.status
 */
function errorDialog(status)
{
    window.alert("Chyba pri načítaní údajov zo servera.\nStatus= "+status);
}


/**
 * Writes article data to the element with id=articleElmId.
 * @param articleElmId - id of the html element to which the article data are written
 */
function writeArticle2Html(articleElmId,comments)
{
    var artId = queryString2obj().id;
    if (isFinite(artId))
    {
        $.ajax(
        {
            type: 'GET',
            url: "http://"+server+"/api/article/"+artId,
            dataType: "json",
            success: function (article) {
                $.get("templates/article.mst",      //get() je vlastne specialna verzia ajax()
                    function (template) {
                        $("#" + articleElmId).html(Mustache.render(template, article) + article.content);
                    }// article.content to remove the html tags
                    ,"text")
            },
            error:function(responseObj,textStatus, errorThrown){
                errorDialog(textStatus+"("+errorThrown+")");
            }
        });
    }
    if (isFinite(artId))
    {
        $.ajax(
        {
            type: 'GET',
            url: "http://"+server+"/api/article/"+artId+"/comment",
            dataType: "json",
            success: function (article) 
            {
                $.get("templates/comment.mst",
                    /*                    comment.comments = comment.comments.join();*/
                    function (template) {

                        $("#"+comments).html(Mustache.render(template, article));
                    }
                    ,"text")
            },
            error:function(responseObj,textStatus, errorThrown)
            {
                errorDialog(textStatus+"("+errorThrown+")");
            }
        });
    }
}