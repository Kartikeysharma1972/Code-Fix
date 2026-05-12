import { Link } from "react-router-dom";
import "./LandingPage.css";

function HeroIllustration() {
  return (
    <svg viewBox="0 0 500 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="landing-hero-svg">
      {/* Laptop */}
      <rect x="120" y="100" width="260" height="170" rx="12" fill="#1a2740" />
      <rect x="130" y="110" width="240" height="145" rx="6" fill="#0f172a" />
      <rect x="80" y="270" width="340" height="16" rx="8" fill="#334155" />
      <ellipse cx="250" cy="278" rx="40" ry="3" fill="#475569" />

      {/* Code lines on screen */}
      <rect x="148" y="128" width="60" height="6" rx="3" fill="#399aff" opacity="0.9" />
      <rect x="218" y="128" width="40" height="6" rx="3" fill="#94a3b8" opacity="0.5" />
      <rect x="158" y="142" width="80" height="6" rx="3" fill="#22c55e" opacity="0.8" />
      <rect x="248" y="142" width="30" height="6" rx="3" fill="#f59e0b" opacity="0.6" />
      <rect x="158" y="156" width="50" height="6" rx="3" fill="#94a3b8" opacity="0.4" />
      <rect x="218" y="156" width="70" height="6" rx="3" fill="#399aff" opacity="0.7" />
      <rect x="148" y="170" width="90" height="6" rx="3" fill="#ef4444" opacity="0.7" />
      <rect x="158" y="184" width="60" height="6" rx="3" fill="#22c55e" opacity="0.6" />
      <rect x="228" y="184" width="45" height="6" rx="3" fill="#94a3b8" opacity="0.4" />
      <rect x="148" y="198" width="40" height="6" rx="3" fill="#399aff" opacity="0.8" />
      <rect x="198" y="198" width="55" height="6" rx="3" fill="#f59e0b" opacity="0.5" />
      <rect x="158" y="212" width="75" height="6" rx="3" fill="#94a3b8" opacity="0.5" />
      <rect x="148" y="226" width="50" height="6" rx="3" fill="#22c55e" opacity="0.7" />
      <rect x="208" y="226" width="35" height="6" rx="3" fill="#399aff" opacity="0.6" />

      {/* Floating badge - Bug Fixed */}
      <g>
        <rect x="340" y="80" width="110" height="36" rx="18" fill="#22c55e" fillOpacity="0.15" stroke="#22c55e" strokeWidth="1.5" />
        <circle cx="358" cy="98" r="8" fill="#22c55e" />
        <path d="M354 98l3 3 6-6" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <text x="374" y="103" fill="#22c55e" fontSize="12" fontWeight="700" fontFamily="Nunito, sans-serif">Bug Fixed</text>
      </g>

      {/* Floating badge - Python */}
      <g>
        <rect x="50" y="130" width="56" height="28" rx="14" fill="#399aff" fillOpacity="0.15" stroke="#399aff" strokeWidth="1.5" />
        <text x="62" y="149" fill="#399aff" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">PY</text>
      </g>

      {/* Floating badge - JS */}
      <g>
        <rect x="380" y="200" width="50" height="28" rx="14" fill="#f59e0b" fillOpacity="0.15" stroke="#f59e0b" strokeWidth="1.5" />
        <text x="393" y="219" fill="#f59e0b" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">JS</text>
      </g>

      {/* Floating badge - C++ */}
      <g>
        <rect x="60" y="210" width="56" height="28" rx="14" fill="#8b5cf6" fillOpacity="0.15" stroke="#8b5cf6" strokeWidth="1.5" />
        <text x="70" y="229" fill="#8b5cf6" fontSize="11" fontWeight="700" fontFamily="JetBrains Mono, monospace">C++</text>
      </g>

      {/* Cursor arrow */}
      <g transform="translate(310, 175)">
        <path d="M0 0l12 18-5-2-4 8-4-2 4-8-5-1z" fill="white" stroke="#1a2740" strokeWidth="1" />
      </g>

      {/* Decorative circles */}
      <circle cx="430" cy="140" r="6" fill="#399aff" opacity="0.2" />
      <circle cx="450" cy="160" r="4" fill="#22c55e" opacity="0.3" />
      <circle cx="70" cy="170" r="5" fill="#f59e0b" opacity="0.25" />
      <circle cx="90" cy="260" r="4" fill="#399aff" opacity="0.15" />
      <circle cx="420" cy="250" r="5" fill="#8b5cf6" opacity="0.2" />

      {/* Person sitting */}
      <g transform="translate(160, 290)">
        {/* Body */}
        <ellipse cx="90" cy="80" rx="55" ry="15" fill="#e2e8f0" opacity="0.3" />
        {/* Legs crossed */}
        <path d="M60 50 Q50 70 40 75 Q30 78 45 72 Q55 68 65 60z" fill="#334155" />
        <path d="M120 50 Q130 70 140 75 Q150 78 135 72 Q125 68 115 60z" fill="#334155" />
        {/* Torso */}
        <path d="M70 10 Q65 30 60 50 L120 50 Q115 30 110 10z" fill="#399aff" />
        {/* Head */}
        <circle cx="90" cy="-2" r="18" fill="#fbbf24" opacity="0.9" />
        <circle cx="90" cy="-2" r="18" fill="#f5d0a9" />
        {/* Hair */}
        <path d="M72 -12 Q75 -22 90 -22 Q105 -22 108 -12 Q110 -18 105 -20 Q95 -24 85 -24 Q75 -24 72 -18z" fill="#1a2740" />
        {/* Eyes */}
        <circle cx="83" cy="-3" r="2" fill="#1a2740" />
        <circle cx="97" cy="-3" r="2" fill="#1a2740" />
        {/* Smile */}
        <path d="M85 4 Q90 8 95 4" stroke="#1a2740" strokeWidth="1.5" fill="none" strokeLinecap="round" />
        {/* Arms */}
        <path d="M70 20 Q50 30 45 40" stroke="#f5d0a9" strokeWidth="8" strokeLinecap="round" fill="none" />
        <path d="M110 20 Q130 30 135 40" stroke="#f5d0a9" strokeWidth="8" strokeLinecap="round" fill="none" />
      </g>
    </svg>
  );
}

