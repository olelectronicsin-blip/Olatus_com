import React from 'react';

type LogoProps = {
  size?: number; // height in px for the emblem; wordmark scales with it
  showWordmark?: boolean;
  showTagline?: boolean;
  mode?: 'dark' | 'light'; // adjust wordmark color for backgrounds
  className?: string;
};

// A scalable logo approximating the provided brand mark.
// - Emblem: orange parentheses enclosing a teal geometric mark.
// - Wordmark: OLatus in a serif (Cinzel) with teal fill.
// - Tagline: uppercase orange with trailing ellipsis.
const Logo: React.FC<LogoProps> = ({
  size = 40,
  showWordmark = true,
  showTagline = false,
  mode = 'dark',
  className = '',
}) => {
  // Brand colors based on the image
  const orange = '#F37E3B';
  const teal = '#0D4E55';
  const wordmarkColor = mode === 'dark' ? '#FFFFFF' : teal; // teal in light mode, white in dark
  const taglineColor = orange;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem: orange parentheses + teal/white geometric */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 64 64"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="OLatus logo"
      >
        {/* Left parenthesis */}
        <path d="M9 32c0-11 4.6-20.8 12-28l3 3c-6.2 6.3-9.8 14.8-9.8 25s3.6 18.7 9.8 25l-3 3C13.6 52.8 9 43 9 32z" fill={orange} />
        {/* Right parenthesis */}
        <path d="M55 32c0 11-4.6 20.8-12 28l-3-3c6.2-6.3 9.8-14.8 9.8-25S46.2 16.3 40 10l3-3c7.4 7.2 12 17 12 28z" fill={orange} />

        {/* Teal block with white shapes resembling the mark */}
        <rect x="19" y="19" width="26" height="26" rx="2" fill={teal} />
        {/* Lower-left white sweep */}
        <path d="M22 37c0-5 4-9 9-9h3v7h-3c-1.1 0-2 .9-2 2s.9 2 2 2h3v7h-3c-5 0-9-4-9-9z" fill="#FFFFFF" />
        {/* Upper-right white triangle-like cut */}
        <path d="M42 22v15l-10-7.5L42 22z" fill="#FFFFFF" />
      </svg>

      {(showWordmark || showTagline) && (
        <div className="leading-tight select-none">
          {showWordmark && (
            <div
              className="tracking-tight"
              style={{
                color: wordmarkColor,
                fontSize: Math.round(size * 0.54),
                fontFamily: 'Cinzel, ui-serif, Georgia, serif',
                fontWeight: 800,
              }}
            >
              <span style={{ color: teal }}>O</span>Latus
            </div>
          )}
          {showTagline && (
            <div
              className="uppercase font-extrabold"
              style={{ color: taglineColor, fontSize: Math.round(size * 0.22), letterSpacing: 1.6 }}
            >
              Enriching the Future...
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Logo;
