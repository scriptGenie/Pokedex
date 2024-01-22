const pokedex = document.getElementById("pokedex");

// store all pokemon in a list
let allPokemon = [];

for (let i = 1; i <= 150; i++) {
    // loop through each link
    const url = 'https://pokeapi.co/api/v1/pokemon/' + i;

    // adding the result.json() to our allPokemon array
    allPokemon.push(
        fetch(url)
            .then(res => res.json())
    );
};


function displayPokemon(pokemon) {
    // build html string of all pokemon as list items using each objects properties
    const pokemonHTMLString = pokemon
        .map(
            thisPoke =>
            ` <li class="card">
            
                <img class="card-image" src="${thisPoke.image}"/>

                    <h2 class="card-title">
                        ${thisPoke.name}
                    </h2>

                    <p class="card-subtitle">
                        Type: ${thisPoke.type}
                    </p>

                    <p class="id-number">${thisPoke.id} of 150</p>

            </li> `
        )
        .join("");

    // add our list elements to the unordered list pokedex
    pokedex.innerHTML = pokemonHTMLString;
};


// after array is fully populated, filter results of list to only include needed data
Promise.all(allPokemon).then(results => {
    const pokemon = results.map(data => 
        // wrapped in parenthesis to implicitly return the object
        ({
            name: data.name,
            id: data.id,
            image: data.sprites["front_default"],
            type: data.types.map(type => type.type.name).join(", "),
        })
    );

    // pass filtered array of objects to function
    displayPokemon(pokemon);
});