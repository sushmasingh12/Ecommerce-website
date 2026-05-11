import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-surface px-6 text-center">
          <span className="material-symbols-outlined text-6xl text-secondary mb-6">error</span>
          <h1 className="font-serif text-3xl mb-4">Something went wrong</h1>
          <p className="text-on-surface/60 max-w-md mb-8">
            We encountered an unexpected error. Our team has been notified.
            Please try refreshing the page or contact support if the issue persists.
          </p>
          <div className="flex gap-4">
            <button
              onClick={() => window.location.reload()}
              className="px-8 py-3 bg-primary text-white uppercase tracking-widest text-[10px] font-bold hover:bg-primary/90 transition-all"
            >
              Reload Page
            </button>
            <button
              onClick={() => window.location.href = '/'}
              className="px-8 py-3 border border-outline uppercase tracking-widest text-[10px] font-bold hover:bg-surface-variant transition-all"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
