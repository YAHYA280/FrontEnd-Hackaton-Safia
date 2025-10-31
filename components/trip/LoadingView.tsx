'use client';

const LoadingView = () => {
  return (
    <div className="h-full w-full bg-slate-50/50 dark:bg-slate-900/50 flex items-center justify-center p-8">
      <div className="flex flex-col items-center space-y-6 max-w-md px-8 py-12 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-700 shadow-xl">
        {/* Logo */}
        <div className="h-24 w-24 rounded-full border-4 border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 flex items-center justify-center p-4">
          <img src="/logo.png" alt="Morocco Chrono Grid" className="w-full h-full object-contain" />
        </div>

        {/* Title with animation */}
        <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 tracking-tight animate-pulse">
          Designing your trip...
        </h2>

        {/* Suggestions */}
        <div className="space-y-3 text-center text-sm">
          <p className="text-slate-500 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '0.3s', animationFillMode: 'both' }}>
            Modify anything to make it more you
          </p>
          <p className="text-slate-900 dark:text-slate-100 font-medium animate-fade-in" style={{ animationDelay: '0.6s', animationFillMode: 'both' }}>
            Add hidden gems, not tourist traps
          </p>
          <p className="text-slate-500 dark:text-slate-400 animate-fade-in" style={{ animationDelay: '0.9s', animationFillMode: 'both' }}>
            Download itinerary pdf
          </p>
          <p className="text-slate-400 dark:text-slate-500 animate-fade-in" style={{ animationDelay: '1.2s', animationFillMode: 'both' }}>
            Share with your companions
          </p>
        </div>

        {/* Loading dots */}
        <div className="flex space-x-2 pt-4">
          <div className="w-2 h-2 bg-amber-900 dark:bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
          <div className="w-2 h-2 bg-amber-900 dark:bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.15s' }}></div>
          <div className="w-2 h-2 bg-amber-900 dark:bg-amber-600 rounded-full animate-bounce" style={{ animationDelay: '0.3s' }}></div>
        </div>
      </div>
    </div>
  );
};

export default LoadingView;
