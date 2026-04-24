import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

const NotFound = () => {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-6 text-center">
      <Helmet>
        <title>404 - Page Not Found | Bazario</title>
      </Helmet>
      <h1 className="font-serif text-9xl text-[#131921]/5 absolute select-none">404</h1>
      <div className="relative">
        <span className="material-symbols-outlined text-4xl text-secondary mb-4">explore_off</span>
        <h2 className="font-serif text-3xl mb-4">Lost in the Collection?</h2>
        <p className="text-on-surface/60 max-w-sm mb-10 mx-auto">
          The page you are looking for might have been moved, deleted, or never existed in our current curation.
        </p>
        <Link
          to="/"
          className="inline-block px-10 py-4 bg-[#131921] text-white uppercase tracking-[0.2em] text-[10px] font-bold hover:bg-[#232f3e] transition-all"
        >
          Return to Atelier
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
