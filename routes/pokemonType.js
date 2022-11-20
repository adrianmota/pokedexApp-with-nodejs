const express = require('express');
const router = express.Router();
const pokemonTypeController = require('../controllers/pokemonTypeController');

router.get('/pokemonTypes', pokemonTypeController.getPokemonTypesList);
router.get('/createPokemonType', pokemonTypeController.getCreatePokemonType);
router.post('/createPokemonType', pokemonTypeController.postCreatePokemonType);
router.get('/editPokemonType/:id', pokemonTypeController.getEditPokemonType);
router.post('/editPokemonType', pokemonTypeController.postEditPokemonType);
router.get('/deletePokemonType/:id', pokemonTypeController.getDeletePokemonType);
router.post('/deletePokemonType', pokemonTypeController.postDeletePokemonType);

module.exports = router;