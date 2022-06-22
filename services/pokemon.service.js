const axios = require('axios');
const {v4: uuidv4} = require('uuid');
const pokemonModel = require('./../models/pokemon.model');

const pokeApiUrl = 'https://pokeapi.co/api/v2';

getPokemon = async(id) => {
    try {
        let response;
        const pokemonBD = await pokemonModel.getByIdPokemon(id);
        if (pokemonBD.length != 0) {
            response = pokemonBD;
        } else {
            const apiResponse = await axios.get(`${pokeApiUrl}/pokemon/${id}`);
            response = apiResponse.data;
            const savedPokemon = await addPokemon(response);
            console.log(savedPokemon);
        }
        return response;
    } catch (error) {
        console.log(error);
    }
};

addPokemon = async(pokemonData) => {
    let pokemon;
    const id = uuidv4();
    const pokemon_id = pokemonData.id; 
    const name = pokemonData.name;
    const height = pokemonData.height;
    const weight = pokemonData.weight;
    const image = pokemonData.sprites.front_default;
    const location = 'pueblo paleta';
    const moves = getMoves(pokemonData.moves);
    const abilities = getAbilities(pokemonData.abilities);

    await pokemonModel.addPokemon({id, pokemon_id, name, height, weight, image, location, moves, abilities})
        .then((res) => pokemon = res);
    return pokemon;
};

getMoves = (data) => {
    let movesArray = [];
    for (const move of data) {
        movesArray.push(move.move.name);
    }
    const moves = JSON.stringify(movesArray);
    return moves;
};

getAbilities = (data) => {
    let abilitiesArray = [];
    for (const ability of data) {
        abilitiesArray.push(ability.ability.name);
    }
    const abilities = JSON.stringify(abilitiesArray);
    return abilities;
}

module.exports = { getPokemon };