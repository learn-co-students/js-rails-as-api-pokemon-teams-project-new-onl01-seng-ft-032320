const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener("DOMContentLoaded", () => {
    const main = document.getElementsByTagName("main")[0]

    function getTeams() {
        return fetch(TRAINERS_URL)
                    .then(res => res.json())
    }

    function addPokemon(e) {
        e.preventDefault()
        if (e.target.nextSibling.childElementCount < 6) {
            const destinationUrl = `${POKEMONS_URL}`,
                    configurationObject = {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            "Accept": "application/json"
                        },
                        body: JSON.stringify({
                            "trainer_id": e.target.dataset.trainerId
                        })
                    };
            fetch(destinationUrl, configurationObject)
                .then(resp => resp.json())
                .then((newPokemon) => {
                    let roster = e.target.nextSibling
                    renderPokemon(newPokemon, roster)
                })
        } else {
            alert("roster full")
        }
    }

    function releasePokemon(e) {
        e.preventDefault()
        const destinationUrl = `${POKEMONS_URL}/${e.target.dataset.pokemonId}}`,
                configurationObject = {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                }
        fetch(destinationUrl, configurationObject)
            .then(resp => resp.json())
            .then(json => {
                e.target.parentElement.remove()
            });
    }

    function renderPokemon(pokemon, roster) {
        let li = document.createElement('li')
        let rlsBtn = document.createElement('button')

        // assign values and attributes to elements
        li.innerText = pokemon.nickname + " (" + pokemon.species + ") "
        rlsBtn.innerText = "Release"
        rlsBtn.classList.add('release')
        rlsBtn.dataset.pokemonId = pokemon.id

        // add listeners to elements
        rlsBtn.addEventListener('click', (e) => {
            releasePokemon(e)
        });

        // add elements to parents
        li.appendChild(rlsBtn)
        roster.appendChild(li)
    }

    function renderTeams(team) {
        // create elements
        let card = document.createElement('div')
        let trainerName = document.createElement('p')
        let addBtn = document.createElement('button')
        let roster = document.createElement('ul')

        // assign values and attributes to elements
        card.classList.add('card')
        card.dataset.id = team.id
        trainerName.innerText = team.name
        addBtn.innerText = "Add Pokemon"
        addBtn.dataset.trainerId = team.id

        // iterate adding pokemon to roster
        for (const pokemon of team.pokemons) {
            // create elements
            renderPokemon(pokemon, roster);
        }

        // add listeners to elements
        addBtn.addEventListener('click', (e) => {
            addPokemon(e)
        })

        // add elements to parents
        card.appendChild(trainerName);
        card.appendChild(addBtn);
        card.appendChild(roster);
        main.appendChild(card);

    }

    getTeams().then(teams => {
        teams.forEach(team => {
            renderTeams(team)
        })
    });
});
