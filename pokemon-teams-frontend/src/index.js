const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
let pokemons;

function getTrainers() {
    fetch(TRAINERS_URL, {
            method: "GET",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify()
        })
        .then(response => response.json())
        .then(data => {
            renderTrainers(data);
            // console.log(data);
        })
        .catch((error) => {
            console.error('Error:', error)
        })
}

// function getPokemons() {
//     fetch(POKEMONS_URL, {
//             method: "GET",
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify()
//         })
//         .then(response => response.json())
//         .then(data => {
//             renderPokemons(data);
//         })
//         .catch((error) => {
//             console.error('Error:', error)
//         })
// }

function renderTrainers(data) {
    for (el of data) {
        document.querySelector("main").innerHTML += `
            <div class="card">
            <p>${el.name}</p>
            <button data-trainer-id="${el.id}">Add Pokemon</button>
        // add pokemons
             <ul class="pokeList">
                ${el.pokemons.map(e=> `<li>${e.species}(${e.nickname})</li>`).join('')}
             </ul>
            </div>
        `
    }
}


function renderPokemons(pokes) {
    pokes.forEach(e => {
        document.querySelector(".pokeList").innerHTML += `
            ${e.nickname}
        `
    })
}