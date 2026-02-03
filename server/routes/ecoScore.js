const express = require('express');
const router = express.Router();
const { validateEcoScoreInput, calculateAndSaveEcoScore } = require('../controllers/ecoScoreController');

// POST /api/eco-score - Calculate eco score
router.post('/eco-score', validateEcoScoreInput, calculateAndSaveEcoScore);

module.exports = router;
