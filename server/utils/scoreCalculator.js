/**
 * Rule-based Eco Score Calculator
 * Calculates environmental impact score based on product characteristics
 */

function calculateEcoScore(inputs) {
  const { carbon, water, animalBased, origin, packaging, transport } = inputs;
  
  // Start with perfect score
  let score = 100;
  
  // Apply carbon footprint penalties
  if (carbon > 5) {
    score -= 20;
  } else if (carbon >= 2 && carbon <= 5) {
    score -= 10;
  }
  
  // Apply water usage penalties
  if (water > 50) {
    score -= 15;
  }
  
  // Apply animal-based product penalty
  if (animalBased) {
    score -= 10;
  }
  
  // Apply product origin penalty
  if (origin === 'imported') {
    score -= 10;
  }
  
  // Apply packaging penalties
  switch (packaging) {
    case 'plastic':
      score -= 15;
      break;
    case 'glass':
      score -= 5;
      break;
    case 'paper':
    case 'cardboard':
      score -= 3;
      break;
    case 'compostable':
      score -= 0;
      break;
    case 'none':
      score += 2;
      break;
  }
  
  // Apply transportation penalties
  switch (transport) {
    case 'air':
      score -= 20;
      break;
    case 'ship':
      score -= 10;
      break;
    case 'truck':
      score -= 5;
      break;
  }
  
  // Clamp score between 0 and 100
  score = Math.max(0, Math.min(100, score));
  
  // Determine category
  let category;
  if (score >= 80) {
    category = 'Excellent';
  } else if (score >= 60) {
    category = 'Good';
  } else if (score >= 40) {
    category = 'Fair';
  } else {
    category = 'Needs Improvement';
  }
  
  // Determine carbon impact
  let carbonImpact;
  if (carbon < 2) {
    carbonImpact = 'Low';
  } else if (carbon <= 5) {
    carbonImpact = 'Medium';
  } else {
    carbonImpact = 'High';
  }
  
  // Generate message based on score and carbon impact
  let message;
  if (score >= 80) {
    message = 'Your product has an excellent environmental profile!';
  } else if (score >= 60) {
    if (carbonImpact === 'High') {
      message = 'Your product has a good score, but the high carbon footprint is a concern. Consider reducing emissions.';
    } else if (carbonImpact === 'Medium') {
      message = 'Your product has a good environmental impact with moderate carbon footprint.';
    } else {
      message = 'Your product has a good environmental impact with low carbon footprint.';
    }
  } else if (score >= 40) {
    if (carbonImpact === 'High') {
      message = 'Your product has a moderate environmental impact with high carbon emissions. Improvements needed.';
    } else {
      message = 'Your product has a moderate environmental impact. Some improvements recommended.';
    }
  } else {
    if (carbonImpact === 'High') {
      message = 'Your product has significant environmental impact with high carbon emissions. Major improvements needed.';
    } else {
      message = 'Your product has significant environmental impact and needs improvement.';
    }
  }
  
  return {
    ecoScore: score,
    category,
    carbonImpact,
    message
  };
}

module.exports = { calculateEcoScore };
