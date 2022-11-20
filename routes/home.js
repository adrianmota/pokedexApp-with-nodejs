const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

router.get('/', homeController.getHome);
router.post('/filter', homeController.postFilter);
router.post('/searchByName', homeController.postSearchByName);

module.exports = router;