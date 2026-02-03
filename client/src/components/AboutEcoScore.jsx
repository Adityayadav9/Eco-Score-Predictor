const AboutEcoScore = () => {
  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700 mb-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Eco Score */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">📊</span>
            About Eco Score
          </h2>
          <p className="text-gray-300 mb-3">Eco Score Range: 0-100</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-lg">🌟</span>
              <span className="text-sm">80-100: Excellent</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-lg">✅</span>
              <span className="text-sm">60-79: Good</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-lg">⚠️</span>
              <span className="text-sm">40-59: Fair</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <span className="text-lg">❌</span>
              <span className="text-sm">Below 40: Needs Improvement</span>
            </div>
          </div>
        </div>

        {/* How to Use */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">🎯</span>
            How to Use
          </h2>
          <ol className="space-y-2 text-gray-300 text-sm">
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">1.</span>
              <span>Enter basic product information</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">2.</span>
              <span>Select relevant categories</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">3.</span>
              <span>Choose packaging materials</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">4.</span>
              <span>Select transport modes</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-400 font-bold">5.</span>
              <span>Click 'Predict Eco Score'</span>
            </li>
          </ol>
        </div>

        {/* Environmental Impact */}
        <div>
          <h2 className="text-2xl font-bold text-green-400 mb-4 flex items-center gap-2">
            <span className="text-2xl">🌍</span>
            Environmental Impact
          </h2>
          <p className="text-gray-300 mb-3 text-sm">This tool helps assess:</p>
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="text-green-400">▸</span>
              <span>Carbon footprint</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="text-green-400">▸</span>
              <span>Water usage</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="text-green-400">▸</span>
              <span>Packaging sustainability</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300 text-sm">
              <span className="text-green-400">▸</span>
              <span>Transportation efficiency</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutEcoScore;
