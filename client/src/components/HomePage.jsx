const HomePage = () => {
  return (
    <div className="text-center mb-12">
      <div className="inline-block">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
          🌱 Eco Score Predictor
        </h1>
        <div className="h-1 w-full bg-gradient-to-r from-green-400 via-emerald-500 to-teal-500 rounded-full"></div>
      </div>
      <p className="text-gray-300 text-lg md:text-xl mt-6 max-w-2xl mx-auto leading-relaxed">
        Calculate your product's environmental impact using our rule-based scoring system.
        Get instant feedback on sustainability metrics and discover ways to reduce your carbon footprint.
      </p>
    </div>
  );
};

export default HomePage;
