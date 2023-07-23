// fetch de la route GET qui permet d'afficher les villes enregistrées en BDD
fetch('http://localhost:3000/weather')
	.then(response => response.json())
	.then(data => {
		if (data.weather) {

			for (let i = 0; i < data.weather.length; i++) {
				document.querySelector('#cityList').innerHTML += `
				<div class="cityContainer">
				<p class="name">${data.weather[i].cityName}</p>
				<p class="description">${data.weather[i].description}</p>
				<img class="weatherIcon" src="images/${data.weather[i].main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather[i].tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather[i].tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather[i].cityName}">Delete</button>
			</div>
			`;
			}
			updateDeleteCityEventListener();
		}
	});


	// fetch de la route DELETE pour retirer la ville de la liste et de l’affichage

	// création de la fonction générique de mise à jour de l'affichage (en fonction du clic de suppression)
	
   // pour cibler la ville à supprimer dans la route, on lui passe son id qui correspond à son nom (cf : au dessus)

function updateDeleteCityEventListener() {
	for (let i = 0; i < document.querySelectorAll('.deleteCity').length; i++) {
		document.querySelectorAll('.deleteCity')[i].addEventListener('click', function () {
			fetch(`http://localhost:3000/weather/${this.id}`, { method: 'DELETE' })
				.then(response => response.json())
				.then(data => {
					if (data.result) {
						this.parentNode.remove();
					}
				});
		});
	}
}

// fetch de la route POST : ajout ciblé de la ville pour l'afficher à la suite des autres

document.querySelector('#addCity').addEventListener('click', function () {
	const cityName = document.querySelector('#cityNameInput').value;

	fetch('http://localhost:3000/weather', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({ cityName }),
	}).then(response => response.json())
		.then(data => {
			if (data.result) {
				document.querySelector('#cityList').innerHTML += `
			<div class="cityContainer">
				<p class="name">${data.weather.cityName}</p>
				<p class="description">${data.weather.description}</p>
				<img class="weatherIcon" src="images/${data.weather.main}.png"/>
				<div class="temperature">
					<p class="tempMin">${data.weather.tempMin}°C</p>
					<span>-</span>
					<p class="tempMax">${data.weather.tempMax}°C</p>
				</div>
				<button class="deleteCity" id="${data.weather.cityName}">Delete</button>
			</div>
					`;
				updateDeleteCityEventListener();
				document.querySelector('#cityNameInput').value = '';
			}

		});
});