const pokedex = document.getElementById("pokedex");

// store all pokemon in a list
let allPokemon = [];

for (let i = 1; i <= 150; i++) {
    // loop through each link
    const url = 'https://pokeapi.co/api/v2/pokemon/' + i;

    // adding the result.json() to our allPokemon array
    allPokemon.push(
        fetch(url)
            .then(res => res.json())
    );
};


// get & set 'badge' on card ('i', 'ii', 'iii')
function evoTier(element) {
    const tierOne = [
        'bulbasaur',
        'charmander',
        'squirtle',
        'caterpie',
        'weedle',
        'pidgey',
        'rattata',
        'spearow',
        'ekans',
        'pikachu',
        'sandshrew',
        'nidoran-f',
        'nidoran-m',
        'clefairy',
        'vulpix',
        'jigglypuff',
        'zubat',
        'oddish',
        'paras',
        'venonat',
        'diglett',
        'meowth',
        'psyduck',
        'mankey',
        'growlithe',
        'poliwag',
        'abra',
        'machop',
        'bellsprout',
        'tentacool',
        'geodude',
        'ponyta',
        'slowpoke',
        'magnemite',
        'farfetchd',
        'doduo',
        'seel',
        'grimer',
        'shellder',
        'gastly',
        'onix',
        'drowzee',
        'krabby',
        'voltorb',
        'exeggcute',
        'cubone',
        'hitmonlee',
        'lickitung',
        'koffing',
        'rhyhorn',
        'chansey',
        'tangela',
        'kangaskhan',
        'horsea',
        'goldeen',
        'staryu',
        'mr-mime',
        'scyther',
        'jynx',
        'electabuzz',
        'magmar',
        'pinsir',
        'tauros',
        'magikarp',
        'lapras',
        'ditto',
        'eevee',
        'porygon',
        'omanyte',
        'kabuto',
        'aerodactyl',
        'snorlax',
        'articuno',
        'zapdos',
        'moltres',
        'dratini',
        'mewtwo'
    ];

    const tierTwo = [
        'ivysaur',
        'charmeleon',
        'wartortle',
        'metapod',
        'kakuna',
        'pidgeotto',
        'raticate',
        'fearow',
        'arbok',
        'raichu',
        'sandslash',
        'nidorina',
        'nidorino',
        'clefable',
        'ninetales',
        'wigglytuff',
        'golbat',
        'gloom',
        'parasect',
        'venomoth',
        'dugtrio',
        'persian',
        'golduck',
        'primeape',
        'arcanine',
        'poliwhirl',
        'kadabra',
        'machoke',
        'weepinbell',
        'tentacruel',
        'graveler',
        'rapidash',
        'slowbro',
        'magneton',
        'dodrio',
        'dewgong',
        'muk',
        'cloyster',
        'haunter',
        'hypno',
        'kingler',
        'electrode',
        'exeggutor',
        'marowak',
        'hitmonchan',
        'weezing',
        'rhydon',
        'seadra',
        'seaking',
        'starmie',
        'gyarados',
        'vaporeon',
        'jolteon',
        'flareon',
        'omastar',
        'kabutops',
        'dragonair'
    ];

    const tierThree = [
        'venusaur',
        'charizard',
        'blastoise',
        'butterfree',
        'beedrill',
        'pidgeot',
        'nidoqueen',
        'nidoking',
        'vileplume',
        'poliwrath',
        'alakazam',
        'machamp',
        'victreebel',
        'golem',
        'gengar',
        'dragonite'
    ];

    // console.log(tierOne.includes(element.name));

    if (tierOne.includes(element.name)) {
        element.evolutionTier = 'i';
    } else if (tierTwo.includes(element.name)) {
        element.evolutionTier = 'ii';
    } else {
        element.evolutionTier = 'iii';
    };
};

function displayPokemon(pokemon) {
    // build html string of all pokemon as list items using each objects properties

    pokemon.forEach(element => {
        // console.log('\n')
        // console.log(`name: ${element.name}`)
        let typeBuilder = '';

        element.type.forEach( function eachType(eachType, i) {
            // console.log(`type: ${eachType.type.name}`)
            // console.log(i)
            let theTypeClass = eachType.type.name;
            theTypeDisplay = theTypeClass.toUpperCase();
            
            if (i == 0) {
                typeBuilder += ` <span class='${theTypeClass}'>${theTypeDisplay}</span> `
            } else {
                typeBuilder += `<span id="type-slash">/</span> <span class='${theTypeClass}'>${theTypeDisplay}</span> `
            };

            // console.log(`tempBuilder: ${tempBuilder}`)
        })

        // console.log(element.name)

        // create object key 'properName' with a value of pokemon's name converted to propercase using regex word boundary (mr-mime => Mr-Mime)
        element.properName = element.name.replace(/\b[\w']+\b/g, function(txt){
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });

        // set evolution tier 'badge' in top left ('i', 'ii', 'iii')
        evoTier(element);

        // add a newType property to each object, assigning it the value of typeBuilder - then reset typeBuilder
        element.newType = typeBuilder;
        typeBuilder = '';
    });
    
    const pokemonHTMLString = pokemon
        .map(
            thisPoke =>
            ` <li class="card">

                <p class="${thisPoke.evolutionTier}">${thisPoke.evolutionTier}</p>
            
                <img class="card-image" src="${thisPoke.image}"/>

                    <h2 class="card-title">
                        ${thisPoke.properName}
                    </h2>

                    <p class="card-type">
                        ${thisPoke.newType}
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
            type: data.types // .map(type => type.type.name).join("/"),
        })
    );

    // pass filtered array of objects to function
    displayPokemon(pokemon);
});