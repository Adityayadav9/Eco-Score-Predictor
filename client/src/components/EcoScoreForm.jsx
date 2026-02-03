import { useState } from 'react';
import { calculateEcoScore } from '../services/api';

const EcoScoreForm = ({ onResult }) => {
  const [formData, setFormData] = useState({
    carbon: '',
    water: '',
    animalBased: false,
    origin: 'local',
    category: 'food',
    packaging: 'none',
    transport: 'truck'
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Convert string values to numbers
      const payload = {
        ...formData,
        carbon: parseFloat(formData.carbon),
        water: parseFloat(formData.water)
      };

      const result = await calculateEcoScore(payload);
      onResult(result);
    } catch (err) {
      setError(err.message || 'Failed to calculate eco score. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700">
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-400 to-emerald-500 bg-clip-text text-transparent mb-8">
        Product Details
      </h2>
      
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Carbon Footprint */}
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Carbon Footprint (kg CO₂)
          </label>
          <input
            type="number"
            name="carbon"
            value={formData.carbon}
            onChange={handleChange}
            step="0.1"
            min="0"
            required
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            placeholder="e.g., 2.5"
          />
        </div>

        {/* Water Usage */}
        <div>
          <label className="block text-gray-300 font-medium mb-2">
            Water Usage (liters)
          </label>
          <input
            type="number"
            name="water"
            value={formData.water}
            onChange={handleChange}
            step="0.1"
            min="0"
            required
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
            placeholder="e.g., 30"
          />
        </div>

        {/* Animal-Based Product */}
        <div>
          <div className="flex items-center space-x-4">
            <label className="text-gray-300 font-medium">Animal-Based Product?</label>
            <div className="flex space-x-4">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="animalBased"
                  checked={formData.animalBased === true}
                  onChange={() => setFormData(prev => ({ ...prev, animalBased: true }))}
                  className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              <span className="ml-2 text-white">Yes</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="animalBased"
                checked={formData.animalBased === false}
                onChange={() => setFormData(prev => ({ ...prev, animalBased: false }))}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              <span className="ml-2 text-white">No</span>
            </label>
          </div>
          </div>
        </div>

        {/* Product Origin */}
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4">Product Origin</h3>
          <div className="flex space-x-4">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="origin"
                value="local"
                checked={formData.origin === 'local'}
                onChange={handleChange}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              <span className="ml-2 text-white">Local</span>
            </label>
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="origin"
                value="imported"
                checked={formData.origin === 'imported'}
                onChange={handleChange}
                className="w-4 h-4 text-green-500 focus:ring-green-500"
              />
              <span className="ml-2 text-white">Imported</span>
            </label>
          </div>
        </div>

        {/* Product Category */}
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4">Product Category</h3>
          <div className="grid grid-cols-2 gap-3">
            {['food', 'beverage', 'personal care', 'accessories'].map(cat => (
              <label key={cat} className="flex items-center cursor-pointer bg-slate-700 p-3 rounded-lg hover:bg-slate-600 transition">
                <input
                  type="radio"
                  name="category"
                  value={cat}
                  checked={formData.category === cat}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-500 focus:ring-green-500"
                />
                <span className="ml-2 text-white capitalize">{cat}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Packaging Material */}
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4">Packaging Material</h3>
          <select
            name="packaging"
            value={formData.packaging}
            onChange={handleChange}
            className="w-full px-4 py-3 bg-slate-700 border border-slate-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
          >
            <option value="none">No Packaging</option>
            <option value="compostable">Compostable</option>
            <option value="paper">Paper</option>
            <option value="cardboard">Cardboard</option>
            <option value="glass">Glass</option>
            <option value="plastic">Plastic</option>
          </select>
        </div>

        {/* Transportation Mode */}
        <div>
          <h3 className="text-xl font-bold text-green-400 mb-4">Transportation Mode</h3>
          <div className="flex space-x-4">
            {['truck', 'ship', 'air'].map(mode => (
              <label key={mode} className="flex items-center cursor-pointer bg-slate-700 px-4 py-3 rounded-lg hover:bg-slate-600 transition flex-1 justify-center">
                <input
                  type="radio"
                  name="transport"
                  value={mode}
                  checked={formData.transport === mode}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-500 focus:ring-green-500"
                />
                <span className="ml-2 text-white capitalize">{mode}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-500/10 border border-red-500 text-red-400 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-6 rounded-lg transition duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
        >
          {loading ? 'Calculating...' : 'Predict Eco Score'}
        </button>
      </form>
    </div>
  );
};

export default EcoScoreForm;
