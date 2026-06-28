import { useAppStore } from "../../store/appStore";
import type { SkillStatus } from "../../app/engines/learning/engine/LearningEngine";
import styles from "./SkillTreePage.module.css";

// ---------------------------------------------------------------------------
// Tree structure — defines display grouping only
// ---------------------------------------------------------------------------

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
];

// ---------------------------------------------------------------------------
// Page — reads pre-computed skillStatuses from store
// No LearningEngine calls. No UserProgress. No skill definitions.
// ---------------------------------------------------------------------------

export default function SkillTreePage() {
  const { name, level, totalXP, skillStatuses, generateDayTasks } = useAppStore();

  // Build lookup map: skillId → SkillStatus
  const statusMap: Record<string, SkillStatus> = Object.fromEntries(
    skillStatuses.map(s => [s.skillId, s]),
  );

  // Generate tasks on first render if skillStatuses is empty
  // (e.g. first app load before Dashboard has called generateDayTasks)
  if (skillStatuses.length === 0) {
    generateDayTasks();
  }

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Skill Tree</h1>
          <p className={styles.sub}>
            Модель навыков · {name} · Lv.{level} · {totalXP} XP total
          </p>
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
                const status = statusMap[id];
                if (!status) return null;
                return <SkillCard key={id} status={status} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SkillCard — pure presentation
// Receives one SkillStatus object. Renders it. Nothing else.
// ---------------------------------------------------------------------------

function SkillCard({ status }: { status: SkillStatus }) {
  const pct = Math.min((status.xp / status.xpToNext) * 100, 100);
  const isLocked = status.availableLessons.length === 0 && status.level === 0;

  return (
    <div
      className={`${styles.card} ${isLocked ? styles.cardLocked : ""}`}
      style={{ borderTopColor: status.color }}
    >
      {/* Header */}
      <div className={styles.cardTop}>
        <div>
          <div className={styles.skillName}>{status.name}</div>
          <div className={styles.skillDesc}>{status.description}</div>
        </div>
        <div
          className={styles.levelBadge}
          style={{
            background: `${status.color}22`,
            border: `1px solid ${status.color}44`,
          }}
        >
          <span style={{ color: status.color }}>Lv.{status.level}</span>
          <span className={styles.levelMax}>/{status.maxLevel}</span>
        </div>
      </div>

      {/* XP bar */}
      <div className={styles.xpRow}>
        <div className={styles.xpBar}>
          <div
            className={styles.xpFill}
            style={{ width: `${pct}%`, background: status.color }}
          />
        </div>
        <span className={styles.xpText}>
          {status.xp} / {status.xpToNext} XP
          {status.completionPercent > 0 && (
            <> · {status.completionPercent}% complete</>
          )}
        </span>
      </div>

      {/* Next lesson */}
      {status.nextLesson && (
        <div className={styles.topics}>
          <div className={styles.topicUnlocked}>
            <span className={styles.topicIcon} style={{ color: status.color }}>
              ▶
            </span>
            <span>{status.nextLesson.title}</span>
          </div>
        </div>
      )}

      {/* Lesson progress */}
      {status.totalLessons > 0 && (
        <div className={styles.topics}>
          <div className={styles.topicLocked}>
            <span className={styles.topicIcon}>◉</span>
            <span>
              {status.completedLessons}/{status.totalLessons} lessons
            </span>
          </div>
        </div>
      )}

      {/* Locked badge */}
      {isLocked && (
        <div className={styles.topics}>
          <div className={styles.topicLocked}>
            <span className={styles.topicIcon}>🔒</span>
            <span>Locked</span>
          </div>
        </div>
      )}
    </div>
  );
}