const execQuery = require('./../helpers/execQuery');
const TYPES = require('tedious').TYPES;

const addPokemon = (pokemonData) => {
    const {
        id,
        pokemon_id,
        name,
        height,
        weight,
        location,
        image,
        moves,
        abilities,
    } = pokemonData;
    const query = `
        INSERT INTO [dbo].[juanpablosaldarriagapokemonlist] (id, pokemon_id, name, height, weight, location, image, moves, abilities)
        VALUES (@id, @pokemon_id, @name, @height, @weight, @location, @image, @moves, @abilities)
    `;
    const parameters = [
        {name: 'id', type: TYPES.UniqueIdentifier, value: id},
        {name: 'pokemon_id', type: TYPES.Int, value: pokemon_id},
        {name: 'name', type: TYPES.VarChar, value: name},
        {name: 'height', type: TYPES.Int, value: height},
        {name: 'weight', type: TYPES.Int, value: weight},
        {name: 'location', type: TYPES.VarChar, value: location},
        {name: 'image', type: TYPES.VarChar, value: image},
        {name: 'moves', type: TYPES.VarChar, value: moves},
        {name: 'abilities', type: TYPES.VarChar, value: abilities},
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const updatePokemon = (pokemonData) => {
    const {
        pokemon_id,
        name,
        height,
        weight,
        location,
        image,
    } = pokemonData;
    const query = `
        UPDATE [dbo].[juanpablosaldarriagapokemonlist]
        SET name=@name, height=@height, weight=@weight, location=@location, image=@image
        WHERE pokemon_id = @pokemon_id
    `;
    const parameters = [
        {name: 'pokemon_id', type: TYPES.Int, value: pokemon_id},
        {name: 'name', type: TYPES.VarChar, value: name},
        {name: 'height', type: TYPES.Int, value: height},
        {name: 'weight', type: TYPES.Int, value: weight},
        {name: 'location', type: TYPES.VarChar, value: location},
        {name: 'image', type: TYPES.VarChar, value: image},
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const deletePokemon = (pokemon_id) => {
    const query = `
        DELETE FROM [dbo].[juanpablosaldarriagapokemonlist]
        WHERE pokemon_id = @pokemon_id
    `;
    const parameters = [
        {name: 'pokemon_id', type: TYPES.Int, value: pokemon_id}
    ];
    return execQuery.execWriteCommand(query, parameters);
};

const getAllPokemon = () => {
    const query = `
        SELECT * FROM [dbo].[juanpablosaldarriagapokemonlist]
    `;
    return execQuery.execReadCommand(query);
};

const getByIdPokemon = (pokemon_id) => {
    const query = `
        SELECT * FROM [dbo].[juanpablosaldarriagapokemonlist]
        WHERE pokemon_id = @pokemon_id
    `;

    const parameters = [
        {name: 'pokemon_id', type: TYPES.Int, value: pokemon_id},
    ];

    return execQuery.execReadCommand(query, parameters);
};

// const completeTodo = (todoID) => {
//     const query = `
//         UPDATE [dbo].[Todos]
//         SET TodoState = 5
//         WHERE TodoID = @todoID
//     `;
//     const parameters = [
//         {name: 'todoID', type: TYPES.UniqueIdentifier, value: todoID},
//     ];

//     return execQuery.execWriteCommand(query, parameters);
// };

// const changeStateTodo = (todoID, state) => {
//     const query = `
//         UPDATE [dbo].[Todos]
//         SET TodoState = @state
//         WHERE TodoID = @todoID
//     `;
//     const parameters = [
//         {name: 'todoID', type: TYPES.UniqueIdentifier, value: todoID},
//         {name: 'state', type: TYPES.SmallInt, value: state},
//     ];

//     return execQuery.execWriteCommand(query, parameters);
// };

module.exports = {
    addPokemon,
    updatePokemon,
    deletePokemon,
    getAllPokemon,
    getByIdPokemon,
};