const pokemonRoute = require('express').Router();
const {v4: uuidv4} = require('uuid');
const pokemonModel = require('./../models/pokemon.model');
const pokemonService = require('./../services/pokemon.service');

pokemonRoute.get('/:id', async(req, res) => {
    const { id } = req.params;
    await pokemonService.getPokemon(id)
    .then(data => {
        res.status(200).json({ data });
        // return JSON.parse(data);
    })
    .catch(error => {
        res.status(500);
        console.log(error);
    });
});

pokemonRoute.get('/', async(req, res) => {
    pokemonModel.getAllPokemon()
    .then(data => {
        res.status(200).json({ data });
        // return data;
    })
    .catch(error => {
        res.status(500).json({ error });
    });
});

pokemonRoute.put('/:id', async (req, res) => {
    const { id } = req.params;
    const {
        name,
        height,
        weight,
        location,
        image,
    } = req.body;
    pokemonModel.updatePokemon({
        pokemon_id: id,
        name,
        height,
        weight,
        location,
        image,
    })
    .then((rowCount, more) => {
        res.status(200).json({
            data: {
                rowCount,
                more,
                pokemon_id,
                name,
                height,
                weight,
                location,
                image,
            },
        });
    })
    .catch(error => {
        res.status(500).json({error});
    });
});

pokemonRoute.delete('/:id', async (req, res) => {
    const {id: pokemon_id} = req.params;
    pokemonModel.deletePokemon(pokemon_id)
    .then((rowCount, more) => {
        res.status(200).json({ rowCount, more });
    })
    .catch(error => {
        res.status(500).json({ error });
    })
});

module.exports = pokemonRoute;