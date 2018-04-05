
  function displayHideMenu() 
  {
    document.getElementById('Menu').classList.toggle("shownMenu");
  }

  document.addEventListener("click",
  	function(event) 
  	{
  			if(!event.target.matches()) 
  			{

  			}
  			displayHideMenu();
  	}
  );