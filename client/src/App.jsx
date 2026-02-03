import { useState } from 'react';
import Layout from './components/Layout';
import HomePage from './components/HomePage';
import EcoScoreForm from './components/EcoScoreForm';
import ResultDisplay from './components/ResultDisplay';
import EcoTips from './components/EcoTips';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
    // Smooth scroll to results
    setTimeout(() => {
      document.getElementById('results')?.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
    }, 100);
  };

  return (
    <>
      <Navbar />
      <Layout>
        <HomePage />
        
        <div className="max-w-7xl mx-auto">
          {/* Form and Tips Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
            {/* Form - Takes 2 columns */}
            <div className="lg:col-span-2">
              <EcoScoreForm onResult={handleResult} />
            </div>
            
            {/* Tips - Takes 1 column */}
            <div className="lg:col-span-1">
              <EcoTips />
            </div>
          </div>
          
          {/* Results Display */}
          <div id="results">
            <ResultDisplay result={result} />
          </div>
        </div>
      </Layout>
      <Footer />
    </>
  );
}

export default App;
