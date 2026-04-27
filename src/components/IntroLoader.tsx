import { useEffect, useState } from "react";

// ─── IntroLoader ─────────────────────────────────────────────────────────────
// A minimal, premium black-screen intro that shows before the main LoadingScreen.
// Duration is controlled by the parent via the `onComplete` callback.
// ─────────────────────────────────────────────────────────────────────────────

interface IntroLoaderProps {
  /** Called when the intro animation is finished and the app should proceed */
  onComplete: () => void;
  /** How long (ms) to stay on the intro before calling onComplete. Default: 1500 */
  duration?: number;
}

export default function IntroLoader({ onComplete, duration = 1500 }: IntroLoaderProps) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    // Start exit animation slightly before calling onComplete
    const exitTimer = setTimeout(() => setExiting(true), duration - 400);
    const doneTimer = setTimeout(onComplete, duration);
    return () => {
      clearTimeout(exitTimer);
      clearTimeout(doneTimer);
    };
  }, [duration, onComplete]);

  return (
    <>
      <style>{STYLES}</style>
      <div
        className={`il-root ${exiting ? "il-exit" : "il-enter"}`}
        aria-hidden="true"
      >
        {/* Subtle radial noise vignette */}
        <div className="il-vignette" />

        {/* Outer soft glow halo (behind hexagon) */}
        <div className="il-halo" />

        {/* Hexagon + icon assembly */}
        <div className="il-hex-wrap">
          {/* Slow-rotating outer ring track */}
          <div className="il-ring-track">
            <svg viewBox="0 0 160 160" className="il-ring-svg" fill="none">
              <polygon
                points="80,4 152,42 152,118 80,156 8,118 8,42"
                stroke="rgba(56,140,255,0.12)"
                strokeWidth="1"
                fill="none"
              />
            </svg>
          </div>

          {/* Main hexagon */}
          <div className="il-hex">
            <svg viewBox="0 0 120 138" className="il-hex-svg" fill="none">
              {/* Glassmorphism fill */}
              <polygon
                points="60,3 117,33 117,105 60,135 3,105 3,33"
                fill="rgba(6,18,52,0.55)"
              />
              {/* Glowing border — rendered as two layered polygons for soft glow */}
              <polygon
                points="60,3 117,33 117,105 60,135 3,105 3,33"
                stroke="rgba(56,160,255,0.55)"
                strokeWidth="1.5"
                fill="none"
                filter="url(#hexGlow)"
              />
              {/* Sharper inner border */}
              <polygon
                points="60,3 117,33 117,105 60,135 3,105 3,33"
                stroke="rgba(100,200,255,0.85)"
                strokeWidth="0.75"
                fill="none"
              />
              <defs>
                <filter id="hexGlow" x="-30%" y="-30%" width="160%" height="160%">
                  <feGaussianBlur stdDeviation="3" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>
            </svg>

            {/* Center AI spark icon */}
            <div className="il-icon-wrap">
              <div className="il-icon-glow" />
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                className="il-icon"
                aria-label="AI"
              >
                {/* Four-point star / spark */}
                <path d="M12 2
                  C12 2 12.8 6.5 14.5 8.5
                  C16.2 10.5 20 12 20 12
                  C20 12 16.2 13.5 14.5 15.5
                  C12.8 17.5 12 22 12 22
                  C12 22 11.2 17.5 9.5 15.5
                  C7.8 13.5 4 12 4 12
                  C4 12 7.8 10.5 9.5 8.5
                  C11.2 6.5 12 2 12 2Z" />
                {/* Two smaller side sparks */}
                <path
                  d="M5 5 C5 5 5.35 6.8 6.1 7.6 C6.85 8.4 8.5 9 8.5 9 C8.5 9 6.85 9.6 6.1 10.4 C5.35 11.2 5 13 5 13 C5 13 4.65 11.2 3.9 10.4 C3.15 9.6 1.5 9 1.5 9 C1.5 9 3.15 8.4 3.9 7.6 C4.65 6.8 5 5 5 5Z"
                  opacity="0.6"
                />
                <path
                  d="M19 5 C19 5 19.35 6.8 20.1 7.6 C20.85 8.4 22.5 9 22.5 9 C22.5 9 20.85 9.6 20.1 10.4 C19.35 11.2 19 13 19 13 C19 13 18.65 11.2 17.9 10.4 C17.15 9.6 15.5 9 15.5 9 C15.5 9 17.15 8.4 17.9 7.6 C18.65 6.8 19 5 19 5Z"
                  opacity="0.6"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Brand name — fades in after a slight delay */}
        <div className="il-brand">
          <span className="il-brand-text">BOXpad</span>
          <span className="il-brand-dot" />
        </div>
      </div>
    </>
  );
}

