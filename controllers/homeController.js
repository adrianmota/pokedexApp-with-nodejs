const Pokemon = require('../models/pokemon');
const PokemonType = require('../models/pokemonType');
const Region = require('../models/region');

exports.getHome = (req, res, next) => {
    Pokemon.findAll({ include: [{ model: PokemonType }, { model: Region }] })
        .then(result => {
            const pokemon = result.map(result => result.dataValues);

            Region.findAll()
                .then(result => {
                    const regions = result.map(result => result.dataValues);

                    res.render('home/index', {
                        title: 'Pokemon',
                        pokemon,
                        regions,
                        hasPokemon: pokemon.length > 0
                    });
                }).catch(err => console.error(err))
        }).catch(err => console.error(err));
}

exports.postFilter = (req, res, next) => {
    const regionId = req.body.regionId;

    if (!regionId) res.status(302).redirect('/');

    Pokemon.findAll({ include: [{ model: PokemonType }, { model: Region }] })
        .then(result => {
            let pokemon = result.map(result => result.dataValues);
            pokemon = pokemon.filter(pokemon => pokemon.regionId == regionId);

            Region.findAll()
                .then(result => {
                    const regions = result.map(result => result.dataValues);

                    res.render('home/index', {
                        title: 'Pokemon',
                        pokemon,
                        regions,
                        hasPokemon: pokemon.length > 0
                    })
                }).catch(err => console.error(err));
        }).catch(err => console.error(err));
}

exports.postSearchByName = (req, res, next) => {
    const pokemonName = req.body.pokemonName;

    if (!pokemonName) res.status(302).redirect('/');

    Pokemon.findAll({ include: [{ model: PokemonType }, { model: Region }] })
        .then(result => {
            let pokemon = result.map(result => result.dataValues);
            pokemon = pokemon.filter(pokemon => pokemon.name.toLowerCase().includes(pokemonName.toLowerCase()));

            Region.findAll()
                .then(result => {
                    const regions = result.map(result => result.dataValues);

                    res.render('home/index', {
                        title: 'Pokemon',
                        pokemon,
                        regions,
                        pokemonName,
                        hasPokemon: pokemon.length > 0
                    })
                }).catch(err => console.error(err));
        }).catch(err => console.error(err))
}