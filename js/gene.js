//---------------------------------------------------------tootips
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

//---------------------------------------------------------dropdown menu index page
/* When the user clicks on the button, 
toggle between hiding and showing the dropdown content */
function dropDownBtn() {
    document.getElementById("myDropDown").classList.toggle("showMenu");
}
// Close the dropdown menu if the user clicks outside of it
window.onclick = function(event) {
  if (!event.target.matches('.dropBtn')) {

    var dropdowns = document.getElementsByClassName("dropDown-Content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('showMenu')) {
        openDropdown.classList.remove('showMenu');
      }
    }
  }
}

//---------------------------------------------------------fonctions de mal voyance
function LowVisionMode()
{
  document.body.style.fontSize = '200%';
  $(document.body).addClass("text-white");
  $("h4").removeClass("italic");
  document.body.style.backgroundImage="url(access.jpg)";
}
function NormalVisionMode()
{
  document.body.style.fontSize = '100%';
  $(document.body).removeClass("text-white")
  $("h4").addClass("italic");
  document.body.style.backgroundImage="url(fond.jpg)";
}