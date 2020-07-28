const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

window.addEventListener("load", () => {
  getTrainers();
});

const getTrainers = () => {
  fetch(TRAINERS_URL)
    .then((response) => response.json())
    .then((trainers) => renderTrainer(trainers));
};

const renderTrainer = (trainers) => {
  trainers.forEach((trainer) => trainerCard(trainer));
};

const trainerCard = (trainer) => {
  let main = document.querySelector("main");
  let trainerCard = document.createElement("div");

  trainerCard.dataset.id = trainer.id;
  trainerCard.className = "card";
  let p = document.createElement("p");
  p.innerText = trainer.name;

  let button = document.createElement("button");
  button.setAttribute("data-trainer-id", trainer.id);
  button.innerText = "Add Pokemon";
  button.addEventListener("click", addPokemon);

  // console.log(trainer.pokemons);
  let ul = document.createElement("ul");

  trainer.pokemons.forEach(
    (pokemon) => renderPokemon(ul, pokemon)
    //displays only one pokemon... i need all the pokemons
    // ul.innerHTML += `
    // <li>${pokemon.nickname}(${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
    // `;
  );

  trainerCard.append(p, button, ul);
  main.append(trainerCard);
};

const renderPokemon = (ul, pokemon) => {
  let li = document.createElement("li");
  li.innerText = `${pokemon.nickname} (${pokemon.species})`;

  ul.append(li);

  let button = document.createElement("button");
  button.innerHTML = "release";
  button.classList.add("release");
  button.dataset.pokemonId = pokemon.id;
  button.addEventListener("click", () => {
    event.preventDefault();
    deletePokemon(pokemon);
  });

  li.append(button);
};

const addPokemon = () => {
  fetch(POKEMONS_URL, {
    method: "POST",
    body: JSON.stringify({
      trainer_id: event.target.dataset.trainerId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((newPokemon) => renderPokemon(newPokemon));
};

const deletePokemon = (pokemon) => {
  document
    .querySelector(`[data-pokemon-id='${pokemon["id"]}']`)
    .parentElement.remove();

  let configObj = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  };
  fetch(POKEMONS_URL + `/${pokemon["id"]}`, configObj)
    .then((resp) => resp.text())
    .catch((error) => alert(error.message));
};