export default function LandingPage() {
  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav-inner">
          <div className="landing-logo">
            <div className="landing-logo-mark">
              <span>&lt;/&gt;</span>
            </div>
            <span className="landing-logo-text">CodeFix</span>
          </div>
          <div className="landing-nav-links">
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
          </div>
          <div className="landing-nav-right">
            <Link to="/login" className="landing-btn-ghost">Sign In</Link>
            <Link to="/signup" className="landing-btn-primary">Get Started</Link>
          </div>
        </div>
      </nav>

      {/* Hero — 2 column like Codevidhya */}
      <section className="landing-hero">
        <div className="landing-hero-inner">
          <div className="landing-hero-left">
            <h1 className="landing-hero-title">
              <span className="landing-blue">Coding</span> Assistant{"\n"}for <span className="landing-pink">Classrooms</span>
            </h1>
            <p className="landing-hero-subtitle">
              We help teachers explain and debug student code, supporting ICT and AI/ML classroom sessions with instant AI-powered analysis, clear explanations, and adaptive learning paths.
            </p>
            <p className="landing-hero-subtitle-2">
              Our comprehensive debugging tool, designed by industry experts, helps individual learners through live code analysis and extends to schools with a unique classroom-ready experience.
            </p>
            <div className="landing-hero-stats">
              <div className="landing-hero-stat">
                <span className="landing-hero-stat-num">22+</span>
                <span className="landing-hero-stat-label">Programming Languages</span>
              </div>
              <div className="landing-hero-stat-divider" />
              <div className="landing-hero-stat">
                <span className="landing-hero-stat-num">50+</span>
                <span className="landing-hero-stat-label">Daily Debugs Free</span>
              </div>
              <div className="landing-hero-stat-divider" />
              <div className="landing-hero-stat">
                <span className="landing-hero-stat-num">100%</span>
                <span className="landing-hero-stat-label">Session History</span>
              </div>
            </div>
          </div>
          <div className="landing-hero-right">
            <HeroIllustration />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="landing-features" id="features">
        <h2 className="landing-section-title">Everything You Need</h2>
        <p className="landing-section-subtitle">Powerful tools for teaching and learning code</p>
        <div className="landing-features-grid">
          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#399aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.376 3.622a1 1 0 0 1 3.002 3.002L7.368 18.635a2 2 0 0 1-.855.506l-2.872.838a.5.5 0 0 1-.62-.62l.838-2.872a2 2 0 0 1 .506-.854z"/></svg>
            </div>
            <h3>AI Code Debugger</h3>
            <p>Paste any code and get instant bug detection with clear, student-friendly explanations of what went wrong and how to fix it.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#399aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
            </div>
            <h3>CS Tutor Chat</h3>
            <p>Ask any computer science question and get clear, educational answers. Like having a personal tutor available 24/7.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#399aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="5 3 19 12 5 21 5 3"/></svg>
            </div>
            <h3>Run Code Live</h3>
            <p>Execute Python, JavaScript, Go and more right in the browser. See output instantly without any setup.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#399aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>
            </div>
            <h3>Learning Mode</h3>
            <p>Step-by-step explanations break down each bug so students actually understand what happened — not just the fix.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#399aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>
            </div>
            <h3>File Upload</h3>
            <p>Upload code files directly — supports .py, .js, .java, .cpp, PDF worksheets and 20+ file formats.</p>
          </div>
          <div className="landing-feature-card">
            <div className="landing-feature-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#399aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>
            </div>
            <h3>22+ Languages</h3>
            <p>Python, Java, C++, JavaScript, TypeScript, Go, Rust, Ruby, PHP, Swift, Kotlin, SQL, and many more supported.</p>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="landing-steps" id="how-it-works">
        <h2 className="landing-section-title">How It Works</h2>
        <p className="landing-section-subtitle">Debug code in 3 simple steps</p>
        <div className="landing-steps-grid">
          <div className="landing-step">
            <div className="landing-step-num">1</div>
            <h3>Paste Your Code</h3>
            <p>Paste code or upload a file. Supports 22+ programming languages including Python, Java, C++, and more.</p>
          </div>
          <div className="landing-step-arrow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b8d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </div>
          <div className="landing-step">
            <div className="landing-step-num">2</div>
            <h3>AI Finds Bugs</h3>
            <p>Our AI analyzes every line, identifies all bugs, and generates the corrected code instantly.</p>
          </div>
          <div className="landing-step-arrow">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#b8d4ff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="M12 5l7 7-7 7"/></svg>
          </div>
          <div className="landing-step">
            <div className="landing-step-num">3</div>
            <h3>Learn & Fix</h3>
            <p>Get clear explanations of each bug written for students. Understand the "why" — not just the fix.</p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <div className="landing-cta-inner">
          <h2>Ready to Debug Smarter?</h2>
          <p>Join teachers and students using AI-powered code debugging in their classrooms.</p>
          <Link to="/signup" className="landing-btn-primary landing-btn-lg">
            Create Free Account
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-brand">
            <div className="landing-logo-mark landing-logo-mark-sm">
              <span>&lt;/&gt;</span>
            </div>
            <span>CodeFix</span>
          </div>
          <p className="landing-footer-text">
            Built by <a href="https://codevidhya.com" target="_blank" rel="noopener noreferrer">CodeVidhya</a> &mdash; Mentoring young learners to thrive in this new world.
          </p>
        </div>
      </footer>
    </div>
  );
}
