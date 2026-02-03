const mongoose = require('mongoose');

const ecoScoreResultSchema = new mongoose.Schema({
  inputs: {
    carbon: { type: Number, required: true },
    water: { type: Number, required: true },
    animalBased: { type: Boolean, required: true },
    origin: { type: String, enum: ['local', 'imported'], required: true },
    category: { type: String, enum: ['food', 'beverage', 'personal care', 'accessories'], required: true },
    packaging: { type: String, enum: ['plastic', 'paper', 'glass', 'cardboard', 'compostable', 'none'], required: true },
    transport: { type: String, enum: ['air', 'ship', 'truck'], required: true }
  },
  calculatedScore: { type: Number, required: true },
  category: { type: String, required: true },
  carbonImpact: { type: String, required: true },
  message: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('EcoScoreResult', ecoScoreResultSchema);