// ─── Styles ───────────────────────────────────────────────────────────────────
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;600;700&display=swap');

  /* ── Keyframes ── */
  @keyframes il-fade-in   { from { opacity: 0 } to { opacity: 1 } }
  @keyframes il-fade-out  { from { opacity: 1 } to { opacity: 0 } }

  @keyframes il-hex-pulse {
    0%, 100% { transform: scale(1);    }
    50%       { transform: scale(1.04); }
  }
  @keyframes il-hex-rotate {
    from { transform: rotate(0deg);   }
    to   { transform: rotate(360deg); }
  }
  @keyframes il-glow-pulse {
    0%, 100% { opacity: 0.55; transform: scale(1);    }
    50%       { opacity: 0.9;  transform: scale(1.15); }
  }
  @keyframes il-icon-breathe {
    0%, 100% { opacity: 0.75; filter: drop-shadow(0 0 4px rgba(96,200,255,0.6)); }
    50%       { opacity: 1;   filter: drop-shadow(0 0 10px rgba(96,200,255,1));  }
  }
  @keyframes il-brand-in {
    from { opacity: 0; letter-spacing: 0.35em; }
    to   { opacity: 1; letter-spacing: 0.25em; }
  }
  @keyframes il-ring-rotate {
    from { transform: rotate(0deg);    }
    to   { transform: rotate(-360deg); }
  }
  @keyframes il-halo-pulse {
    0%, 100% { transform: scale(1);    opacity: 0.4; }
    50%       { transform: scale(1.2); opacity: 0.7; }
  }

  /* ── Root ── */
  .il-root {
    font-family: 'Sora', sans-serif;
    position: fixed;
    inset: 0;
    z-index: 9999;
    background: #000;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 40px;
  }
  .il-enter { animation: il-fade-in  0.35s ease-out both; }
  .il-exit  { animation: il-fade-out 0.4s  ease-in  both; pointer-events: none; }

  /* ── Vignette ── */
  .il-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center,
      transparent 30%,
      rgba(0,0,0,0.65) 100%
    );
    pointer-events: none;
  }

  /* ── Halo ── */
  .il-halo {
    position: absolute;
    width: 260px;
    height: 260px;
    border-radius: 50%;
    background: radial-gradient(circle,
      rgba(30, 100, 220, 0.20) 0%,
      rgba(20,  60, 180, 0.08) 45%,
      transparent 70%
    );
    filter: blur(20px);
    animation: il-halo-pulse 3s ease-in-out infinite;
    pointer-events: none;
  }

  /* ── Hex wrapper ── */
  .il-hex-wrap {
    position: relative;
    width: 160px;
    height: 160px;
    display: flex;
    align-items: center;
    justify-content: center;
    animation: il-hex-pulse 3.5s ease-in-out infinite;
  }

  /* ── Outer rotating ring ── */
  .il-ring-track {
    position: absolute;
    inset: 0;
    animation: il-ring-rotate 20s linear infinite;
  }
  .il-ring-svg {
    width: 100%;
    height: 100%;
  }

  /* ── Main hexagon ── */
  .il-hex {
    position: relative;
    width: 120px;
    height: 120px;
    display: flex;
    align-items: center;
    justify-content: center;
    /* Glassmorphism backdrop */
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
  }
  .il-hex-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    filter: drop-shadow(0 0 10px rgba(56, 150, 255, 0.45))
            drop-shadow(0 0 24px rgba(30, 100, 220, 0.25));
  }

  /* ── Center icon ── */
  .il-icon-wrap {
    position: relative;
    z-index: 10;
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .il-icon-glow {
    position: absolute;
    inset: -12px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(96,200,255,0.30) 0%, transparent 70%);
    filter: blur(6px);
    animation: il-glow-pulse 2.5s ease-in-out infinite;
  }
  .il-icon {
    width: 28px;
    height: 28px;
    color: rgba(147, 220, 255, 0.95);
    animation: il-icon-breathe 2.5s ease-in-out infinite;
  }

  /* ── Brand ── */
  .il-brand {
    display: flex;
    align-items: center;
    gap: 6px;
    animation: il-brand-in 0.9s ease-out 0.4s both;
  }
  .il-brand-text {
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.25em;
    color: rgba(180, 220, 255, 0.55);
    text-transform: uppercase;
  }
  .il-brand-dot {
    width: 4px;
    height: 4px;
    border-radius: 50%;
    background: rgba(96, 180, 255, 0.6);
    box-shadow: 0 0 6px rgba(96, 180, 255, 0.8);
    animation: il-glow-pulse 2.5s ease-in-out infinite;
  }
`;
