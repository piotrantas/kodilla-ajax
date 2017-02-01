
var tweetLink = "https://twitter.com/intent/tweet?text=";
var quoteUrl = "http://api.forismatic.com/api/1.0/?method=getQuote&key=867576&format=jsonp&lang=en&jsonp=?";

function getQuote() { //funkcja pobierająca cytaty 
	$.getJSON(quoteUrl, createTweet); // jeszcze bardziej uproszczony jQuery - metoda getJSON - jako argumenty podajemy adres serwera i co ma się zrobić w przypadku sakces - w tym przypadku funkcja createTweet
}

function createTweet(input) { // funkcja tworząca tweety [NIE WIEM DLACZEGO W PARAMETRZE JEst input]
	if (!input.quoteAuthor.length) { //warunek który sprawdza czy jst podany jakiś autor. jeśli wyszukana po kluczu długość autora jest żadan (jest odworotnością (!) jakiejkolwiek) wtedy wstawi w to miejsce autro nieznany
		input.quoteAuthor = "Unknown author";
	}

	var tweetText = "Quote of the day - " + input.quoteText + " Author: " + input.quoteAuthor; // tworzymy tekst tweet pisząc nasz tekst plus wyszukane po kluczach odpowiednie dane z odpowiedzi serwera
	
	if (tweetText.length > 140) { // sprawdzamy czy długość tak stworzonego tweeta jest mnijesza niż 140 (by go Tweeter przyjął)
		getQuote(); //jeśli nie to jeszcze raz pobieramy cytat
	} else { // jeśli jst mniejsza to
		var tweet = tweetLink + encodeURIComponent(tweetText); //tworzymy tweet z liku do tworzenia tweetów (na samej górze) i tekstu tweeta, przerobonego przez encodeURIComponent na teks, który, gdyby w tekście tweeta wystąpiły jakieś elementy, podobne do składni js nie pogupi samego js i się dobrze wyświetli
		$('.quote').text(input.quoteText); // do elementu o klasie quote dodajemy tekst ( poprany z zerwera cyctat)
		$('.author').text("Author: " + input.quoteAuthor); // podobnie jak wyżej
		$('.tweet').attr('href', tweet); // ustawiamy wartość atrybutu href dla elementu o klasie tweet(przycisk) na to co jest pod zmienną tweet, czyli link do tworzenia tweetów i treść tweeta. w ten sposób link, który zadziała po naciśnięcu <a> z opisem tweeter będzie linkiem do dodania tweeta
	}
}

$(document).ready(function() { // po załadowaniu strony 
	getQuote(); // wykona get Quote (czyli właściwie wszystko co zrobiliśmy)
	$('.trigger').click(function() { // ustawi odpalacz, czyli klik na elemencie z klasą trigger, który odpalać będzie getQuote
		getQuote();
	})
});






















