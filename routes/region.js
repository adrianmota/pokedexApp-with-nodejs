const express = require('express');
const router = express.Router();
const regionController = require('../controllers/regionController');

router.get('/regions', regionController.getRegionsList);
router.get('/createRegion', regionController.getCreateRegion);
router.post('/createRegion', regionController.postCreateRegion);
router.get('/editRegion/:id', regionController.getEditRegion);
router.post('/editRegion', regionController.postEditRegion);
router.get('/deleteRegion/:id', regionController.getDeleteRegion);
router.post('/deleteRegion', regionController.postDeleteRegion);

module.exports = router;