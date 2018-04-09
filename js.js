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