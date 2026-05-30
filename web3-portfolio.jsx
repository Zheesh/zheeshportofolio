import { useState, useEffect, useRef } from "react";

// ── THEME ────────────────────────────────────────────────────────────────────
const theme = {
  lilac: "#E8D5F5",
  lilacMid: "#C9B8E8",
  lilacDeep: "#9B72CF",
  mint: "#A8E6CF",
  mintMid: "#6DD5B0",
  silver: "#C8C8D8",
  silverLight: "#EEEEF6",
  dark: "#16102A",
  darkMid: "#211840",
  darkCard: "#2A1F52",
  white: "#FAFAFA",
  text: "#1A1035",
  textMuted: "#6B5E8A",
};

// ── DEFAULT DATA ─────────────────────────────────────────────────────────────
const defaultData = {
  hero: {
    name: "CryptoExplorer",
    title: "Crypto Enthusiast & Testnet Pioneer",
    bio: "Aktif mengerjakan testnet dan early-stage blockchain projects. Familiar dengan tools AI seperti Claude, ChatGPT, dan Gemini untuk riset dan analisis on-chain.",
    wallet: "0x742d35Cc6634C0532925a3b8D4C9E2F1a8b3e7d2",
    badge: "Testnet OG",
  },
  about: {
    story: "Perjalanan gw di crypto dimulai dari rasa penasaran yang dalam tentang bagaimana teknologi blockchain bisa mengubah sistem keuangan. Sekarang gw aktif berkontribusi di berbagai testnet dan mengeksplorasi ekosistem Web3 yang terus berkembang.",
    aiTools: ["Claude", "ChatGPT", "Gemini", "Perplexity"],
    interests: ["DeFi", "Layer 2", "Testnet", "On-chain Analytics", "NFT", "DAO"],
    timeline: [
      { year: "2021", event: "Mulai eksplorasi crypto & DeFi pertama" },
      { year: "2022", event: "Aktif di testnet Ethereum & Polygon" },
      { year: "2023", event: "Deep dive ke Layer 2 — Arbitrum, Optimism" },
      { year: "2024", event: "Bergabung testnet Berachain, Blast, Manta, SUI" },
      { year: "2025", event: "Eksplorasi AI tools untuk analisis Web3" },
    ],
  },
  projects: [
    {
      id: 1,
      name: "Berachain Testnet",
      description: "Aktif berpartisipasi di testnet Berachain — liquidity provision, swap, dan native dApp interactions.",
      tag: "Layer 1",
      status: "Active",
      chain: "Berachain",
      link: "",
    },
    {
      id: 2,
      name: "SUI Network",
      description: "Eksplorasi ekosistem SUI — NFT minting, DeFi protocols, dan Move smart contracts.",
      tag: "Layer 1",
      status: "Active",
      chain: "SUI",
      link: "",
    },
    {
      id: 3,
      name: "Blast Testnet",
      description: "Native yield layer — deposit ETH/USDB dan berinteraksi dengan dApps di Blast ecosystem.",
      tag: "Layer 2",
      status: "Completed",
      chain: "Blast",
      link: "",
    },
    {
      id: 4,
      name: "Manta Network",
      description: "Zkp-powered privacy layer — staking, liquidity, dan MantaPay transactions.",
      tag: "Layer 2",
      status: "Completed",
      chain: "Manta",
      link: "",
    },
    {
      id: 5,
      name: "Arbitrum Odyssey",
      description: "Selesaikan semua misi Arbitrum Odyssey — bridging, DeFi, NFT, dan governance.",
      tag: "Layer 2",
      status: "Completed",
      chain: "Arbitrum",
      link: "",
    },
  ],
  ai: {
    intro: "Gw percaya AI adalah multiplier terbaik untuk siapapun yang mau eksplorasi Web3 lebih dalam tanpa harus jago coding.",
    tools: [
      { name: "Claude", use: "Analisis whitepaper, riset tokenomics, prompt engineering", level: 90 },
      { name: "ChatGPT", use: "Brainstorming strategi testnet, draft konten", level: 80 },
      { name: "Gemini", use: "Cross-referensi data on-chain, market research", level: 70 },
      { name: "Perplexity", use: "Real-time crypto news & fact-checking", level: 75 },
    ],
    tip: "💡 Dengan AI yang tepat, kamu bisa analisis proyek Web3 secekatan developer — tanpa harus menulis satu baris kode pun.",
  },
  socials: {
    twitter: "",
    github: "",
    discord: "",
    farcaster: "",
    lens: "",
    telegram: "",
  },
  contact: {
    email: "",
    note: "Open untuk kolaborasi testnet, sharing alpha, atau sekadar ngobrol soal Web3.",
  },
};

// ── HELPERS ──────────────────────────────────────────────────────────────────
const tagColors = {
  "Layer 1": { bg: "#E8D5F5", text: "#7C3AED" },
  "Layer 2": { bg: "#A8E6CF", text: "#0D7A5F" },
  "DeFi": { bg: "#C8C8D8", text: "#3D3560" },
  "NFT": { bg: "#FFE4F0", text: "#C2185B" },
  "DAO": { bg: "#FFF3E0", text: "#E65100" },
};

