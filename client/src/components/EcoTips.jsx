const EcoTips = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700">
      <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
        <span className="text-3xl">💡</span>
        Tips for Better Eco Score
      </h2>
      
      <div className="space-y-4">
        <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
          <span className="text-green-400 text-xl mt-0.5">✓</span>
          <div>
            <h3 className="text-white font-medium mb-1">Choose Local Products</h3>
            <p className="text-gray-400 text-sm">Reduce transportation emissions by selecting locally sourced items</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
          <span className="text-green-400 text-xl mt-0.5">✓</span>
          <div>
            <h3 className="text-white font-medium mb-1">Minimize Packaging</h3>
            <p className="text-gray-400 text-sm">Opt for products with less or no packaging materials</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
          <span className="text-green-400 text-xl mt-0.5">✓</span>
          <div>
            <h3 className="text-white font-medium mb-1">Prefer Plant-Based</h3>
            <p className="text-gray-400 text-sm">Plant-based products typically have lower environmental impact</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
          <span className="text-green-400 text-xl mt-0.5">✓</span>
          <div>
            <h3 className="text-white font-medium mb-1">Sustainable Transport</h3>
            <p className="text-gray-400 text-sm">Choose truck or ship over air freight when possible</p>
          </div>
        </div>
        
        <div className="flex items-start gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition">
          <span className="text-green-400 text-xl mt-0.5">✓</span>
          <div>
            <h3 className="text-white font-medium mb-1">Recyclable Materials</h3>
            <p className="text-gray-400 text-sm">Select products with recyclable or compostable packaging</p>
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-6 border-t border-slate-700">
        <p className="text-gray-400 text-sm text-center">
          💚 Every small change makes a difference for our planet
        </p>
      </div>
    </div>
  );
};

export default EcoTips;
