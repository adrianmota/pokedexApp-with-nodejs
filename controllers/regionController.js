const Region = require('../models/region');

exports.getRegionsList = (req, res, next) => {
    Region.findAll()
        .then(result => {
            const regions = result.map(result => result.dataValues);
            res.render('region/regionsList', {
                title: 'Regiones',
                regions,
                hasRegions: regions.length > 0
            });
        })
        .catch(err => console.error(err));
}

exports.getCreateRegion = (req, res, next) => {
    res.render('region/saveRegion', {
        title: 'Crear Región',
        editMode: false
    });
}

exports.postCreateRegion = (req, res, next) => {
    const { name } = req.body;

    if (!name) {
        res.render('region/saveRegion', {
            title: 'Crear Región',
            hasNoName: true
        });
        return;
    }

    Region.create({ name })
        .then(result => res.status(302).redirect('/regions'))
        .catch(err => console.error(err));
}

exports.getEditRegion = (req, res, next) => {
    const { id } = req.params;
    const edit = req.query.edit;

    if (!edit) res.status(302).redirect('/regions');

    Region.findOne({ where: { id } })
        .then(result => {
            const region = result.dataValues;
            res.render('region/saveRegion', {
                title: 'Editar Región',
                region,
                editMode: edit
            });
        }).catch(err => console.error(err));
}

exports.postEditRegion = (req, res, next) => {
    const { id, name } = req.body;
    const region = { id, name };

    if (!name) {
        res.render('region/saveRegion', {
            title: 'Editar Región',
            region,
            editMode: true,
            hasNoName: true
        });
        return;
    }

    Region.update({ name }, { where: { id } })
        .then(result => res.status(302).redirect('/regions'))
        .catch(err => console.error(err));
}

exports.getDeleteRegion = (req, res, next) => {
    const { id } = req.params;

    Region.findOne({ where: { id } })
        .then(result => {
            const region = result.dataValues;
            res.render('region/deleteRegion', {
                region
            });
        }).catch(err => console.error(err));
}

exports.postDeleteRegion = (req, res, next) => {
    const { id } = req.body;

    Region.destroy({ where: { id } })
        .then(result => res.status(302).redirect('/regions'))
        .catch(err => console.error(err));
}