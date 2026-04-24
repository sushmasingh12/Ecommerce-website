import React from 'react';

const AiAssistant = () => {
  const features = [
    {
      icon: 'auto_awesome',
      title: 'Mood-Based',
      description: 'Shop by evening elegance or architectural minimalism.'
    },
    {
      icon: 'checkroom',
      title: 'Virtual Atelier',
      description: 'Precision fit recommendations based on your unique profile.'
    },
    {
      icon: 'brush',
      title: 'Wardrobe Edit',
      description: 'AI-curated looks from our archive to match your collection.'
    }
  ];

  return (
    <section className="py-16 md:py-32 bg-primary text-surface relative overflow-hidden">
      <div className="absolute right-0 top-0 w-1/3 h-full opacity-10">
        <div className="w-full h-full bg-[radial-gradient(circle_at_center,var(--tw-gradient-stops))] from-white to-transparent"></div>
      </div>
      <div className="max-w-4xl mx-auto text-center px-6 relative z-10">
        <span className="text-[10px] uppercase tracking-[0.5em] mb-4 md:mb-6 block text-outline-variant">Digital Tailoring</span>
        <h2 className="text-3xl md:text-4xl font-light mb-6 md:mb-10 tracking-tight">The Curator's Assistant</h2>
        <p className="text-surface-container-highest/60 text-base md:text-lg mb-8 md:mb-12 font-light max-w-2xl mx-auto">
          An intelligent style companion that learns your silhouettes and suggests pieces based on your current aesthetic mood.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 md:gap-6">
          {features.map((feature, index) => (
            <button key={index} className="border border-white/20 p-6 md:p-8 hover:bg-white/5 transition-colors group text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-3xl md:text-4xl mb-3 md:mb-4 text-secondary-fixed-dim" data-icon={feature.icon}>
                {feature.icon}
              </span>
              <h4 className="text-[10px] md:text-xs uppercase tracking-widest mb-1 md:mb-2">{feature.title}</h4>
              <p className="text-[9px] md:text-[10px] opacity-60">{feature.description}</p>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AiAssistant;
