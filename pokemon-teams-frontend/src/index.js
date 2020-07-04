const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;
const main = document.querySelector('main');

document.addEventListener("DOMContentLoaded", () => {
  getTrainers(); 
});

function getTrainers() {
  fetch(TRAINERS_URL)
  .then(resp => resp.json())
  .then(json => createTrainerCards(json))
  console.log('got trainers');
}

function createTrainerCards(trainers) {
  trainers.forEach(trainer => {
    cardDiv = document.createElement('div');
    cardDiv.className += 'card';
    cardDiv.id += `'${trainer.id}'`;

    cardDiv.innerHTML += `<p> ${trainer.name} </p>
    <button class="add" trainer-button-id="${trainer.id}">Add Pokemon</button>
    <ul class="poke-list" id="${trainer.id}"> </ul>`;

    addBtn = document.querySelectorAll('.add')

    addBtn.forEach(button => {
      button.addEventListener("click", addPokemon);
    })

    main.appendChild(cardDiv);

    let pokemonList = document.querySelector(`ul[id='${trainer.id}']`);

    trainer.pokemons.forEach(pokemon => {
      pokemonList.innerHTML += `<li id='${pokemon.id}'> ${pokemon.nickname} - ${pokemon.species}  </li> <button class="release" poke-button-id="${pokemon.id}">Release</button>`
      releaseBtn = document.querySelectorAll('.release');
      releaseBtn.forEach(button => {
        button.addEventListener("click", releasePokemon)
      })
    })

  }
  )}

  function addPokemon() {
    console.log('add button clicked');
    let button = event.target
    let ul = button.nextElementSibling;
    let trainer = button.parentElement;
    let id = trainer.id


    if (ul.children.length >= 6) {
      console.log('team size greater than 6')
    } else {
      let id = trainer.id
      console.log('team size less than 6')
      let configObj = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        }
      }


      fetch(`${BASE_URL}/trainers/${id}`, configObj)
      .then(resp => resp.json())
      .then(info => {
        let li = document.createElement('li');
        li.innerHTML += `<li id='${info.id}'> ${info.nickname} - ${info.species}  </li> <button class="release" poke-button-id="${info.id}">Release</button>`
        ul.appendChild(li);
      })
    }
  }


  function releasePokemon() {
    console.log('release button clicked');
    let pokemon = event.target.parentElement;
    let id = pokemon.id;
    let configObj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      }}
      fetch('http://localhost:3000/pokemons/' + id, configObj)
      .then(pokemon.remove())
  }