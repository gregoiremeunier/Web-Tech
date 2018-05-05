// Code executed when the script is loaded
var form = document.getElementById("SKorFrm");
var artId = queryString2obj().id;

//récupére et affiche les infos sur l'article s'il y a un id (cad qu'on veut éditer)
if (isFinite(artId)) 
{
    console.log("Edit article "+artId);
    AJAXGetCall("http://"+server+"/api/article/"+artId,
        function(xhr)
        {
            var article=JSON.parse(xhr.responseText);
            console.log(article);
            document.getElementById("author").value=article.author;
            document.getElementById("title").value=article.title;
            document.getElementById("imageLink").value=article.imageLink;
            document.getElementById("content").value=article.content;
            document.getElementById("tags").value=article.tags;
            document.getElementById("frmTitle").innerHTML="Edit article n°"+artId;
        },
        function(xhr)
        {
            errorAlert("article loading failed.",xhr);
        }
    );
    
}
else //s'il n'y a pas d'ID donc on veut ajouter un nouvel article
{
    document.getElementById("frmTitle").innerHTML="Add new article";
}

//Adding functionality for the button "Back"
document.getElementById("btBack").addEventListener("click", function(){
    window.history.back()
});

//Adding functionality for the button "Save article"
form.addEventListener("submit", function(event)
{  //here I also need the event object
    event.preventDefault(); //to cancel the default event handling
    if (isFinite(artId)) 
    {
        prepareAndSendArticle(form,"PUT","http://"+server+"/api/article/"+artId);
    }
    else
    {
        prepareAndSendArticle(form,"POST","http://"+server+"/api/article");
    }
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
function prepareAndSendArticle(form, method, restURL)
{
    //1. Puts form data to the object data
    var data = form2trimmedStringsObject(form);
    console.log("prepareAndSendArticle> Data from the form in the data object:");
    console.log(JSON.stringify(data));

    //2.Modifies the data object to a form suitable for sending
    if(data.tags){  //if there is the item tags and it it not an empty string.
                    //If I just need to know whether there is the item tags, it is better to call
                    //Object.prototype.hasOwnProperty.call(data, 'tags')
                    //see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
        data.tags=data.tags.split(",");
        data.tags=data.tags.map(function(tag) {return tag.trim()});
    }
    console.log("prepareAndSendArticle> Form data successfully converted to:");
    console.log(JSON.stringify(data));

    //3.Required/format validation
    if(!data.title)
    { //this is just for sure
        alert("Article title has to be entered and has to contain readable characters only.");
        return;
    }
    if(!data.content)
    { //this is important, checks whether the user entered only white space characters.
        alert("Article content has to be entered and has to contain readable characters only.");
        return;
    }

    console.log("prepareAndSendArticle> Form data validated.");

    //4. sending the data
    if(window.confirm("Do you really wish to upload the article?"))
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
                    window.location.href="articleForm.html";
                }
                else
                {
                    errorAlert("article uploading failed.",xhr);

                }
                console.log(status+" "+xhr.statusText+" "+xhr.responseText);
            }
        );
    }
}

/**
 * Uploads an image to the server
 * @param $imgLinkElement - id of the input type="url" element, where the link of the uploaded file will be added arter the upload
 * @param $fieldsetElement - id of the hideable fieldset element, which conains the controls for the file upload.
 * @param $btShowFileUploadElement - id of the button type="button" element, which shows or hides the fieldset
 * @param files - a FileList object with the image to be uploaded as the first item.
 */
function uploadImg(imgLinkElement,fieldsetElement, btShowFileUploadElement, files) 
{
    if (files.length>0)
    {
        var imgData = new FormData();
        imgData.append("file", files[0]); //takes only the first file (image)
        //Beware: It doesn't work correctly if the content-type is set.
        AJAXCall("POST","http://"+server+"/api/fileUpload","",imgData,
            function(xhr){
                var status=xhr.status;
                if(status==200)
                { //(successful processing and file upload)
                    var resObj=JSON.parse(xhr.responseText);
                    if(resObj)
                    {
                        imgLinkElement.value=resObj.fullFileUrl;
                        btShowFileUploadElement.classList.remove("skryty");
                        fieldsetElement.classList.add("skryty");
                    }
                }
                else
                {
                    errorAlert("image uploading failed.",xhr);
                }
            }
        );
    }
    else
    {
        window.alert("Please, choose an image file.");
    }
}