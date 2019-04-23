var section = document.querySelector('section');
/* Возьмем JSON с моего github */
var requestURL = 'https://mirhada.github.io/gfghghf/clients.json';
var request = new XMLHttpRequest();

request.open('GET', requestURL);
request.responseType = 'json';
request.send();
request.onload = function() {
  var clientsInfo = request.response;
  showContract(clientsInfo);
}

function showContract(jsonObj) {
	var clients = jsonObj['clients'];
	// Сюда запишем наш вывод HTML 
	const output = [];
	clients.forEach((elem) => {
      output.push(
        `<div class="panel">
			    	<div class="client__name">
			    			<div class="img__wrapper">

			    				<img src="img/${
			    					// Вставляем картинку в зависимости от состояния и типа договора
			    					elem.state + "-" + elem.type
			    				}.svg" alt="state">
				    		</div>
				    		<div class="text__wrapper">
				    			<h3>${elem.name}</h3>
				    			<p class="small-text">ИНН: ${elem.inn}</p>
				    			<p class="small-text">${
				    				// Вставлем ОГРН, если он есть, если нет Пасспорт
				    				elem.ogrn ? "ОГРН: " + elem.ogrn : "Паспорт: " + elem.passport
				    			}</p>
			    			</div>
			    	</div>
			    	<div class="client__contract">

		    				<div class="img__wrapper">
			    				<img src="img/${
			    					// Вставляем иконку контракта, в зависимости от состояния контракта (можно будет доработать)
			    					elem.state == "active" ? "approved-contract" : "dissolved-contact"
			    				}.svg" alt="state">
				    		</div>
			    			<div class="text__wrapper">
									<h3>${
										// Пока вставляем первый контракт
										elem.contract[0]
									}</h3>
				    			<p class="small-text">Тип договора: по норме</p>
				    		</div>
			    	</div>
			   	  <div class="client__object">
			   	  		<img src="img/object.svg" alt="object">
								<h3 class="object__text">${elem.objects}</h3>
			   	  </div>
			    	<div class="client__volume">
								<h3>${elem.charges} P</h3>
								<h3>${elem.volumes} м<sup>3</sup></h3>
			    	</div>
			    	<div class="client__geozone">
								<h3>${
									// Окончания для геозоны(а) 
									elem.geozone > 1 ? elem.geozone + ' геозоны' : 1 + ' геозона'
								}</h3>
								<h3>${elem.containers} контейнеров - ${elem.volume_containers} м<sup>3</sup></h3>
			    	</div>
         </div>`
      );
    });

    // Собираем наш выход в строку и добавляем в HTML
    section.innerHTML = output.join("");

	}
	