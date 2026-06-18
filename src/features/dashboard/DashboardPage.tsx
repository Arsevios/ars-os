import { useAppStore } from "../../store/appStore";
import styles from "./DashboardPage.module.css";

export default function DashboardPage() {
  const { name, xp, level, addXP } = useAppStore();
  const xpInLevel = xp % 100;

  return (
    <div className={styles.page}>
      <div className={styles.greeting}>
        <h1>Good evening, {name}.</h1>
        <p>Here's your system status.</p>
      </div>

      <div className={styles.grid}>
        <div className={styles.card}>
          <span className={styles.cardLabel}>Level</span>
          <span className={styles.cardValue}>{level}</span>
        </div>

        <div className={styles.card}>
          <span className={styles.cardLabel}>Total XP</span>
          <span className={styles.cardValue}>{xp}</span>
        </div>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <span className={styles.cardLabel}>Progress to next level</span>
          <div className={styles.bar}>
            <div className={styles.fill} style={{ width: `${xpInLevel}%` }} />
          </div>
          <span className={styles.barLabel}>{xpInLevel} / 100 XP</span>
        </div>

        <div className={`${styles.card} ${styles.cardWide}`}>
          <span className={styles.cardLabel}>Quick actions</span>
          <div className={styles.actions}>
            <button className={styles.btn} onClick={() => addXP(10)}>+10 XP — Task done</button>
            <button className={styles.btn} onClick={() => addXP(20)}>+20 XP — Study session</button>
            <button className={styles.btn} onClick={() => addXP(40)}>+40 XP — Major milestone</button>
          </div>
        </div>
      </div>
    </div>
  );
}