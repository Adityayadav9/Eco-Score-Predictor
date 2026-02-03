const Layout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-900 pb-0">
      <div className="container mx-auto px-4 py-8 pb-16">
        {children}
      </div>
    </div>
  );
};

export default Layout;
