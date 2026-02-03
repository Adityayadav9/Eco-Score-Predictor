const Footer = () => {
  return (
    <footer className="bg-slate-900 border-t border-slate-700">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center space-y-4">
          {/* Built By */}
          <div className="text-center">
            <p className="text-gray-300 text-sm md:text-base">
              Built by <span className="text-green-400 font-semibold">Aditya Yadav</span> as a Full-Stack MERN Project
            </p>
          </div>

          {/* Disclaimer */}
          <div className="text-center max-w-2xl">
            <p className="text-gray-400 text-xs md:text-sm">
              <span className="font-semibold text-gray-300">Disclaimer:</span> Eco scores are based on simplified rule-based logic for educational use only.
            </p>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-slate-700"></div>

          {/* Copyright */}
          <div className="text-center">
            <p className="text-gray-500 text-xs">
              © {new Date().getFullYear()} Eco Score Predictor. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
