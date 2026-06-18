import { NavLink } from "react-router-dom";
import styles from "./Sidebar.module.css";

const NAV = [
  { label: "Dashboard",    to: "/dashboard",    icon: "⊞" },
  { label: "Skill Tree",   to: "/skill-tree",   icon: "⬡" },
  { label: "Second Brain", to: "/second-brain", icon: "◎" },
  { label: "English",      to: "/english",      icon: "Aa" },
  { label: "Creator",      to: "/creator",      icon: "✦" },
  { label: "Career",       to: "/career",       icon: "◈" },
  { label: "Finance",      to: "/finance",      icon: "◇" },
  { label: "Journal",      to: "/journal",      icon: "▣" },
  { label: "Music",        to: "/music",        icon: "♪" },
  { label: "Analytics",    to: "/analytics",    icon: "▲" },
  { label: "Calendar",     to: "/calendar",     icon: "◻" },
];

const BOTTOM = [
  { label: "Settings", to: "/settings", icon: "⚙" },
];

export default function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <div className={styles.logoIcon}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <rect width="22" height="22" rx="6" fill="url(#g)" />
            <path d="M6 16L11 6l5 10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M8 12.5h6" stroke="white" strokeWidth="1.6" strokeLinecap="round"/>
            <defs>
              <linearGradient id="g" x1="0" y1="0" x2="22" y2="22">
                <stop stopColor="#7c3aed"/>
                <stop offset="1" stopColor="#4f46e5"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className={styles.logoText}>
          <span className={styles.logoName}>AI Operating</span>
          <span className={styles.logoSub}>System</span>
        </div>
      </div>

      <nav className={styles.nav}>
        {NAV.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ""].filter(Boolean).join(" ")
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </nav>

      <div className={styles.bottom}>
        {BOTTOM.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              [styles.link, isActive ? styles.active : ""].filter(Boolean).join(" ")
            }
          >
            <span className={styles.icon}>{item.icon}</span>
            <span className={styles.label}>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </aside>
  );
}