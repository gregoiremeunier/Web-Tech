//Domain name of the server with the article database
var server="wt.kpi.fei.tuke.sk";

var artId = queryString2obj().id;
var restURL ="http://"+server+"/api/article/"+artId;

//Code executed when the script is loaded
writeArticle2Html("article","comments");

//Adding functionality for buttons
document.getElementById("btArtList").addEventListener("click", function(){
    window.location.href='DisplayListArticle.html';
});
document.getElementById("btUpdate").addEventListener("click", function(){
    window.location.href='articleForm.html?id='+artId;
});
document.getElementById("btDelete").addEventListener("click", function(){
    deleteArticle(restURL);
});


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//fonctions

/**
 * opens dialog with error message
 * @param status -  value XMLHttpRequest.status
 */
function errorDialog(status)
{
    window.alert("Status= "+status);
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
            success: function (article) 
            {
                $.get("templates/article.mst", //get()
                    function (template) 
                    {
                        $("#" + articleElmId).html(Mustache.render(template, article));
                    }
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
                    function (template) 
                    {

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

/**
 * Deletes an article, including its comments
 * @param articleId - id of the article to be deleted
 */
function deleteArticle(sourceURL)
{
    if(window.confirm("Do you really wish to delete the article, including its comments?"))
    {
        AJAXCall('DELETE', sourceURL,
            "", null,
            function (xhr) 
            {
                var status = xhr.status;
                console.log(status + " " + xhr.statusText + " " + xhr.responseText);
                if (status == 204) //204 = no content
                { 
                    window.alert("Article successfully deleted.");
                    window.location.href = "DisplayListArticle.html";
                }
                else
                {
                    errorAlert("Delete failed.",xhr);
                }
            }
        );
    }
}