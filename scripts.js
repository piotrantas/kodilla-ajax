
var url = 'http://api.icndb.com/jokes/random'; 

var button = document.getElementById('get-joke'); 
button.addEventListener('click', function(){  
  getJoke();
});

window.onload = getJoke(); 

var paragraph = document.getElementById('joke'); 

function getJoke() {
  var xhr = new XMLHttpRequest(); 
  xhr.open('GET', url); 
  xhr.addEventListener('load', function(){  
    var odp = JSON.parse(xhr.response); 
    paragraph.innerText = odp.value.joke; 
  });
  xhr.send(); 
}



/*
//wersja jquery
var url = 'http://api.icndb.com/jokes/random'; 

var $button = $('#get-joke').click(function() { 
	getJoke();
});

window.onload = getJoke(); 

var $paragraph = $('#joke'); 

function getJoke() {
$.ajax({  
	method: 'GET',  
	url: url,   
	success: function(sparsowanaOdpowiedzSerwera) {   
		$paragraph.text(sparsowanaOdpowiedzSerwera.value.joke); 
	}

});
}
*/