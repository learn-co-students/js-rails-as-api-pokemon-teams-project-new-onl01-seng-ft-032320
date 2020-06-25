const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

// GET Fetch to get all of the trainers
fetch(TRAINERS_URL).then(function(response) {
    return response.json();
    }).then(function(json) {
    
    for (const trainer of json) {
        console.log(`${trainer.name} has ${trainer.pokemons.length} pokemons`);
        const div = document.createElement('div');
        const p = document.createElement('p');
        const addPokemonButton = document.createElement('button');
        const ul = document.createElement('ul');

        div.className = "card";
        div.setAttribute("data-id", trainer.id);
        p.innerHTML = trainer.name;
        div.appendChild(p);

        addPokemonButton.setAttribute('data-trainer-id', trainer.id);
        addPokemonButton.innerHTML = "Add Pokemon";
        
        if (trainer.pokemons.length >= 6) {
            addPokemonButton.disabled = true;
        } else {
            addPokemonButton.disabled = false;
            addPokemonButton.style.cursor = "pointer";
        }


        addPokemonButton.addEventListener('click', function(event) {
            // Post Fetch to add pokemon to trainer team
            fetch(POKEMONS_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify({ "trainer_id": event.target.dataset.trainerId })
            }).then(function(resp) {
                return resp.json();
            }).then(function(poke) {
                generatePokemon(ul, poke);
            });
        });

        div.append(addPokemonButton);
        div.append(ul);

        for (const pokemon of trainer.pokemons) {
            generatePokemon(ul, pokemon);
        }

        document.querySelector("main").append(div);
    }
}).catch(function(error) {
    console.log(error.message);
});
// Fetch request done


//Generate pokemon function
function generatePokemon(ul, pokemon) {
    const li = document.createElement('li');
    const releaseBtn = document.createElement('button');

    li.innerHTML = `${pokemon.nickname} (${pokemon.species})`;

    releaseBtn.className = "release";
    releaseBtn.setAttribute("data-pokemon-id", pokemon.id);
    releaseBtn.innerHTML = "Release";
    releaseBtn.style.cursor = "pointer";
    releaseBtn.addEventListener("click", function(event) {
        fetch(`${POKEMONS_URL}/${pokemon.id}`, {
            method: "DELETE"
        }).then(function () {
            event.target.parentElement.remove();
        });
    });

    li.append(releaseBtn);
    ul.append(li);
}