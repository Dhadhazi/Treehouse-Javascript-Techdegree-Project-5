const gallery = document.getElementById('gallery');

async function buildPage() {
        let response = await fetch('https://randomuser.me/api/?results=12');
        let data = await response.json();
        await displayUseres(data.results);
        await addEventListeners(data.results);
}

function displayUseres(data) {
    let usersAll = '';
    for (let i = 0; i < data.length; i++) {
        usersAll += `
        <div class="card" id=${i}>
            <div class="card-img-container">
                <img class="card-img" src="${data[i].picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data[i].name.title} ${data[i].name.first} ${data[i].name.last}</h3>
                <p class="card-text">${data[i].email}</p>
                <p class="card-text cap">${data[i].location.city}, ${data[i].location.state}</p>
            </div>
        </div>`
    }
    gallery.innerHTML = usersAll;
}


function addEventListeners(data) {
    const cards = document.querySelectorAll(".card");
    for (let i = 0; i < cards.length; i++) {
        cards[i].addEventListener('click', () => {
            const birthday = data[i].dob.date.slice(8, 10) + '/' + data[i].dob.date.slice(5, 7) + '/' + data[i].dob.date.slice(0, 4);
            const userInfo = `
						<div class="modal-container">
			                <div class="modal">
			                    <button type="button" id="modal-close-btn" class="modal-close-btn" onClick="removeMe()"><strong>X</strong></button>
			                    <div class="modal-info-container">
			                        <img class="modal-img" src="${data[i].picture.large}" alt="profile picture">
			                        <h3 id="name" class="modal-name cap">${data[i].name.title} ${data[i].name.first} ${data[i].name.last}</h3>
			                        <p class="modal-text">${data[i].email}</p>
			                        <p class="modal-text cap">${data[i].location.city}</p>
			                        <hr>
			                        <p class="modal-text">${data[i].phone}</p>
			                        <p class="modal-text">${data[i].location.street.number} ${data[i].location.street.name}, ${data[i].location.city}, ${data[i].location.state}, ${data[i].location.country} ${data[i].location.postcode}</p>
			                        <p class="modal-text">Birthday: ${birthday}</p>
			                    </div>
			                </div>
			            </div>`
            const div = document.createElement('DIV');
            div.className = 'modal-container';
            div.innerHTML = userInfo;
            gallery.parentNode.appendChild(div);
        });
    }

}

function removeMe() {
    const card = document.querySelector(".modal-container");
    card.parentNode.removeChild(card);
}


buildPage();