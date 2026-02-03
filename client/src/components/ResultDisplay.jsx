const ResultDisplay = ({ result }) => {
  if (!result) return null;

  const { ecoScore, category, carbonImpact, message } = result;

  // Determine color based on score
  const getScoreColor = () => {
    if (ecoScore >= 80) return 'from-green-400 to-emerald-500';
    if (ecoScore >= 60) return 'from-blue-400 to-cyan-500';
    if (ecoScore >= 40) return 'from-yellow-400 to-amber-500';
    return 'from-red-400 to-orange-500';
  };

  const getCategoryBadgeColor = () => {
    if (ecoScore >= 80) return 'bg-green-500';
    if (ecoScore >= 60) return 'bg-blue-500';
    if (ecoScore >= 40) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  const getImpactColor = () => {
    if (carbonImpact === 'Low') return 'text-green-400';
    if (carbonImpact === 'Medium') return 'text-yellow-400';
    return 'text-red-400';
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-sm rounded-2xl shadow-2xl p-6 md:p-8 border border-slate-700 mt-8 animate-fadeIn">
      <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 text-center">
        Your Eco Score Results
      </h2>

      {/* Score Circle */}
      <div className="flex justify-center mb-8">
        <div className="relative">
          <div className={`w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br ${getScoreColor()} flex items-center justify-center shadow-2xl transform hover:scale-105 transition duration-300`}>
            <div className="bg-slate-900 w-32 h-32 md:w-40 md:h-40 rounded-full flex items-center justify-center">
              <div className="text-center">
                <div className="text-5xl md:text-6xl font-bold text-white">{ecoScore}</div>
                <div className="text-gray-400 text-sm">out of 100</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Badge */}
      <div className="flex justify-center mb-6">
        <span className={`${getCategoryBadgeColor()} text-white px-6 py-2 rounded-full font-semibold text-lg shadow-lg`}>
          {category}
        </span>
      </div>

      {/* Carbon Impact */}
      <div className="bg-slate-700/50 rounded-xl p-6 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-gray-300 font-medium text-lg">Carbon Impact:</span>
          <span className={`${getImpactColor()} font-bold text-xl`}>{carbonImpact}</span>
        </div>
      </div>

      {/* Message */}
      <div className="bg-gradient-to-r from-slate-700/50 to-slate-600/50 rounded-xl p-6 border-l-4 border-green-500">
        <p className="text-gray-200 text-lg leading-relaxed">{message}</p>
      </div>

      {/* Score Breakdown Info */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h3 className="text-white font-semibold mb-3">Score Breakdown:</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm text-gray-400">
          <div>• 80-100: Excellent</div>
          <div>• 60-79: Good</div>
          <div>• 40-59: Fair</div>
          <div>• 0-39: Needs Improvement</div>
        </div>
      </div>

      {/* Tips for Better Eco Score */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
          <span className="text-2xl">💡</span>
          Tips for Better Eco Score
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Choose local products</span>
          </div>
          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Minimize packaging</span>
          </div>
          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Prefer plant-based options</span>
          </div>
          <div className="flex items-start gap-2 text-gray-300 text-sm">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Select sustainable transport</span>
          </div>
          <div className="flex items-start gap-2 text-gray-300 text-sm md:col-span-2">
            <span className="text-green-400 mt-0.5">✓</span>
            <span>Use recyclable materials</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultDisplay;
