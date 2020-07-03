const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


//Top Layer Code
var allPokemons = []


document.addEventListener('DOMContentLoaded', () => {
    fetch(POKEMONS_URL)
    .then(response => response.json())
    .then(json => loopPokemon(json))

    fetch(TRAINERS_URL)
    .then(response => response.json())
    .then(json => createCard(json))

})

//Top Layer Code



//Start main Create Loop
function createCard(jsonObject) {
    let trainerCollection = document.getElementById('main')
    let trainerCard = document.createElement('div').classList.add('card')

    for (const trainerObj of jsonObject) {
        createTrainer(trainerObj);
    }
}

function loopPokemon(jsonObject) {
    for (const pokemon of jsonObject) {
        allPokemons.push(pokemon)
    }
}
//End main Create loop
// Start Trainer 
function createTrainer(trainer) {
    let trainerCollection = document.getElementById('main')
    let trainerCard = document.createElement('div')
    trainerCard.classList.add('card')
    trainerCard.setAttribute('id', trainer.id)
    trainerCollection.appendChild(trainerCard)

    createTrainerName(trainer, trainerCard)
}


// Creates Trainer Elements
function createTrainerName(trainer, trainerCard) {
    let trainerName = document.createElement('h2')
    let addButton = document.createElement('button')
    addButton.classList.add('add-pokemon')
    addButton.innerText = 'Add Pokemon'
    createButtonID(addButton)
    trainerName.innerText = trainer.name 
    // console.log(trainerCard)
    trainerCard.appendChild(trainerName)
    trainerCard.appendChild(addButton)

    addPokemons(trainer, trainerCard);
}

//Add Event Listener to all buttons

let counter = 1
function createButtonID(button) {

    for (i = 0; i < counter; i++) {
        button.id = `button${counter}`

    }
    counter++
}

//Start Pokemon Functions

function addPokemons(trainer, trainerCard) {
    let pokeList = document.createElement('ul')
    pokeList.classList.add('pokemon-list')
    trainerCard.appendChild(pokeList)

    let trainerID = trainer.id
    for (let pokemon of allPokemons) {
        if (pokemon.trainer_id == trainer.id) {
            let pokeElement = document.createElement('li')
            pokeElement.innerHTML = `${pokemon.nickname} | ${pokemon.species}`
            pokeList.appendChild(pokeElement)
        }
    }
}

const allButtons = document.getElementsByClassName('add-pokemon')
for (btn in allButtons) {
    console.log(btn[0])
}


//Used to add random pokemon
function random() {
    let randInt = Math.floor(Math.random() * 10)
    for (poke of allPokemons) {
        if (poke.id == randInt && poke) {
            return poke
        }
    }
}

