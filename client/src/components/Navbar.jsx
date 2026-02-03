import { useState } from 'react';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <>
      {/* Navigation Bar */}
      <nav className="bg-slate-900/95 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo/Brand */}
            <div className="flex items-center gap-3">
              <button
                onClick={toggleSidebar}
                className="text-white hover:text-green-400 transition-colors p-2 rounded-lg hover:bg-slate-800"
                aria-label="Toggle menu"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <h1 className="text-xl md:text-2xl font-bold text-white">
                🌱 Eco Score Predictor
              </h1>
            </div>

            {/* Right Side - Optional Actions */}
            <div className="flex items-center gap-4">
              <span className="hidden md:block text-gray-400 text-sm">
                Calculate your environmental impact
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 transition-opacity"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-slate-900 border-r border-slate-700 z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="p-6">
          {/* Close Button */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-green-400">Menu</h2>
            <button
              onClick={toggleSidebar}
              className="text-gray-400 hover:text-white transition-colors p-2 rounded-lg hover:bg-slate-800"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* About Eco Score Section */}
          <div className="mb-6 pb-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">📊</span>
              About Eco Score
            </h3>
            <p className="text-gray-300 mb-3 text-sm">Eco Score Range: 0-100</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-lg">🌟</span>
                <span>80-100: Excellent</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-lg">✅</span>
                <span>60-79: Good</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-lg">⚠️</span>
                <span>40-59: Fair</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300 text-sm">
                <span className="text-lg">❌</span>
                <span>Below 40: Needs Improvement</span>
              </div>
            </div>
          </div>

          {/* How to Use Section */}
          <div className="mb-6 pb-6 border-b border-slate-700">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">🎯</span>
              How to Use
            </h3>
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

          {/* Environmental Impact Section */}
          <div className="mb-6">
            <h3 className="text-xl font-bold text-green-400 mb-4 flex items-center gap-2">
              <span className="text-2xl">🌍</span>
              Environmental Impact
            </h3>
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

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-slate-700">
            <p className="text-gray-400 text-xs text-center">
              💚 Every small change makes a difference
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Navbar;
