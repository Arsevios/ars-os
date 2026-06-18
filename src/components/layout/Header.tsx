import { useLocation } from "react-router-dom";
import styles from "./Header.module.css";

const TITLES: Record<string, string> = {
  "/":            "Dashboard",
  "/dashboard":   "Dashboard",
  "/skill-tree":  "Skill Tree",
  "/second-brain":"Second Brain",
  "/english":     "English",
  "/creator":     "Creator",
  "/career":      "Career",
  "/finance":     "Finance",
  "/journal":     "Journal",
  "/music":       "Music",
  "/analytics":   "Analytics",
  "/calendar":    "Calendar",
  "/settings":    "Settings",
};

export default function Header() {
  const { pathname } = useLocation();
  const title = TITLES[pathname] ?? "ARS-OS";
  const date = new Date().toLocaleDateString("en-US", {
    weekday: "short", month: "short", day: "numeric",
  });

  return (
    <header className={styles.header}>
      <span className={styles.title}>{title}</span>

      <div className={styles.search}>
        <svg className={styles.searchIcon} viewBox="0 0 16 16" fill="none">
          <circle cx="7" cy="7" r="4.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M10.5 10.5L13 13" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
        </svg>
        <input className={styles.input} placeholder="Search..." aria-label="Search" />
        <kbd className={styles.kbd}>⌘K</kbd>
      </div>

      <div className={styles.right}>
        <span className={styles.date}>{date}</span>
        <div className={styles.badge}>
          <span className={styles.dot} />
          AI
        </div>
      </div>
    </header>
  );
}