const statusColors = {
  Active: { bg: "#A8E6CF", text: "#0D7A5F" },
  Completed: { bg: "#C8C8D8", text: "#3D3560" },
  Upcoming: { bg: "#E8D5F5", text: "#7C3AED" },
};

// ── COMPONENTS ───────────────────────────────────────────────────────────────

function FloatingOrbs() {
  return (
    <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 0, overflow: "hidden" }}>
      {[
        { w: 400, h: 400, top: "5%", left: "60%", color: "rgba(232,213,245,0.18)", delay: "0s", dur: "8s" },
        { w: 300, h: 300, top: "50%", left: "5%", color: "rgba(168,230,207,0.14)", delay: "2s", dur: "10s" },
        { w: 200, h: 200, top: "75%", left: "75%", color: "rgba(200,200,216,0.12)", delay: "4s", dur: "7s" },
      ].map((orb, i) => (
        <div key={i} style={{
          position: "absolute",
          width: orb.w, height: orb.h,
          top: orb.top, left: orb.left,
          background: `radial-gradient(circle, ${orb.color}, transparent)`,
          borderRadius: "50%",
          animation: `float ${orb.dur} ease-in-out infinite alternate`,
          animationDelay: orb.delay,
          filter: "blur(40px)",
        }} />
      ))}
    </div>
  );
}

function Navbar({ active, setActive, dark, setDark }) {
  const tabs = ["Home", "About", "Projects", "AI Tools", "Contact"];
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: dark ? "rgba(22,16,42,0.85)" : "rgba(250,250,250,0.85)",
      backdropFilter: "blur(20px)",
      borderBottom: `1px solid ${dark ? "rgba(201,184,232,0.15)" : "rgba(155,114,207,0.12)"}`,
      padding: "0 24px",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      height: 64,
    }}>
      <span style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: 20, fontWeight: 700,
        background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        letterSpacing: "-0.5px",
      }}>
        ◈ Web3Pilgrim
      </span>

      {/* Desktop tabs */}
      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActive(tab)} style={{
            background: active === tab
              ? `linear-gradient(135deg, ${theme.lilacMid}33, ${theme.mint}33)`
              : "transparent",
            border: active === tab ? `1px solid ${theme.lilacMid}66` : "1px solid transparent",
            borderRadius: 10,
            padding: "6px 14px",
            fontSize: 13, fontWeight: active === tab ? 600 : 400,
            color: active === tab ? (dark ? theme.lilac : theme.lilacDeep) : (dark ? theme.silver : theme.textMuted),
            cursor: "pointer",
            transition: "all 0.2s",
            letterSpacing: "0.2px",
          }}>{tab}</button>
        ))}
        <button onClick={() => setDark(!dark)} style={{
          marginLeft: 8, background: "transparent", border: `1px solid ${theme.lilacMid}44`,
          borderRadius: 8, padding: "6px 10px", cursor: "pointer",
          color: dark ? theme.lilac : theme.lilacDeep, fontSize: 16,
        }}>{dark ? "☀️" : "🌙"}</button>
      </div>
    </nav>
  );
}

function GlassCard({ children, style = {}, hover = true }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => hover && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: "rgba(232,213,245,0.07)",
        border: `1px solid ${hovered ? "rgba(201,184,232,0.5)" : "rgba(201,184,232,0.18)"}`,
        borderRadius: 20,
        backdropFilter: "blur(16px)",
        transition: "all 0.3s ease",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        boxShadow: hovered ? "0 12px 40px rgba(155,114,207,0.15)" : "0 4px 20px rgba(155,114,207,0.06)",
        ...style,
      }}
    >{children}</div>
  );
}

function Badge({ text, colors }) {
  return (
    <span style={{
      background: colors?.bg || theme.lilac,
      color: colors?.text || theme.lilacDeep,
      padding: "3px 10px", borderRadius: 20,
      fontSize: 11, fontWeight: 600, letterSpacing: "0.3px",
    }}>{text}</span>
  );
}

// ── PAGES ─────────────────────────────────────────────────────────────────────

