//COMMENT TEMPLATE
// Comment: asdasf

// Date created: 2018-05-08T18:16:20Z

// Last updated: 2018-05-08T18:16:20Z

// Author: fdsf 


// Code executed when the script is loaded
var form = document.getElementById("SKorFrm");//récupère le formulaire en entier
var comId = queryString2obj().id; //le récupère grâce à l'URL

//récupére et affiche les infos sur l'article s'il y a un id (cad qu'on veut éditer)
if (isFinite(comId)) 
{
    console.log("Edit comment of the article number "+comId);
    AJAXGetCall("http://"+server+"/api/article/"+artId+"/comment/"+comId,
        function(xhr)
        {
            var comment=JSON.parse(xhr.responseText);
            console.log(comment);
            document.getElementById("author").value=comment.author;
            document.getElementById("content").value=comment.content;
        },
        function(xhr)
        {
            errorAlert("comments loading failed.",xhr);
        }
    );
}
else //s'il n'y a pas d'ID donc on veut ajouter un nouvel article
{
    document.getElementById("frmTitle").innerHTML="Add new comment"; //modification du <h1>
}

//Adding functionality for buttons
document.getElementById("btBack").addEventListener("click", function(){
    window.history.back()
});

//Adding functionality for the button "Save article"
form.addEventListener("submit", function(event)
{  //here I also need the event object
    event.preventDefault(); //to cancel the default event handling
    if (isFinite(comId)) 
    {
        prepareAndSendArticle(form,"PUT","http://"+server+"/api/article/"+comId+"/comment");
    }
    // else
    // {
    //     prepareAndSendArticle(form,"POST","http://"+server+"/api/article ");
    // }
});

//Adding functionality for the button "Upload image"
document.getElementById("btShowFileUpload").addEventListener("click", function()
{
    document.getElementById('fsetFileUpload').classList.remove("skryty");
    document.getElementById('btShowFileUpload').classList.add("skryty");
});

//Adding functionality for the button "Send image to server"
document.getElementById("btFileUpload").addEventListener("click", function()
{
    uploadImg(
        document.getElementById('imageLink'),
        document.getElementById('fsetFileUpload'),
        document.getElementById('btShowFileUpload'),
        document.getElementById('flElm').files
    );
});

//Adding functionality for the button "Cancel uploading"
document.getElementById("btCancelFileUpload").addEventListener("click", function()
{
    document.getElementById('fsetFileUpload').classList.add("skryty");
    document.getElementById('btShowFileUpload').classList.remove("skryty");
});

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//functions

/**
 * Processes article data from the form and sends them to the server.
 * @param form - article form
 * @param method - method, "POST" (add article) or "PUT" (edit article)
 * @param restURL - url of the resource at the server
 */
function prepareAndSendComment(form, method, restURL)
{
    //1. Puts form data to the object data
    var data = form2trimmedStringsObject(form);
    console.log("prepareAndSendComment> Data from the form in the data object:");
    console.log(JSON.stringify(data));

    //2.Modifies the data object to a form suitable for sending
    console.log("prepareAndSendComment> Form data successfully converted to:");
    console.log(JSON.stringify(data));

    //3.Required/format validation
    if(!data.content)
    { //this is important, checks whether the user entered only white space characters.
        alert("Article content has to be entered and has to contain readable characters only.");
        return;
    }
    console.log("prepareAndSendComment> Form data validated.");

    //4. sending the data
    if(window.confirm("Do you really wish to upload the comment?"))
    {
        AJAXCall(method, restURL,
            "application/json;charset=UTF-8",
            JSON.stringify(data),
            function(xhr){
                var status=xhr.status;
                if(status==200 || status==201)
                { //(successful processing and upload)
                    var response=JSON.parse(xhr.responseText);
                    if(response.id){
                        console.log(response.id);
                        window.location.href="DisplayArticle.html?id="+response.id;
                    }
                    console.log("I don't know what it is but somehow a problem");
                }
                else if(status==202)
                { //(successful processing but upload not finished)
                    window.location.href="commentForm.html";
                }
                else
                {
                    errorAlert("comment uploading failed.",xhr);

                }
                console.log(status+" "+xhr.statusText+" "+xhr.responseText);
            }
        );
    }
}