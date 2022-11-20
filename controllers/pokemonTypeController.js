const PokemonType = require('../models/pokemonType');

exports.getPokemonTypesList = (req, res, next) => {
    PokemonType.findAll()
        .then(result => {
            const pokemonTypes = result.map(result => result.dataValues);
            res.render('pokemonType/pokemonTypesList', {
                title: 'Tipos de pokemon',
                pokemonTypes,
                hasPokemonTypes: pokemonTypes.length > 0
            });
        })
        .catch(err => console.error(err));
}

exports.getCreatePokemonType = (req, res, next) => {
    res.render('pokemonType/savePokemonType', {
        title: 'Crear tipo de pokemon',
        editMode: false,
    });
}

exports.postCreatePokemonType = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        res.render('pokemonType/savePokemonType', {
            title: 'Crear tipo de pokemon',
            hasNoName: true
        });
        return;
    }

    PokemonType.create({ name })
        .then(result => res.status(302).redirect('/pokemonTypes'))
        .catch(err => console.error(err));
}

exports.getEditPokemonType = (req, res, next) => {
    const { id } = req.params;
    const edit = req.query.edit;

    if (!edit) res.status(302).redirect('/pokemonTypes');

    PokemonType.findOne({ where: { id } })
        .then(result => {
            const pokemonType = result.dataValues;
            res.render('pokemonType/savePokemonType', {
                title: 'Editar tipo de pokemon',
                pokemonType,
                editMode: edit
            });
        }).catch(err => console.error(err));
}

exports.postEditPokemonType = (req, res, next) => {
    const { id, name } = req.body;
    const pokemonType = { id, name };

    if (!name) {
        res.render('pokemonType/savePokemonType', {
            title: 'Editar tipo de pokemon',
            pokemonType,
            editMode: true,
            hasNoName: true
        });
        return;
    }

    PokemonType.update({ name }, { where: { id } })
        .then(result => res.status(302).redirect('/pokemonTypes'))
        .catch(err => console.error(err));
}

exports.getDeletePokemonType = (req, res, next) => {
    const { id } = req.params;

    PokemonType.findOne({ where: { id } })
        .then(result => {
            const pokemonType = result.dataValues;
            res.render('pokemonType/deletePokemonType', {
                pokemonType
            });
        }).catch(err => console.error(err));
}

exports.postDeletePokemonType = (req, res, next) => {
    const { id } = req.body;

    PokemonType.destroy({ where: { id } })
        .then(result => res.status(302).redirect('/pokemonTypes'))
        .catch(err => console.error(err));
}