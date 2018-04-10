//tootips
$(document).ready(function(){
    $('[data-toggle="tooltip"]').tooltip();   
});

//dropdown menu index page
var dropdown = document.getElementsById("DownTree");
var i;
for (i = 0; i < dropdown.length; i++) 
{
  dropdown[i].addEventListener("click", 
    function() 
    {
      var dropdownContent = this.nextElementSibling;
      if (dropdownContent.style.display === "block") 
      {
        dropdownContent.style.display = "none";
      } 
      else 
      {
        dropdownContent.style.display = "block";
      }
    }
  );
}

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