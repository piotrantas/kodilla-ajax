
var url = 'http://api.icndb.com/jokes/random'; // zmienna trzymająca adres (nie trzeba go póżniej wpisywać)

var button = document.getElementById('get-joke'); // zmienna pobierająca przycisk 
button.addEventListener('click', function(){  //nasłuchiwanie przycisku  - po kliknięciu wykona getJoke
  getJoke();
});

window.onload = getJoke(); // wykona getJoke przy ładowaniu strony/okna 

var paragraph = document.getElementById('joke'); //pobiera paragraf z html by go dalej wykorzystać

function getJoke() {
  var xhr = new XMLHttpRequest(); // tworzymy nową instancję obiektu XMLHttpRequet() czyli zapytanie, zamykając ją w zmiennej
  xhr.open('GET', url); //na zmiennej trzymającej zapytanie wykonujemy metodę open i nadajemy jej parametry - 'GET' (metoda protokołu HTTP, która pobiera zasoby z serwera) i url (nasza adres serwera z którego chcemy pobrać dane, gdybyśmy wcześniej nie utworzyli zmiennej "url" to wpisalibyśmy cały adres. w tym przypadku jest też rzecia zmienna,która poprzez true lub false okresla czy metoda open wykana się synchornicznie(false) czy asynchronicznie(true), domyślnie jest ustawine true, więc tutaj, niczego nie pisząc, okreslamy metodę jako asynchroniczną - nie wstrzyma ona działania pozostałej części kodu)
  xhr.addEventListener('load', function(){  //na zmiennej  trzymającej zapytanie ustawiamy teraz nasłuchiwacz odpowiedzi, który po jej załadowaniu (load) odpali funkcję
    var odp = JSON.parse(xhr.response); // w naszej funkcji, która wykona się po odpowiedzi serwera i jej załadowaniu (load) tworzymy zmieną odp, która trzyma odpowiedź serwera. Odpowiedź ta jest  formacie JSON, by ją wykoryzstać w js musimy ją sparsować, czyli wykonać na niej metodę (specjalna, wbudowana w JSON) .parse, która zmienia to co w JSON w zrozumiały dla js obiekt. Czyli po kolei - JSONowy obiekt odpowiedzi parsujemy biorąc atrybut response (trzymający w sobie samą odpowiedź) z zmiennej xhr trzymającej całe zapytanie (czyli w tym i odpowiedź). W ten sposób zmienna odp w rezultanice trzyma odpowiedź serwera przygotowaną do manipulacji w js - możemy dalej coś z nią robić
    paragraph.innerText = odp.value.joke; //w zmienną paragraph, pd którą wczesniej zamkneliśmy paragraf ze strony wstawiamy wartość dowcipu. Wartośc ta, zamknięta jest w zmiennej odp odpowienia wyżej przygotowanej do przetwarzania. Zmienna odp ma dwa klucze - type i value (możemy je podejżeć w Network, gdzie odpowiedź jest już sparsowana przez przeglądarkę, niezależnie od naszego parsowania, więc i tak musimy je zrobić), tam widzimy, że tym co trzyma treść dowcipu na którym nam zalezy jest categoria joke. Zatem by do tej treści się dostać i przypisać ją do treści paragrafu musimy wziąć odpowiedź (odp) i wniej po kolei dotrzeć do value i joke. W ten sposób w paragrafie wyświetli nam się to co jest w joke
  });
  xhr.send(); // wysyłamy nasze zapytanie 
}



/*
//wersja jquery
var url = 'http://api.icndb.com/jokes/random'; //to co wyżej

var $button = $('#get-joke').click(function() { //jak wyżej: twrzymy jQuerową zmienną i wstawiamy w nią - weź get-joke (button z takim id) i po kliknięciu w niego wykonaj funcję getJoke
	getJoke();
});

window.onload = getJoke(); // to co wyżej

var $paragraph = $('#joke'); // jak wyżej: twrzymy jQuerową zmienną i wstawiamy w nią - weź joke (paragraf z takim id)

function getJoke() {
$.ajax({                           // tworzymy jquerową metodę ajaxa wpisując w nią obiekt js
	method: 'GET',                   // określamy metodę (zamiast open) i wpisujemy jak ma być - w tym przypadku GET, czyli pobranie zasobów z serwera
	url: url,                        // określamy żródło/serwer i wpisujemy adres www, w tym przypadku zamknięty pod zmienną url
	success: function(sparsowanaOdpowiedzSerwera) {         // okreslamy co ma się stać w przypadku udanego (sakces!) wysłania i odebrania danych z serwera. Nie musimy parsować bo jQuery robi to za nas i te sparsowane dane znajdują się parametrze funkcji (zawsze) - określamy "nazwę" parametru funkcji by póżniej móc się do tych danych dostać
		$paragraph.text(sparsowanaOdpowiedzSerwera.value.joke); // w zmiennej $paragraph wstawiamy przy uzyciu metody .text to co znajdziemy w odpowiedzi serwera (zamkniętej w parametrze funkcji) - a tam tak jak wyżej jest klucz value a w nim joke, który trzyma treść naszego dowcipu
	}

});
}
*/