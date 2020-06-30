const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const maxTeamSize = 6

document.addEventListener("DOMContentLoaded", () => {
    fetch(TRAINERS_URL)
        .then(resp => resp.json())
        .then(json => json.forEach(trainer => renderTrainer(trainer)))
})

function renderTrainer(trainer) {
    const main = document.querySelector("main")
    let trainerCard = document.createElement("div")
    trainerCard.classList.add("card")
    trainerCard.innerHTML = trainer["name"]
    trainerCard.dataset.id = trainer["id"]
    main.appendChild(trainerCard)

    let button = document.createElement("button")
    button.innerText = "Add Pokemon"
    button.dataset.trainerId = trainer["id"]
    trainerCard.appendChild(button)
    button.addEventListener("click", () => {
        event.preventDefault()
        if (document.querySelectorAll(`[data-id='${trainer["id"]}'] ul li`).length >= maxTeamSize) {
            alert("Your team is already full")
        } else {
            addPoke(trainer)
        }
    })
    
    let pokeList = document.createElement("ul")
    trainerCard.appendChild(pokeList)
    
    trainer["pokemon"].forEach(poke => renderPoke(pokeList, poke))
}

function renderPoke(list, pokemon) {
    let pokemonLi = document.createElement("li")
    pokemonLi.innerHTML = `${pokemon.nickname} (${pokemon.species})`
    list.appendChild(pokemonLi)
    
    let button = document.createElement("button")
    button.innerHTML = "release"
    button.classList.add("release")
    button.dataset.pokemonId = pokemon["id"]
    pokemonLi.appendChild(button)
    button.addEventListener("click", () => {
        event.preventDefault()
        deletePoke(pokemon)
    })
}

function addPoke(trainer) {
    fetch(BASE_URL + '/pokemon/random')
        .then(resp => resp.json())
        .then(json => postPoke(json, trainer))
}

function postPoke(poke, trainer) {
    let formData = {nickname: poke["nickname"], species: poke["species"], trainer_id: trainer["id"]}

    let configObj = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(formData)
    }
    const list = trainerList(trainer)
    fetch(POKEMONS_URL, configObj)
        .then(resp => resp.json())
        .then(json => renderPoke(list, json))
        .catch(error => alert(error.message))
}

function trainerList(trainer) {
    const list = document.querySelector(`[data-id='${trainer["id"]}'] ul`)
    return list
}

function deletePoke(pokemon) {
    document.querySelector(`[data-pokemon-id='${pokemon["id"]}']`).parentElement.remove()
    // console.log(pokemon["id"])

    let configObj = {       
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"}
        }
    fetch(POKEMONS_URL + `/${pokemon["id"]}`, configObj)
        .then(resp => resp.text())
        .then(message => console.log(message))
        .catch(error => alert(error.message))       
        // document.querySelector(`[data-pokemon-id='${pokemon["id"]}]`).remove() 
}

