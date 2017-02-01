var url = 'https://restcountries.eu/rest/v1/name/';
var countriesList = $('#countries');


$('#search').click(searchCountries);

$('#country-name').keypress(function(e){
  if(e.keyCode==13)
    $('#search').click();
  });

function searchCountries() {
 	var countryName = $('#country-name').val();
	if(!countryName.length) countryName = 'Poland';
	$.ajax({
  		url: url + countryName,
  		method: 'GET',
  		success: showCountriesList
  	});
}

function showCountriesList(resp) {
  	countriesList.empty();
   	resp.forEach(function(item){
   			$('<li>').css({"color": "#fff"}).text('Full name is ' + item.name).appendTo(countriesList);
        $('<li>').text('Capital is ' + item.capital).appendTo(countriesList);
        $('<li>').text('Country is in ' + item.region).appendTo(countriesList);
        $('<li>').text('Population is ' + item.population + ' people').appendTo(countriesList);
        $('<li>').text('Full name in german is ' + item.translations.de).appendTo(countriesList);
  
	});
}














