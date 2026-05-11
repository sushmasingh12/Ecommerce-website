// src/features/Reviews/components/AIFloatingButton.jsx

const AIFloatingButton = () => (
  <div className="fixed bottom-8 right-8 z-50">
    <button className="group flex items-center gap-3 bg-gradient-to-br from-primary to-primary-container text-white pl-4 pr-6 py-3 rounded-full shadow-2xl shadow-primary/40 hover:scale-105 transition-all">
      <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:rotate-12 transition-transform">
        <span className="material-symbols-outlined text-lg">auto_awesome</span>
      </div>
      <div className="text-left">
        <p className="text-[10px] font-bold uppercase tracking-wider opacity-80 leading-none mb-0.5">
          AI Assistant
        </p>
        <p className="text-xs font-bold">Auto-Moderate spam?</p>
      </div>
    </button>
  </div>
);

export default AIFloatingButton;