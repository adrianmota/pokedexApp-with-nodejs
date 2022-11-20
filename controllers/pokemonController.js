const Pokemon = require('../models/pokemon');
const PokemonType = require('../models/pokemonType');
const Region = require('../models/region');

exports.getPokemonList = (req, res, next) => {
    Pokemon.findAll({ include: [{ model: PokemonType }, { model: Region }] })
        .then(result => {
            const pokemon = result.map(result => result.dataValues);
            res.render('pokemon/pokemonList', {
                title: 'Pokemon',
                pokemon,
                hasPokemon: pokemon.length > 0
            });
        }).catch(err => console.error(err));
}

exports.getCreatePokemon = (req, res, next) => {
    let hasNoPokemonTypes = false;
    let hasNoRegions = false;

    PokemonType.findAll()
        .then(result => {
            const pokemonTypes = result.map(result => result.dataValues);
            hasNoPokemonTypes = pokemonTypes.length == 0;

            Region.findAll()
                .then(result => {
                    const regions = result.map(result => result.dataValues);
                    hasNoRegions = regions.length == 0;

                    if (hasNoPokemonTypes || hasNoRegions) {
                        res.render('pokemon/savePokemon', {
                            canShowForm: false,
                            editMode: false,
                        });
                        return;
                    }

                    res.render('pokemon/savePokemon', {
                        title: 'Create Pokemon',
                        canShowForm: true,
                        editMode: false,
                        regions,
                        pokemonTypes
                    });
                }).catch(err => console.error(err));
        }).catch(err => console.error(err));
}

exports.postCreatePokemon = (req, res, next) => {
    const { name, photoUrl, regionId, pokemonTypeId } = req.body;
    const pokemon = { name, photoUrl, regionId, pokemonTypeId };
    let { hasNoName, hasNoPhotoUrl, hasNoRegion, hasNoPokemonType } = false;

    if (!name) hasNoName = true;
    if (!photoUrl) hasNoPhotoUrl = true;
    if (!regionId) hasNoRegion = true;
    if (!pokemonTypeId) hasNoPokemonType = true;

    if (hasNoName || hasNoPhotoUrl || hasNoRegion || hasNoPokemonType) {
        PokemonType.findAll()
            .then(result => {
                const pokemonTypes = result.map(result => result.dataValues);

                Region.findAll()
                    .then(result => {
                        const regions = result.map(result => result.dataValues);

                        res.render('pokemon/savePokemon', {
                            title: 'Crear Pokémon',
                            canShowForm: true,
                            editMode: false,
                            regions,
                            pokemonTypes,
                            hasNoName,
                            hasNoPhotoUrl,
                            hasNoRegion,
                            hasNoPokemonType,
                            pokemon,
                        });
                    }).catch(err => console.error(err));
            }).catch(err => console.error(err));
    }

    Pokemon.create(pokemon)
        .then(result => res.status(302).redirect('/pokemon'))
        .catch(err => console.error(err));
}

exports.getEditPokemon = (req, res, next) => {
    const { id } = req.params;
    const edit = req.query.edit;

    if (!edit)
        res.status(302).redirect('/pokemon');

    Pokemon.findOne({ where: { id } })
        .then(result => {
            const pokemon = result.dataValues;

            PokemonType.findAll()
                .then(result => {
                    const pokemonTypes = result.map(result => result.dataValues);

                    Region.findAll()
                        .then(result => {
                            const regions = result.map(result => result.dataValues);

                            res.render('pokemon/savePokemon', {
                                title: 'Editar Pokémon',
                                canShowForm: true,
                                editMode: true,
                                pokemon,
                                regions,
                                pokemonTypes
                            });
                        }).catch(err => console.error(err));
                }).catch(err => console.error(err));
        }).catch(err => console.error(err));
}

exports.postEditPokemon = (req, res, next) => {
    const { id, name, photoUrl, regionId, pokemonTypeId } = req.body;
    const pokemon = { id, name, photoUrl, regionId, pokemonTypeId };
    let { hasNoName, hasNoPhotoUrl, hasNoRegion, hasNoPokemonType } = false;

    if (!name) hasNoName = true;
    if (!photoUrl) hasNoPhotoUrl = true;
    if (!regionId) hasNoRegion = true;
    if (!pokemonTypeId) hasNoPokemonType = true;

    if (hasNoName || hasNoPhotoUrl || hasNoRegion || hasNoPokemonType) {
        PokemonType.findAll()
            .then(result => {
                const pokemonTypes = result.map(result => result.dataValues);

                Region.findAll()
                    .then(result => {
                        const regions = result.map(result => result.dataValues);

                        res.render('pokemon/savePokemon', {
                            title: 'Editar Pokémon',
                            canShowForm: true,
                            editMode: true,
                            regions,
                            pokemonTypes,
                            hasNoName,
                            hasNoPhotoUrl,
                            hasNoRegion,
                            hasNoPokemonType,
                            pokemon
                        });
                    }).catch(err => console.error(err));
            }).catch(err => console.error(err));
    }

    Pokemon.update({ name, photoUrl, regionId, pokemonTypeId }, { where: { id } })
        .then(result => res.status(302).redirect('/pokemon'))
        .catch(err => console.error(err));
}

exports.getDeletePokemon = (req, res, next) => {
    const { id } = req.params;

    Pokemon.findOne({ where: { id } })
        .then(result => {
            const pokemon = result.dataValues;
            res.render('pokemon/deletePokemon', {
                pokemon
            });
        }).catch(err => console.error(err));
}

exports.postDeletePokemon = (req, res, next) => {
    const { id } = req.body;

    Pokemon.destroy({ where: { id } })
        .then(result => res.status(302).redirect('/pokemon'))
        .catch(err => console.error(err));
}