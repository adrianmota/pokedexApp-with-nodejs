const express = require('express');
const router = express.Router();
const pokemonController = require('../controllers/pokemonController');

router.get('/pokemon', pokemonController.getPokemonList);
router.get('/createPokemon', pokemonController.getCreatePokemon);
router.post('/createPokemon', pokemonController.postCreatePokemon);
router.get('/editPokemon/:id', pokemonController.getEditPokemon);
router.post('/editPokemon', pokemonController.postEditPokemon);
router.get('/deletePokemon/:id', pokemonController.getDeletePokemon);
router.post('/deletePokemon/', pokemonController.postDeletePokemon);

module.exports = router;