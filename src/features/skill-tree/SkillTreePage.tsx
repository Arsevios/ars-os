import { useAppStore } from "../../store/appStore";
import type { SkillProgress } from "../../store/appStore";
import styles from "./SkillTreePage.module.css";

// Static skill definitions — learning content, never changes at runtime
import { sqlSkill }     from "../../app/engines/learning/data/skills/sql.skill";
import { restApiSkill } from "../../app/engines/learning/data/skills/rest-api.skill";
import { englishSkill } from "../../app/engines/learning/data/skills/english.skill";
import { bpmnSkill }    from "../../app/engines/learning/data/skills/bpmn.skill";
import { jiraSkill }    from "../../app/engines/learning/data/skills/jira.skill";

// Adapter — outside the UI, separate responsibility
import { buildUserProgress } from "../../app/engines/learning/adapters/buildUserProgress";

// LearningEngine — pure domain logic
import {
  getSkillStatus,
  type SkillStatus,
} from "../../app/engines/learning/engine/LearningEngine";

// Entity types
import type { Skill as SkillDefinition } from "../../app/engines/learning/entities";

// ---------------------------------------------------------------------------
// Static registry
// ---------------------------------------------------------------------------

const SKILL_DEFINITIONS: Record<string, SkillDefinition> = {
  sql:        sqlSkill,
  "rest-api": restApiSkill,
  english:    englishSkill,
  bpmn:       bpmnSkill,
  jira:       jiraSkill,
};

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
// Page — reads store, builds UserProgress via adapter, calls LearningEngine
// ---------------------------------------------------------------------------

export default function SkillTreePage() {
  const { skills, name, level, totalXP, totalCoins } = useAppStore();

  const skillProgressMap = Object.fromEntries(
    skills.map((s: SkillProgress) => [s.id, s]),
  );

  // Adapter converts store shape → LearningEngine shape
  const userProgress = buildUserProgress(skills, totalXP, totalCoins);

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
                const definition = SKILL_DEFINITIONS[id];
                const progress = skillProgressMap[id];
                if (!definition || !progress) return null;

                // All calculations via LearningEngine — never in the component
                const status = getSkillStatus(definition, userProgress);

                return (
                  <SkillCard
                    key={id}
                    definition={definition}
                    progress={progress}
                    status={status}
                  />
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// SkillCard — pure presentation, receives data, renders it
// ---------------------------------------------------------------------------

interface SkillCardProps {
  definition: SkillDefinition;
  progress: SkillProgress;
  status: SkillStatus;
}

function SkillCard({ definition, progress, status }: SkillCardProps) {
  const pct = Math.min((progress.xp / progress.xpToNext) * 100, 100);
  const isLocked = status.availableLessons.length === 0 && progress.level === 0;

  return (
    <div
      className={`${styles.card} ${isLocked ? styles.cardLocked : ""}`}
      style={{ borderTopColor: definition.color }}
    >
      {/* Header */}
      <div className={styles.cardTop}>
        <div>
          <div className={styles.skillName}>{definition.name}</div>
          <div className={styles.skillDesc}>{definition.description}</div>
        </div>
        <div
          className={styles.levelBadge}
          style={{
            background: `${definition.color}22`,
            border: `1px solid ${definition.color}44`,
          }}
        >
          <span style={{ color: definition.color }}>Lv.{progress.level}</span>
          <span className={styles.levelMax}>/{definition.maxLevel}</span>
        </div>
      </div>

      {/* XP bar */}
      <div className={styles.xpRow}>
        <div className={styles.xpBar}>
          <div
            className={styles.xpFill}
            style={{ width: `${pct}%`, background: definition.color }}
          />
        </div>
        <span className={styles.xpText}>
          {progress.xp} / {progress.xpToNext} XP
          {status.completionPercent > 0 && (
            <> · {status.completionPercent}% complete</>
          )}
        </span>
      </div>

      {/* Next lesson from LearningEngine */}
      {status.nextLesson && (
        <div className={styles.topics}>
          <div className={styles.topicUnlocked}>
            <span
              className={styles.topicIcon}
              style={{ color: definition.color }}
            >
              ▶
            </span>
            <span>{status.nextLesson.title}</span>
          </div>
        </div>
      )}

      {/* Topics — unlocked and locked from store */}
      <div className={styles.topics}>
        {progress.unlocked.map((topic: string) => (
          <div key={topic} className={styles.topicUnlocked}>
            <span
              className={styles.topicIcon}
              style={{ color: definition.color }}
            >
              ✔
            </span>
            <span>{topic}</span>
          </div>
        ))}
        {progress.locked.map((topic: string) => (
          <div key={topic} className={styles.topicLocked}>
            <span className={styles.topicIcon}>▣</span>
            <span>{topic}</span>
          </div>
        ))}
      </div>

      {/* Locked badge */}
      {isLocked && definition.dependencies.length > 0 && (
        <div className={styles.topicLocked}>
          <span className={styles.topicIcon}>🔒</span>
          <span>Requires: {definition.dependencies.join(", ")}</span>
        </div>
      )}
    </div>
  );
}
