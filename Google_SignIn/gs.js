var auth2 = {};
document.getElementById("btn_signOut").innerHTML="Not connected.";

//affichage du nom dans le input articleForm Author
function displayAuthorInput(googleUser)
{
  var profile = googleUser.getBasicProfile();
  document.getElementById("author").value=profile.getName();
  document.getElementById("btn_signOut").innerHTML= "Click to sign out.";
}

function signOut() 
{
  var auth2 = gapi.auth2.getAuthInstance();
  auth2.signOut().then(function () 
  {
    document.getElementById("btn_signOut").innerHTML="User signed out.";
  });
}

// NOT NEEDED FOR US
// function renderUserInfo(googleUser)
// {
//   var profile = googleUser.getBasicProfile();
//   var htmlString="<p>User logged in</p>\n<ul>"
//   htmlString+="\n <li> ID: " + profile.getId();
//   htmlString+="\n <li>  Name: " + profile.getName();
//   htmlString+="\n <li>  Given name: " + profile.getGivenName();
//   htmlString+="\n <li>  Surname: " + profile.getFamilyName();
//   htmlString+="\n <li>  Image URL: " + profile.getImageUrl();
//   htmlString+="\n <li>  Email: " + profile.getEmail();
//   htmlString+="\n</ul>";
//   document.getElementById("htmlElmId").innerHTML=htmlString;
// }

// function renderLogOutInfo(htmlElmId) 
// {
//   var htmlString="<p>No user logged in</p>";
//   document.getElementById("htmlElmId").innerHTML=htmlString;
// }



// function userChanged(user)
// {
//   document.getElementById("userName").innerHTML=user.getBasicProfile().getName();

//   var userInfoElm = document.getElementById("userStatus");
//   var userNameInputElm = document.getElementById("author");

//   if(userInfoElm ){// pre 82GoogleAccessBetter.html
//       renderUserInfo(user,"userStatus");
//   }else if (userNameInputElm){// pre 82GoogleAccessBetterAddArt.html
//           userNameInputElm.value=user.getBasicProfile().getName();
//   }
// }


// var updateSignIn = function() 
// {
//   var sgnd = auth2.isSignedIn.get();
//   if (sgnd) 
//   {
//     document.getElementById("SignInButton").classList.add("skryty");
//     document.getElementById("SignedIn").classList.remove("skryty");
//     document.getElementById("userName").innerHTML=auth2.currentUser.get().getBasicProfile().getName();
//   }
//   else
//   {
//     document.getElementById("SignInButton").classList.remove("skryty");
//     document.getElementById("SignedIn").classList.add("skryty");
//   }

//   var userInfoElm = document.getElementById("userStatus");
//   var userNameInputElm = document.getElementById("author");

//   if(userInfoElm )
//   {
//     if (sgnd) 
//     {
//         renderUserInfo(auth2.currentUser.get(),"userStatus");

//     }
//     else
//     {
//         renderLogOutInfo("userStatus");
//     }
//   }

//   if (userNameInputElm)
//   {// for GoogleAccessAddArt.html
//     if (sgnd) 
//     {
//         userNameInputElm.value=auth2.currentUser.get().getBasicProfile().getName();
//     }
//     else
//     {
//         userNameInputElm.value="";
//     }
//   }
// }

// function startGSingIn() {
//     gapi.load('auth2', function() {
//         gapi.signin2.render('SignInButton', {
//             'width': 240,
//             'height': 50,
//             'longtitle': true,
//             'theme': 'dark',
//             'onsuccess': onSuccess,
//             'onfailure': onFailure
//         });
//         gapi.auth2.init().then(
//             function (){
//                 console.log('init');
//                 auth2 = gapi.auth2.getAuthInstance();
//                 auth2.currentUser.listen(userChanged);
//                 auth2.isSignedIn.listen(updateSignIn);
//                 auth2.then(updateSignIn); 
//             });
//     });

// }

// function onSuccess(googleUser) {
//     console.log('Logged in as: ' + googleUser.getBasicProfile().getName());
// }
// function onFailure(error) {
//     console.log(error);
// }