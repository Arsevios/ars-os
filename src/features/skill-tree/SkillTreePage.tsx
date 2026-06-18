import { useAppStore } from "../../store/appStore";
import type { Skill } from "../../store/appStore";
import styles from "./SkillTreePage.module.css";

const TREE_STRUCTURE = [
  {
    category: "System Analysis",
    icon: "◈",
    skills: ["sql", "rest-api", "bpmn", "jira"],
  },
  {
    category: "Soft Skills",
    icon: "◎",
    skills: ["english"],
  },
  {
    category: "Personal Brand",
    icon: "✦",
    skills: ["linkedin"],
  },
];

export default function SkillTreePage() {
  const { skills, name, level, totalXP } = useAppStore();
  const skillMap = Object.fromEntries(
  skills.map((s: Skill) => [s.id, s])
);

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Skill Tree</h1>
          <p className={styles.sub}>Модель навыков · {name} · Lv.{level} · {totalXP} XP total</p>
        </div>
        <div className={styles.goal}>
          <span className={styles.goalLabel}>Цель</span>
          <span className={styles.goalValue}>Junior System Analyst</span>
          <span className={styles.goalSub}>Remote · USA market · 12 мес.</span>
        </div>
      </div>

      <div className={styles.tree}>
        {TREE_STRUCTURE.map((branch) => (
          <div key={branch.category} className={styles.branch}>
            <div className={styles.branchHeader}>
              <span className={styles.branchIcon}>{branch.icon}</span>
              <span className={styles.branchName}>{branch.category}</span>
            </div>
            <div className={styles.branchSkills}>
              {branch.skills.map((id) => {
                const skill = skillMap[id];
                if (!skill) return null;
                return <SkillCard key={id} skill={skill} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillCard({ skill }: { skill: Skill }) {
  const pct = Math.min((skill.xp / skill.xpToNext) * 100, 100);
  const isLocked = skill.dependencies.length > 0 && skill.level === 0;

  return (
    <div className={`${styles.card} ${isLocked ? styles.cardLocked : ""}`}
      style={{ borderTopColor: skill.color }}>
      <div className={styles.cardTop}>
        <div>
          <div className={styles.skillName}>{skill.name}</div>
          <div className={styles.skillDesc}>{skill.description}</div>
        </div>
        <div className={styles.levelBadge} style={{ background: `${skill.color}22`, border: `1px solid ${skill.color}44` }}>
          <span style={{ color: skill.color }}>Lv.{skill.level}</span>
          <span className={styles.levelMax}>/{skill.maxLevel}</span>
        </div>
      </div>

      <div className={styles.xpRow}>
        <div className={styles.xpBar}>
          <div className={styles.xpFill} style={{ width: `${pct}%`, background: skill.color }} />
        </div>
        <span className={styles.xpText}>{skill.xp} / {skill.xpToNext} XP</span>
      </div>

      <div className={styles.topics}>
        {skill.unlocked.map((topic) => (
          <div key={topic} className={styles.topicUnlocked}>
            <span className={styles.topicIcon} style={{ color: skill.color }}>✓</span>
            <span>{topic}</span>
          </div>
        ))}
        {skill.locked.map((topic) => (
          <div key={topic} className={styles.topicLocked}>
            <span className={styles.topicIcon}>□</span>
            <span>{topic}</span>
          </div>
        ))}
      </div>
    </div>
  );
}