export function MoroccanDecorations() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Moroccan Geometric Patterns */}
      <div className="absolute top-20 right-10 w-64 h-64 opacity-20">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-float-slow">
          <defs>
            <linearGradient id="moroccan-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.4" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Moroccan Star Pattern */}
          <path
            d="M100,10 L115,60 L165,60 L125,90 L140,140 L100,110 L60,140 L75,90 L35,60 L85,60 Z"
            fill="url(#moroccan-gradient-1)"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
          <circle cx="100" cy="100" r="70" fill="none" stroke="hsl(var(--primary))" strokeWidth="0.5" strokeOpacity="0.2" />
        </svg>
      </div>

      {/* Second Pattern */}
      <div className="absolute bottom-32 left-10 w-48 h-48 opacity-15">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-float" style={{ animationDelay: '1s' }}>
          <defs>
            <linearGradient id="moroccan-gradient-2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.3" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Zellige-inspired pattern */}
          <rect x="40" y="40" width="40" height="40" fill="url(#moroccan-gradient-2)" transform="rotate(45 60 60)" />
          <rect x="100" y="40" width="40" height="40" fill="url(#moroccan-gradient-2)" transform="rotate(45 120 60)" />
          <rect x="40" y="100" width="40" height="40" fill="url(#moroccan-gradient-2)" transform="rotate(45 60 120)" />
          <rect x="100" y="100" width="40" height="40" fill="url(#moroccan-gradient-2)" transform="rotate(45 120 120)" />
        </svg>
      </div>

      {/* Third Pattern - Top Left */}
      <div className="absolute top-40 left-1/4 w-56 h-56 opacity-10">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-float-slow" style={{ animationDelay: '2s' }}>
          <defs>
            <linearGradient id="moroccan-gradient-3" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.5" />
              <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0.1" />
            </linearGradient>
          </defs>
          {/* Arabesque pattern */}
          <circle cx="100" cy="100" r="60" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="100" cy="100" r="45" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
          <circle cx="100" cy="100" r="30" fill="none" stroke="hsl(var(--primary))" strokeWidth="1" strokeOpacity="0.3" />
          <path
            d="M100,40 Q130,70 100,100 Q70,70 100,40 Z"
            fill="url(#moroccan-gradient-3)"
          />
          <path
            d="M100,160 Q130,130 100,100 Q70,130 100,160 Z"
            fill="url(#moroccan-gradient-3)"
          />
          <path
            d="M40,100 Q70,130 100,100 Q70,70 40,100 Z"
            fill="url(#moroccan-gradient-3)"
          />
          <path
            d="M160,100 Q130,130 100,100 Q130,70 160,100 Z"
            fill="url(#moroccan-gradient-3)"
          />
        </svg>
      </div>

      {/* Fourth Pattern - Bottom Right */}
      <div className="absolute bottom-20 right-1/4 w-40 h-40 opacity-15">
        <svg viewBox="0 0 200 200" className="w-full h-full animate-float" style={{ animationDelay: '0.5s' }}>
          {/* Geometric tile pattern */}
          <polygon
            points="100,20 180,60 180,140 100,180 20,140 20,60"
            fill="none"
            stroke="hsl(var(--primary))"
            strokeWidth="1"
            strokeOpacity="0.3"
          />
          <polygon
            points="100,50 150,75 150,125 100,150 50,125 50,75"
            fill="hsl(var(--primary))"
            fillOpacity="0.1"
            stroke="hsl(var(--primary))"
            strokeWidth="0.5"
            strokeOpacity="0.3"
          />
        </svg>
      </div>
    </div>
  );
}
