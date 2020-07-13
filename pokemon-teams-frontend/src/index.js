const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`


document.addEventListener("DOMContentLoaded", () => {
  getData()
})

function getData() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(data => createCards(data))
}

function createCards(trainers) {
  let container = document.getElementById("container")
  trainers.forEach(trainer => {
     container.innerHTML +=
     `
     <div class="card" data-id="${trainer.id}"><p>"${trainer.name}"</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
           <ul data-pokemons-for-trainer="${trainer.id}"></ul>
     </div>
     `

     let trainersPokemonContainer = document.querySelector(`ul[data-pokemons-for-trainer='${trainer.id}'`)

     trainer.pokemons.forEach(pokemon => {
        trainersPokemonContainer.innerHTML +=
        `
        <li>${pokemon.nickname} (${pokemon.species})
        <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
        </li>
        `
     });

     let addPokemonButton = document.querySelectorAll("div > button")
     addPokemonButton.forEach(button => {
        button.addEventListener("click", () => {
           if (button.nextElementSibling.children.length < 6){
              createPokemon()}
           })
     });

     let releases = document.querySelectorAll(".release")
     releases.forEach(release => {
        release.addEventListener("click", releasePokemon)
     });
  });
}

function releasePokemon(){
  let pokemonID = (event.target.dataset.pokemonId)
  let configObj = {
  method: "DELETE",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json"
  }}
  
  fetch(`${POKEMONS_URL}/${pokemonID}`,configObj)
  .then(event.target.parentElement.remove())
}

function createPokemon(){

  let trainerUL = event.target.nextElementSibling
  let trainerId = event.target.dataset.trainerId
  let configObj = {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  }}
  
  fetch(`${BASE_URL}/trainers/${trainerId}/pokemons`,configObj)
  .then(resp => resp.json())
  .then(data => {
     let li = document.createElement("li")
     let pokemon = data.pokemons[trainerUL.children.length]
     li.innerHTML += 
     `
     ${pokemon.nickname} (${pokemon.species})
     <button class="release" data-pokemon-id="${pokemon.id}">Release</button>
     `
     trainerUL.appendChild(li)
     trainerUL.lastChild.addEventListener("click", releasePokemon)
  })

} 