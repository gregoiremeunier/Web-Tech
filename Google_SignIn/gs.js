function onSignIn(googleUser) 
{
  var profile = googleUser.getBasicProfile();
  console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
  console.log('Name: ' + profile.getName());
  console.log('Image URL: ' + profile.getImageUrl());
  console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present.
}
// function signOut() 
// {
//     var auth2 = gapi.auth2.getAuthInstance();
//     auth2.signOut().then(function () 
//     {
//       console.log('User signed out.');
//     });
// }




var auth2 = {};



function renderUserInfo(googleUser)
{
  var profile = googleUser.getBasicProfile();
  var htmlString="<p>User logged in</p>\n<ul>"
  htmlString+="\n <li> ID: " + profile.getId();
  htmlString+="\n <li>  Name: " + profile.getName();
  htmlString+="\n <li>  Given name: " + profile.getGivenName();
  htmlString+="\n <li>  Surname: " + profile.getFamilyName();
  htmlString+="\n <li>  Image URL: " + profile.getImageUrl();
  htmlString+="\n <li>  Email: " + profile.getEmail();
  htmlString+="\n</ul>";
  document.getElementById(htmlElmId).innerHTML=htmlString;
}

function renderLogOutInfo(htmlElmId) {
    var htmlString="<p>No user logged in</p>";
    document.getElementById(htmlElmId).innerHTML=htmlString;
}

function signOut() 
{
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () 
    {
      console.log('User signed out.');
    });
}

function userChanged(user){
    document.getElementById("userName").innerHTML=user.getBasicProfile().getName();


    var userInfoElm = document.getElementById("userStatus");
    var userNameInputElm = document.getElementById("author");

    if(userInfoElm ){// pre 82GoogleAccessBetter.html
        renderUserInfo(user,"userStatus");
    }else if (userNameInputElm){// pre 82GoogleAccessBetterAddArt.html
            userNameInputElm.value=user.getBasicProfile().getName();
    }

}


var updateSignIn = function() {
    var sgnd = auth2.isSignedIn.get();
    if (sgnd) {
        document.getElementById("SignInButton").classList.add("skryty");
        document.getElementById("SignedIn").classList.remove("skryty");
        document.getElementById("userName").innerHTML=auth2.currentUser.get().getBasicProfile().getName();
    }else{
        document.getElementById("SignInButton").classList.remove("skryty");
        document.getElementById("SignedIn").classList.add("skryty");
    }

    var userInfoElm = document.getElementById("userStatus");
    var userNameInputElm = document.getElementById("author");

    if(userInfoElm ){
        if (sgnd) {
            renderUserInfo(auth2.currentUser.get(),"userStatus");

        }else{
            renderLogOutInfo("userStatus");
        }
    }

    if (userNameInputElm){// for GoogleAccessAddArt.html
        if (sgnd) {
            userNameInputElm.value=auth2.currentUser.get().getBasicProfile().getName();
        }else{
            userNameInputElm.value="";
        }


    }

}

function startGSingIn() {
    gapi.load('auth2', function() {
        gapi.signin2.render('SignInButton', {
            'width': 240,
            'height': 50,
            'longtitle': true,
            'theme': 'dark',
            'onsuccess': onSuccess,
            'onfailure': onFailure
        });
        gapi.auth2.init().then( //zavolat po inicializĂˇcii OAuth 2.0
            function (){
                console.log('init');
                auth2 = gapi.auth2.getAuthInstance();
                auth2.currentUser.listen(userChanged);
                auth2.isSignedIn.listen(updateSignIn);
                auth2.then(updateSignIn); //tiez po inicializacii
            });
    });

}

function onSuccess(googleUser) {
    console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
}
function onFailure(error) {
    console.log(error);
}