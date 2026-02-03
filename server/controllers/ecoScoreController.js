const { body, validationResult } = require('express-validator');
const EcoScoreResult = require('../models/EcoScoreResult');
const { calculateEcoScore } = require('../utils/scoreCalculator');

// Validation rules
const validateEcoScoreInput = [
  body('carbon').isFloat({ min: 0 }).withMessage('Carbon must be a positive number'),
  body('water').isFloat({ min: 0 }).withMessage('Water must be a positive number'),
  body('animalBased').isBoolean().withMessage('Animal based must be a boolean'),
  body('origin').isIn(['local', 'imported']).withMessage('Origin must be local or imported'),
  body('category').isIn(['food', 'beverage', 'personal care', 'accessories']).withMessage('Invalid category'),
  body('packaging').isIn(['plastic', 'paper', 'glass', 'cardboard', 'compostable', 'none']).withMessage('Invalid packaging'),
  body('transport').isIn(['air', 'ship', 'truck']).withMessage('Invalid transport mode')
];

// Controller for eco score calculation
const calculateAndSaveEcoScore = async (req, res, next) => {
  try {
    console.log('Received request:', req.body);
    
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      console.log('Validation errors:', errors.array());
      return res.status(400).json({ 
        success: false,
        errors: errors.array() 
      });
    }

    // Extract input data
    const { carbon, water, animalBased, origin, category, packaging, transport } = req.body;
    
    const inputs = {
      carbon,
      water,
      animalBased,
      origin,
      category,
      packaging,
      transport
    };

    // Calculate eco score
    const result = calculateEcoScore(inputs);

    // Save to database
    const ecoScoreResult = new EcoScoreResult({
      inputs,
      calculatedScore: result.ecoScore,
      category: result.category,
      carbonImpact: result.carbonImpact,
      message: result.message
    });

    await ecoScoreResult.save();

    // Return response
    res.status(200).json({
      success: true,
      ecoScore: result.ecoScore,
      category: result.category,
      carbonImpact: result.carbonImpact,
      message: result.message
    });

  } catch (error) {
    next(error);
  }
};

module.exports = {
  validateEcoScoreInput,
  calculateAndSaveEcoScore
};