function HomePage({ data, dark, setActive }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(data.hero.wallet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  const tc = dark ? theme.white : theme.text;
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", padding: "100px 24px 60px", textAlign: "center" }}>
      <div style={{
        display: "inline-flex", alignItems: "center", gap: 8,
        background: `linear-gradient(135deg, ${theme.lilacMid}22, ${theme.mint}22)`,
        border: `1px solid ${theme.lilacMid}44`,
        borderRadius: 20, padding: "6px 16px", marginBottom: 32,
        fontSize: 12, fontWeight: 600, color: dark ? theme.lilac : theme.lilacDeep,
        letterSpacing: "0.5px",
      }}>
        ◆ {data.hero.badge}
      </div>

      <h1 style={{
        fontFamily: "'DM Serif Display', serif",
        fontSize: "clamp(42px, 8vw, 80px)",
        lineHeight: 1.05,
        margin: "0 0 16px",
        background: `linear-gradient(135deg, ${dark ? theme.lilac : theme.lilacDeep} 0%, ${theme.mintMid} 60%, ${dark ? theme.silver : theme.lilacDeep} 100%)`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        letterSpacing: "-2px",
      }}>{data.hero.name}</h1>

      <p style={{
        fontSize: "clamp(16px, 2.5vw, 22px)",
        color: dark ? theme.silver : theme.textMuted,
        margin: "0 0 24px", fontWeight: 300, letterSpacing: "0.5px",
      }}>{data.hero.title}</p>

      <p style={{
        maxWidth: 560, fontSize: 15, lineHeight: 1.8,
        color: dark ? "rgba(200,200,216,0.8)" : theme.textMuted,
        margin: "0 0 40px",
      }}>{data.hero.bio}</p>

      {/* Wallet */}
      <div onClick={copy} style={{
        display: "flex", alignItems: "center", gap: 10,
        background: dark ? "rgba(42,31,82,0.8)" : "rgba(232,213,245,0.3)",
        border: `1px solid ${theme.lilacMid}44`,
        borderRadius: 14, padding: "10px 20px",
        cursor: "pointer", marginBottom: 40,
        transition: "all 0.2s",
        userSelect: "none",
      }}>
        <span style={{ fontSize: 16 }}>◈</span>
        <span style={{ fontFamily: "monospace", fontSize: 13, color: dark ? theme.lilac : theme.lilacDeep }}>
          {data.hero.wallet.slice(0, 8)}...{data.hero.wallet.slice(-6)}
        </span>
        <span style={{ fontSize: 11, color: theme.mintMid, fontWeight: 600 }}>
          {copied ? "✓ Copied!" : "Copy"}
        </span>
      </div>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        <button onClick={() => setActive("Projects")} style={{
          background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
          border: "none", borderRadius: 14, padding: "14px 28px",
          color: "#fff", fontSize: 14, fontWeight: 600, cursor: "pointer",
          boxShadow: `0 4px 20px ${theme.lilacDeep}44`,
          letterSpacing: "0.3px",
        }}>View Projects →</button>
        <button onClick={() => setActive("Contact")} style={{
          background: "transparent",
          border: `1.5px solid ${theme.lilacMid}66`,
          borderRadius: 14, padding: "14px 28px",
          color: dark ? theme.lilac : theme.lilacDeep,
          fontSize: 14, fontWeight: 600, cursor: "pointer",
          letterSpacing: "0.3px",
        }}>Contact Me</button>
      </div>

      {/* Stats row */}
      <div style={{ display: "flex", gap: 32, marginTop: 72, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { n: "10+", label: "Testnets Completed" },
          { n: "3+", label: "Years in Web3" },
          { n: "4", label: "AI Tools Mastered" },
        ].map((s, i) => (
          <div key={i} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: "'DM Serif Display', serif",
              fontSize: 36, fontWeight: 700,
              background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            }}>{s.n}</div>
            <div style={{ fontSize: 12, color: dark ? theme.silver : theme.textMuted, letterSpacing: "0.5px" }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function AboutPage({ data, dark }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 24px 60px" }}>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif", fontSize: 40,
        background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: 8, letterSpacing: "-1px",
      }}>About Me</h2>
      <p style={{ color: dark ? theme.silver : theme.textMuted, marginBottom: 40, fontSize: 14 }}>Who I am & how I got here</p>

      <GlassCard style={{ padding: 28, marginBottom: 24 }} hover={false}>
        <p style={{ color: dark ? theme.silverLight : theme.text, lineHeight: 1.9, fontSize: 15, margin: 0 }}>
          {data.about.story}
        </p>
      </GlassCard>

      {/* Timeline */}
      <h3 style={{ color: dark ? theme.lilac : theme.lilacDeep, fontSize: 18, marginBottom: 16, fontWeight: 600 }}>Journey</h3>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 32 }}>
        {data.about.timeline.map((t, i) => (
          <GlassCard key={i} style={{ padding: "14px 20px", display: "flex", alignItems: "center", gap: 20 }}>
            <span style={{
              fontFamily: "'DM Serif Display', serif", fontSize: 18,
              color: theme.lilacDeep, fontWeight: 700, minWidth: 44,
            }}>{t.year}</span>
            <span style={{ color: dark ? theme.silverLight : theme.text, fontSize: 14 }}>{t.event}</span>
          </GlassCard>
        ))}
      </div>

      {/* Interests */}
      <h3 style={{ color: dark ? theme.lilac : theme.lilacDeep, fontSize: 18, marginBottom: 12, fontWeight: 600 }}>Interests</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 32 }}>
        {data.about.interests.map((t, i) => (
          <Badge key={i} text={t} colors={tagColors[t] || { bg: theme.lilac, text: theme.lilacDeep }} />
        ))}
      </div>

      {/* AI Tools */}
      <h3 style={{ color: dark ? theme.lilac : theme.lilacDeep, fontSize: 18, marginBottom: 12, fontWeight: 600 }}>AI Tools Used</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {data.about.aiTools.map((t, i) => (
          <span key={i} style={{
            background: `linear-gradient(135deg, ${theme.mint}33, ${theme.lilacMid}33)`,
            border: `1px solid ${theme.mintMid}44`,
            color: dark ? theme.mint : "#0D7A5F",
            padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
          }}>{t}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectsPage({ data, dark }) {
  const [filter, setFilter] = useState("All");
  const tags = ["All", "Layer 1", "Layer 2", "DeFi", "NFT", "DAO"];
  const filtered = filter === "All" ? data.projects : data.projects.filter(p => p.tag === filter);
  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "100px 24px 60px" }}>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif", fontSize: 40,
        background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: 8, letterSpacing: "-1px",
      }}>Projects</h2>
      <p style={{ color: dark ? theme.silver : theme.textMuted, marginBottom: 32, fontSize: 14 }}>Testnet & ecosystem explorations</p>

      {/* Filter */}
      <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32 }}>
        {tags.map(t => (
          <button key={t} onClick={() => setFilter(t)} style={{
            background: filter === t ? `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})` : "transparent",
            border: `1.5px solid ${filter === t ? "transparent" : theme.lilacMid + "44"}`,
            borderRadius: 20, padding: "6px 16px",
            color: filter === t ? "#fff" : (dark ? theme.silver : theme.textMuted),
            fontSize: 12, fontWeight: 600, cursor: "pointer",
            transition: "all 0.2s",
          }}>{t}</button>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 16 }}>
        {filtered.map(p => (
          <GlassCard key={p.id} style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 12 }}>
              <Badge text={p.tag} colors={tagColors[p.tag]} />
              <Badge text={p.status} colors={statusColors[p.status]} />
            </div>
            <h3 style={{
              fontFamily: "'DM Serif Display', serif",
              color: dark ? theme.lilac : theme.text,
              fontSize: 18, margin: "0 0 8px", letterSpacing: "-0.3px",
            }}>{p.name}</h3>
            <p style={{
              color: dark ? "rgba(200,200,216,0.7)" : theme.textMuted,
              fontSize: 13, lineHeight: 1.7, margin: "0 0 16px",
            }}>{p.description}</p>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 6,
              background: dark ? "rgba(42,31,82,0.6)" : "rgba(232,213,245,0.4)",
              borderRadius: 8, padding: "4px 10px",
              fontSize: 11, color: dark ? theme.silver : theme.textMuted,
              fontFamily: "monospace",
            }}>⛓ {p.chain}</div>
            {p.link && (
              <a href={p.link} target="_blank" rel="noreferrer" style={{
                display: "block", marginTop: 12, fontSize: 12, color: theme.mintMid, fontWeight: 600, textDecoration: "none",
              }}>View →</a>
            )}
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function AIToolsPage({ data, dark }) {
  return (
    <div style={{ maxWidth: 800, margin: "0 auto", padding: "100px 24px 60px" }}>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif", fontSize: 40,
        background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: 8, letterSpacing: "-1px",
      }}>AI Tools</h2>
      <p style={{ color: dark ? theme.silver : theme.textMuted, marginBottom: 12, fontSize: 14 }}>How I use AI to navigate Web3</p>

      <GlassCard style={{ padding: "18px 24px", marginBottom: 32, borderLeft: `3px solid ${theme.mintMid}` }} hover={false}>
        <p style={{ margin: 0, color: dark ? theme.mint : "#0D7A5F", fontSize: 14, lineHeight: 1.7 }}>{data.ai.tip}</p>
      </GlassCard>

      <p style={{ color: dark ? theme.silverLight : theme.text, lineHeight: 1.8, marginBottom: 36, fontSize: 15 }}>{data.ai.intro}</p>

      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {data.ai.tools.map((tool, i) => (
          <GlassCard key={i} style={{ padding: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <h3 style={{
                fontFamily: "'DM Serif Display', serif", margin: 0,
                color: dark ? theme.lilac : theme.lilacDeep, fontSize: 20,
              }}>{tool.name}</h3>
              <span style={{ fontSize: 13, color: dark ? theme.silver : theme.textMuted, fontWeight: 600 }}>{tool.level}%</span>
            </div>
            <p style={{ margin: "0 0 14px", fontSize: 13, color: dark ? "rgba(200,200,216,0.7)" : theme.textMuted, lineHeight: 1.6 }}>{tool.use}</p>
            <div style={{ background: dark ? "rgba(42,31,82,0.8)" : "rgba(232,213,245,0.3)", borderRadius: 8, height: 6, overflow: "hidden" }}>
              <div style={{
                height: "100%", borderRadius: 8,
                background: `linear-gradient(90deg, ${theme.lilacDeep}, ${theme.mintMid})`,
                width: `${tool.level}%`,
                transition: "width 1s ease",
              }} />
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}

function ContactPage({ data, dark }) {
  const socials = [
    { key: "twitter", label: "Twitter / X", icon: "𝕏", prefix: "https://twitter.com/" },
    { key: "github", label: "GitHub", icon: "◎", prefix: "https://github.com/" },
    { key: "discord", label: "Discord", icon: "◈", prefix: "" },
    { key: "farcaster", label: "Farcaster", icon: "◇", prefix: "https://warpcast.com/" },
    { key: "telegram", label: "Telegram", icon: "✈", prefix: "https://t.me/" },
  ];
  const activeSocials = socials.filter(s => data.socials[s.key]);
  return (
    <div style={{ maxWidth: 700, margin: "0 auto", padding: "100px 24px 60px" }}>
      <h2 style={{
        fontFamily: "'DM Serif Display', serif", fontSize: 40,
        background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
        marginBottom: 8, letterSpacing: "-1px",
      }}>Contact</h2>
      <p style={{ color: dark ? theme.silver : theme.textMuted, marginBottom: 40, fontSize: 14 }}>{data.contact.note}</p>

      {activeSocials.length > 0 && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: 12, marginBottom: 32 }}>
          {activeSocials.map(s => (
            <a key={s.key} href={`${s.prefix}${data.socials[s.key]}`} target="_blank" rel="noreferrer" style={{ textDecoration: "none" }}>
              <GlassCard style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: 20, color: theme.lilacDeep }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 11, color: dark ? theme.silver : theme.textMuted }}>{s.label}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: dark ? theme.lilac : theme.text }}>@{data.socials[s.key]}</div>
                </div>
              </GlassCard>
            </a>
          ))}
        </div>
      )}

      {data.contact.email && (
        <GlassCard style={{ padding: 24 }} hover={false}>
          <p style={{ margin: 0, fontSize: 14, color: dark ? theme.silver : theme.textMuted }}>Email</p>
          <a href={`mailto:${data.contact.email}`} style={{ color: theme.lilacDeep, fontWeight: 600, textDecoration: "none" }}>{data.contact.email}</a>
        </GlassCard>
      )}

      {!activeSocials.length && !data.contact.email && (
        <GlassCard style={{ padding: 32, textAlign: "center" }} hover={false}>
          <p style={{ color: dark ? theme.silver : theme.textMuted, margin: 0 }}>Tambahkan social media kamu di Dashboard untuk menampilkannya di sini.</p>
        </GlassCard>
      )}
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────────
function Dashboard({ data, setData, dark, onClose }) {
  const [section, setSection] = useState("hero");
  const [local, setLocal] = useState(JSON.parse(JSON.stringify(data)));
  const [saved, setSaved] = useState(false);

  const save = () => { setData(local); setSaved(true); setTimeout(() => setSaved(false), 2000); };

  const inp = (style = {}) => ({
    width: "100%", boxSizing: "border-box",
    background: dark ? "rgba(42,31,82,0.8)" : "rgba(232,213,245,0.2)",
    border: `1px solid ${theme.lilacMid}44`,
    borderRadius: 10, padding: "10px 14px",
    color: dark ? theme.white : theme.text, fontSize: 14,
    outline: "none", marginBottom: 12,
    ...style,
  });

  const label = (text) => (
    <label style={{ fontSize: 11, fontWeight: 700, color: dark ? theme.silver : theme.textMuted, letterSpacing: "0.5px", display: "block", marginBottom: 4 }}>
      {text.toUpperCase()}
    </label>
  );

  const sections = [
    { key: "hero", label: "🏠 Hero" },
    { key: "about", label: "👤 About" },
    { key: "projects", label: "🚀 Projects" },
    { key: "ai", label: "🤖 AI Tools" },
    { key: "socials", label: "🔗 Socials" },
    { key: "contact", label: "✉️ Contact" },
  ];

  const renderSection = () => {
    switch (section) {
      case "hero": return (
        <div>
          {label("Name / Username")}
          <input style={inp()} value={local.hero.name} onChange={e => setLocal({ ...local, hero: { ...local.hero, name: e.target.value } })} />
          {label("Title")}
          <input style={inp()} value={local.hero.title} onChange={e => setLocal({ ...local, hero: { ...local.hero, title: e.target.value } })} />
          {label("Bio")}
          <textarea rows={4} style={inp({ resize: "vertical" })} value={local.hero.bio} onChange={e => setLocal({ ...local, hero: { ...local.hero, bio: e.target.value } })} />
          {label("Wallet Address")}
          <input style={inp()} value={local.hero.wallet} onChange={e => setLocal({ ...local, hero: { ...local.hero, wallet: e.target.value } })} placeholder="0x..." />
          {label("Badge Text")}
          <input style={inp()} value={local.hero.badge} onChange={e => setLocal({ ...local, hero: { ...local.hero, badge: e.target.value } })} />
        </div>
      );
      case "about": return (
        <div>
          {label("Story / Bio Panjang")}
          <textarea rows={5} style={inp({ resize: "vertical" })} value={local.about.story} onChange={e => setLocal({ ...local, about: { ...local.about, story: e.target.value } })} />
          {label("Timeline (pisahkan per baris: TAHUN|EVENT)")}
          <textarea rows={6} style={inp({ resize: "vertical", fontFamily: "monospace", fontSize: 12 })}
            value={local.about.timeline.map(t => `${t.year}|${t.event}`).join("\n")}
            onChange={e => {
              const lines = e.target.value.split("\n").map(l => { const [year, ...rest] = l.split("|"); return { year, event: rest.join("|") }; });
              setLocal({ ...local, about: { ...local.about, timeline: lines } });
            }} />
          {label("Interests (pisahkan koma)")}
          <input style={inp()} value={local.about.interests.join(", ")}
            onChange={e => setLocal({ ...local, about: { ...local.about, interests: e.target.value.split(",").map(s => s.trim()) } })} />
          {label("AI Tools (pisahkan koma)")}
          <input style={inp()} value={local.about.aiTools.join(", ")}
            onChange={e => setLocal({ ...local, about: { ...local.about, aiTools: e.target.value.split(",").map(s => s.trim()) } })} />
        </div>
      );
      case "projects": return (
        <div>
          <p style={{ fontSize: 12, color: dark ? theme.silver : theme.textMuted, marginBottom: 16 }}>Edit setiap project di bawah ini:</p>
          {local.projects.map((p, i) => (
            <GlassCard key={p.id} style={{ padding: 20, marginBottom: 16 }} hover={false}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
                <span style={{ fontWeight: 700, color: dark ? theme.lilac : theme.lilacDeep, fontSize: 15 }}>{p.name}</span>
                <button onClick={() => {
                  const newP = local.projects.filter((_, idx) => idx !== i);
                  setLocal({ ...local, projects: newP });
                }} style={{ background: "rgba(255,80,80,0.15)", border: "none", borderRadius: 8, padding: "4px 10px", color: "#f87171", cursor: "pointer", fontSize: 11 }}>Hapus</button>
              </div>
              {label("Nama Project")}
              <input style={inp()} value={p.name} onChange={e => { const np = [...local.projects]; np[i] = { ...p, name: e.target.value }; setLocal({ ...local, projects: np }); }} />
              {label("Deskripsi")}
              <textarea rows={3} style={inp({ resize: "vertical" })} value={p.description} onChange={e => { const np = [...local.projects]; np[i] = { ...p, description: e.target.value }; setLocal({ ...local, projects: np }); }} />
              {label("Tag")}
              <select style={inp()} value={p.tag} onChange={e => { const np = [...local.projects]; np[i] = { ...p, tag: e.target.value }; setLocal({ ...local, projects: np }); }}>
                {["Layer 1", "Layer 2", "DeFi", "NFT", "DAO"].map(t => <option key={t}>{t}</option>)}
              </select>
              {label("Status")}
              <select style={inp()} value={p.status} onChange={e => { const np = [...local.projects]; np[i] = { ...p, status: e.target.value }; setLocal({ ...local, projects: np }); }}>
                {["Active", "Completed", "Upcoming"].map(t => <option key={t}>{t}</option>)}
              </select>
              {label("Chain")}
              <input style={inp()} value={p.chain} onChange={e => { const np = [...local.projects]; np[i] = { ...p, chain: e.target.value }; setLocal({ ...local, projects: np }); }} />
              {label("Link (opsional)")}
              <input style={inp()} value={p.link} onChange={e => { const np = [...local.projects]; np[i] = { ...p, link: e.target.value }; setLocal({ ...local, projects: np }); }} placeholder="https://..." />
            </GlassCard>
          ))}
          <button onClick={() => setLocal({ ...local, projects: [...local.projects, { id: Date.now(), name: "New Project", description: "", tag: "Layer 1", status: "Upcoming", chain: "", link: "" }] })}
            style={{ width: "100%", background: `linear-gradient(135deg, ${theme.lilacDeep}22, ${theme.mint}22)`, border: `1.5px dashed ${theme.lilacMid}66`, borderRadius: 14, padding: "14px", color: dark ? theme.lilac : theme.lilacDeep, fontSize: 14, fontWeight: 600, cursor: "pointer" }}>
            + Tambah Project
          </button>
        </div>
      );
      case "ai": return (
        <div>
          {label("Intro Text")}
          <textarea rows={3} style={inp({ resize: "vertical" })} value={local.ai.intro} onChange={e => setLocal({ ...local, ai: { ...local.ai, intro: e.target.value } })} />
          {label("Tip Text")}
          <textarea rows={2} style={inp({ resize: "vertical" })} value={local.ai.tip} onChange={e => setLocal({ ...local, ai: { ...local.ai, tip: e.target.value } })} />
          <p style={{ fontSize: 12, color: dark ? theme.silver : theme.textMuted, marginBottom: 12 }}>AI Tools:</p>
          {local.ai.tools.map((t, i) => (
            <GlassCard key={i} style={{ padding: 16, marginBottom: 12 }} hover={false}>
              {label("Nama Tool")}
              <input style={inp()} value={t.name} onChange={e => { const nt = [...local.ai.tools]; nt[i] = { ...t, name: e.target.value }; setLocal({ ...local, ai: { ...local.ai, tools: nt } }); }} />
              {label("Kegunaan")}
              <input style={inp()} value={t.use} onChange={e => { const nt = [...local.ai.tools]; nt[i] = { ...t, use: e.target.value }; setLocal({ ...local, ai: { ...local.ai, tools: nt } }); }} />
              {label(`Level: ${t.level}%`)}
              <input type="range" min={0} max={100} value={t.level} style={{ width: "100%", marginBottom: 12 }}
                onChange={e => { const nt = [...local.ai.tools]; nt[i] = { ...t, level: Number(e.target.value) }; setLocal({ ...local, ai: { ...local.ai, tools: nt } }); }} />
            </GlassCard>
          ))}
        </div>
      );
      case "socials": return (
        <div>
          <p style={{ fontSize: 12, color: dark ? theme.silver : theme.textMuted, marginBottom: 16 }}>Masukkan username saja (tanpa @), atau link penuh untuk Discord.</p>
          {[
            { key: "twitter", label: "Twitter / X Username" },
            { key: "github", label: "GitHub Username" },
            { key: "discord", label: "Discord Username" },
            { key: "farcaster", label: "Farcaster Username" },
            { key: "lens", label: "Lens Username" },
            { key: "telegram", label: "Telegram Username" },
          ].map(s => (
            <div key={s.key}>
              {label(s.label)}
              <input style={inp()} value={local.socials[s.key]} placeholder={`contoh: cryptopilgrim`}
                onChange={e => setLocal({ ...local, socials: { ...local.socials, [s.key]: e.target.value } })} />
            </div>
          ))}
        </div>
      );
      case "contact": return (
        <div>
          {label("Email")}
          <input style={inp()} value={local.contact.email} onChange={e => setLocal({ ...local, contact: { ...local.contact, email: e.target.value } })} placeholder="your@email.com" />
          {label("Catatan / Note")}
          <textarea rows={3} style={inp({ resize: "vertical" })} value={local.contact.note} onChange={e => setLocal({ ...local, contact: { ...local.contact, note: e.target.value } })} />
        </div>
      );
      default: return null;
    }
  };

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: dark ? "rgba(16,10,30,0.97)" : "rgba(245,240,255,0.97)",
      backdropFilter: "blur(20px)",
      display: "flex", flexDirection: "column",
    }}>
      {/* Header */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "16px 24px",
        borderBottom: `1px solid ${theme.lilacMid}22`,
      }}>
        <span style={{ fontFamily: "'DM Serif Display', serif", fontSize: 22, color: dark ? theme.lilac : theme.lilacDeep }}>
          ⚙ Dashboard
        </span>
        <div style={{ display: "flex", gap: 10 }}>
          <button onClick={save} style={{
            background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
            border: "none", borderRadius: 10, padding: "8px 20px",
            color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
          }}>{saved ? "✓ Saved!" : "Save Changes"}</button>
          <button onClick={onClose} style={{
            background: "transparent", border: `1px solid ${theme.lilacMid}44`,
            borderRadius: 10, padding: "8px 16px", color: dark ? theme.silver : theme.textMuted,
            cursor: "pointer", fontSize: 13,
          }}>✕ Close</button>
        </div>
      </div>

      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        {/* Sidebar */}
        <div style={{
          width: 200, padding: 16, borderRight: `1px solid ${theme.lilacMid}22`,
          display: "flex", flexDirection: "column", gap: 4,
          overflowY: "auto",
        }}>
          {sections.map(s => (
            <button key={s.key} onClick={() => setSection(s.key)} style={{
              background: section === s.key ? `linear-gradient(135deg, ${theme.lilacMid}33, ${theme.mint}22)` : "transparent",
              border: section === s.key ? `1px solid ${theme.lilacMid}44` : "1px solid transparent",
              borderRadius: 10, padding: "10px 14px",
              color: section === s.key ? (dark ? theme.lilac : theme.lilacDeep) : (dark ? theme.silver : theme.textMuted),
              textAlign: "left", cursor: "pointer", fontSize: 13, fontWeight: section === s.key ? 600 : 400,
            }}>{s.label}</button>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: 24, overflowY: "auto" }}>
          <h3 style={{ color: dark ? theme.lilac : theme.lilacDeep, marginBottom: 20, fontSize: 18, fontFamily: "'DM Serif Display', serif" }}>
            {sections.find(s => s.key === section)?.label}
          </h3>
          {renderSection()}
        </div>
      </div>
    </div>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [dark, setDark] = useState(true);
  const [active, setActive] = useState("Home");
  const [data, setData] = useState(defaultData);
  const [showDash, setShowDash] = useState(false);
  const [dashAuth, setDashAuth] = useState(false);
  const [passInput, setPassInput] = useState("");
  const [passErr, setPassErr] = useState(false);
  const PASS = "web3admin";

  const bg = dark
    ? `linear-gradient(135deg, ${theme.dark} 0%, ${theme.darkMid} 50%, #1A1535 100%)`
    : `linear-gradient(135deg, #F5F0FF 0%, #EDF7F4 50%, #F8F8FC 100%)`;

  const handleDash = () => { setShowDash(true); };
  const handleAuth = () => {
    if (passInput === PASS) { setDashAuth(true); setPassErr(false); setPassInput(""); }
    else { setPassErr(true); }
  };

  const renderPage = () => {
    switch (active) {
      case "Home": return <HomePage data={data} dark={dark} setActive={setActive} />;
      case "About": return <AboutPage data={data} dark={dark} />;
      case "Projects": return <ProjectsPage data={data} dark={dark} />;
      case "AI Tools": return <AIToolsPage data={data} dark={dark} />;
      case "Contact": return <ContactPage data={data} dark={dark} />;
      default: return <HomePage data={data} dark={dark} setActive={setActive} />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=Sora:wght@300;400;500;600;700&display=swap');
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Sora', sans-serif; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: rgba(155,114,207,0.3); border-radius: 3px; }
        @keyframes float {
          0% { transform: translateY(0px) scale(1); }
          100% { transform: translateY(-30px) scale(1.05); }
        }
        select option { background: #211840; color: #fafafa; }
      `}</style>

      <div style={{ minHeight: "100vh", background: bg, position: "relative" }}>
        <FloatingOrbs />
        <Navbar active={active} setActive={setActive} dark={dark} setDark={setDark} />
        <div style={{ position: "relative", zIndex: 1 }}>
          {renderPage()}
        </div>

        {/* Dashboard FAB */}
        <button onClick={handleDash} style={{
          position: "fixed", bottom: 28, right: 28, zIndex: 99,
          background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
          border: "none", borderRadius: 16, padding: "12px 20px",
          color: "#fff", fontWeight: 700, fontSize: 13, cursor: "pointer",
          boxShadow: `0 8px 30px ${theme.lilacDeep}55`,
          display: "flex", alignItems: "center", gap: 8,
          letterSpacing: "0.3px",
        }}>⚙ Dashboard</button>

        {/* Auth Modal */}
        {showDash && !dashAuth && (
          <div style={{
            position: "fixed", inset: 0, zIndex: 300,
            background: "rgba(16,10,30,0.95)", backdropFilter: "blur(20px)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <GlassCard style={{ padding: 40, width: 360, textAlign: "center" }} hover={false}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>🔐</div>
              <h3 style={{ fontFamily: "'DM Serif Display', serif", color: theme.lilac, fontSize: 24, marginBottom: 8 }}>Dashboard</h3>
              <p style={{ color: theme.silver, fontSize: 13, marginBottom: 24 }}>Masukkan password untuk melanjutkan</p>
              <input type="password" placeholder="Password..."
                value={passInput}
                onChange={e => setPassInput(e.target.value)}
                onKeyDown={e => e.key === "Enter" && handleAuth()}
                style={{
                  width: "100%", background: "rgba(42,31,82,0.8)",
                  border: `1px solid ${passErr ? "#f87171" : theme.lilacMid + "44"}`,
                  borderRadius: 12, padding: "12px 16px",
                  color: theme.white, fontSize: 14, outline: "none", marginBottom: 8,
                }} />
              {passErr && <p style={{ color: "#f87171", fontSize: 12, marginBottom: 8 }}>Password salah. Coba lagi.</p>}
              <div style={{ display: "flex", gap: 10, marginTop: 8 }}>
                <button onClick={() => { setShowDash(false); setPassInput(""); setPassErr(false); }} style={{
                  flex: 1, background: "transparent", border: `1px solid ${theme.lilacMid}44`,
                  borderRadius: 10, padding: "10px", color: theme.silver, cursor: "pointer", fontSize: 13,
                }}>Batal</button>
                <button onClick={handleAuth} style={{
                  flex: 1, background: `linear-gradient(135deg, ${theme.lilacDeep}, ${theme.mintMid})`,
                  border: "none", borderRadius: 10, padding: "10px",
                  color: "#fff", fontWeight: 700, cursor: "pointer", fontSize: 13,
                }}>Masuk</button>
              </div>
              <p style={{ fontSize: 11, color: theme.textMuted, marginTop: 16 }}>Default: web3admin</p>
            </GlassCard>
          </div>
        )}

        {/* Dashboard */}
        {showDash && dashAuth && (
          <Dashboard data={data} setData={(d) => { setData(d); }} dark={dark} onClose={() => { setShowDash(false); setDashAuth(false); }} />
        )}
      </div>
    </>
  );
}
