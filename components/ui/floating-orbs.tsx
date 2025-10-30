"use client";

export function FloatingOrbs() {
  const orbs = [
    { size: 'w-96 h-96', position: 'top-0 -right-48', delay: '0s', duration: '20s', opacity: 'opacity-20' },
    { size: 'w-[30rem] h-[30rem]', position: 'bottom-0 -left-48', delay: '2s', duration: '25s', opacity: 'opacity-15' },
    { size: 'w-72 h-72', position: 'top-1/3 left-1/4', delay: '4s', duration: '18s', opacity: 'opacity-10' },
    { size: 'w-80 h-80', position: 'bottom-1/4 right-1/3', delay: '1s', duration: '22s', opacity: 'opacity-20' },
    { size: 'w-64 h-64', position: 'top-1/2 right-1/4', delay: '3s', duration: '19s', opacity: 'opacity-15' },
    { size: 'w-56 h-56', position: 'bottom-1/3 left-1/3', delay: '5s', duration: '24s', opacity: 'opacity-10' },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {orbs.map((orb, index) => (
        <div
          key={index}
          className={`absolute ${orb.size} ${orb.position} ${orb.opacity} rounded-full blur-3xl`}
          style={{
            background: `radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)`,
            animation: `float ${orb.duration} ease-in-out infinite`,
            animationDelay: orb.delay,
          }}
        />
      ))}

      {/* Additional smaller glowing particles */}
      <div className="absolute top-1/4 left-1/2 w-32 h-32 opacity-30 rounded-full blur-2xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.4) 0%, transparent 70%)',
          animationDelay: '0.5s',
        }}
      />
      <div className="absolute bottom-1/3 right-1/2 w-40 h-40 opacity-25 rounded-full blur-2xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.35) 0%, transparent 70%)',
          animationDelay: '1.5s',
        }}
      />
      <div className="absolute top-2/3 left-1/3 w-36 h-36 opacity-20 rounded-full blur-2xl animate-pulse-glow"
        style={{
          background: 'radial-gradient(circle, hsl(var(--primary) / 0.3) 0%, transparent 70%)',
          animationDelay: '2.5s',
        }}
      />
    </div>
  );
}
