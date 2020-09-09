const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('load', ()=> {
    getTrainers()
})


function getTrainers() {
    
    fetch(TRAINERS_URL)
    .then(resp => resp.json())
    .then(trainers => {
       trainers.forEach(trainer => renderTrainers(trainer))
       addtrainerListeners()
        
    })
}

function renderTrainers(trainer) {
    
    let trainerCard = document.createElement('div')
    trainerCard.innerHTML += `
    <div class='card'id='trainer-${trainer.id}'>
    <h2>${trainer.name}</h2>
    </div>
    `
    document.querySelector('#trainer-container').appendChild(trainerCard)
}

// function addtrainerListeners() {
//     let trainers = document.querySelectorAll('#trainer-container')
//     trainers.forEach(trainer => {
//         trainer.addEventListener('click', event => {
//             showTrainer(trainer.querySelector("h2").dataset.id)
//         })
//     })
// }

// function showTrainer(id) {
//     const container = document.getElementById("trainer-container")
//     container.innerHTML = ""
//     fetch(`${BASE_URL}/trainers/${id}`)
//     .then(resp => resp.json())
//     .then(data => renderSingleTrainer(data))
// }

// function renderSingleTrainer()