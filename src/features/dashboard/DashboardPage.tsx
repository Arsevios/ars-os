import { useEffect, useRef, useState } from "react";
import { useAppStore } from "../../store/appStore";
import type { DayTask, Pomodoro } from "../../store/appStore";
import styles from "./DashboardPage.module.css";

function formatTime(seconds: number) {
  const m = Math.floor(seconds / 60).toString().padStart(2, "0");
  const s = (seconds % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

function greeting(name: string) {
  const h = new Date().getHours();
  if (h < 6) return `Ещё ночь, ${name}`;
  if (h < 12) return `Доброе утро, ${name}`;
  if (h < 18) return `Добрый день, ${name}`;
  return `Добрый вечер, ${name}`;
}

const SKILL_COLORS: Record<string, string> = {
  sql: "#6d28d9",
  "rest-api": "#0891b2",
  english: "#059669",
  linkedin: "#0a66c2",
  bpmn: "#b45309",
  jira: "#1d4ed8",
};

export default function DashboardPage() {
  const {
    name, title, level, totalXP, todayXP, todayCoins,
    xpGoalToday, coinsGoalToday, streak,
    dayTasks, session, skills,
    completePomodoro, startPomodoro, tickTimer, endSession,
    resetDayIfNeeded,
  } = useAppStore();

  const [activeTask, setActiveTask] = useState<string | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    resetDayIfNeeded();
  }, []);

  useEffect(() => {
    if (session.active) {
      timerRef.current = setInterval(() => tickTimer(), 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [session.active]);

  const completedTasks = dayTasks.filter((t) => t.completed).length;
  const xpPct = Math.min((todayXP / xpGoalToday) * 100, 100);
  const coinsPct = Math.min((todayCoins / coinsGoalToday) * 100, 100);

  return (
    <div className={styles.page}>
      {/* HEADER ROW */}
      <div className={styles.top}>
        <div>
          <h1 className={styles.greeting}>{greeting(name)}</h1>
          <p className={styles.subtitle}>
            {title} · Lv.{level} · Day {streak} · {completedTasks}/{dayTasks.length} tasks done
          </p>
        </div>
        <div className={styles.coins}>
          <span className={styles.coinIcon}>◈</span>
          <span>{todayCoins} / {coinsGoalToday}</span>
        </div>
      </div>

      {/* XP BAR */}
      <div className={styles.xpRow}>
        <div className={styles.xpMeta}>
          <span>XP сегодня</span>
          <span>{todayXP} / {xpGoalToday}</span>
        </div>
        <div className={styles.barOuter}>
          <div className={styles.barInner} style={{ width: `${xpPct}%` }} />
        </div>
      </div>

      {/* POMODORO TIMER */}
      {session.active && (
        <div className={styles.timerCard}>
          <div className={styles.timerPhase}>
            {session.phase === "work" ? "🍅 Помодоро" : session.phase === "short-break" ? "☕ Короткий перерыв" : "🌿 Длинный перерыв"}
          </div>
          <div className={styles.timerDisplay}>{formatTime(session.secondsLeft)}</div>
          <div className={styles.timerCycles}>Циклов завершено: {session.completedCycles}</div>
          <div className={styles.timerActions}>
            {session.phase === "work" && session.taskId && session.pomodoroId && (
              <button
                className={styles.btnComplete}
                onClick={() => completePomodoro(session.taskId!, session.pomodoroId!)}
              >
                ✓ Завершить и получить XP
              </button>
            )}
            <button className={styles.btnStop} onClick={endSession}>✕ Стоп</button>
          </div>
        </div>
      )}

      {/* TASKS */}
      <div className={styles.tasks}>
        {dayTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            color={SKILL_COLORS[task.skillId] ?? "#6d28d9"}
            expanded={activeTask === task.id}
            onToggle={() => setActiveTask(activeTask === task.id ? null : task.id)}
            onStart={startPomodoro}
            onComplete={completePomodoro}
            sessionActive={session.active}
            sessionPomoId={session.pomodoroId}
          />
        ))}
      </div>
    </div>
  );
}

function TaskCard({
  task, color, expanded, onToggle, onStart, onComplete, sessionActive, sessionPomoId,
}: {
  task: DayTask;
  color: string;
  expanded: boolean;
  onToggle: () => void;
  onStart: (taskId: string, pomoId: string) => void;
  onComplete: (taskId: string, pomoId: string) => void;
  sessionActive: boolean;
  sessionPomoId: string | null;
}) {
  const done = task.pomodoros.filter((p) => p.completed).length;
  const total = task.pomodoros.length;
  const pct = (done / total) * 100;

  return (
    <div className={`${styles.taskCard} ${task.completed ? styles.taskDone : ""}`}
      style={{ borderLeftColor: color }}>
      <div className={styles.taskHeader} onClick={onToggle}>
        <div className={styles.taskLeft}>
          <div className={styles.taskCheck} style={{ borderColor: color, background: task.completed ? color : "transparent" }}>
            {task.completed && <span>✓</span>}
          </div>
          <div>
            <div className={styles.taskTitle}>{task.title}</div>
            <div className={styles.taskMeta}>
              {done}/{total} помодоро · +{task.xpReward} XP · +{task.coinsReward} ◈
            </div>
          </div>
        </div>
        <div className={styles.taskRight}>
          <div className={styles.miniBar}>
            <div className={styles.miniFill} style={{ width: `${pct}%`, background: color }} />
          </div>
          <span className={styles.chevron}>{expanded ? "▲" : "▼"}</span>
        </div>
      </div>

      {expanded && (
        <div className={styles.pomodoros}>
          {task.pomodoros.map((pomo, i) => (
            <PomodoroRow
              key={pomo.id}
              pomo={pomo}
              index={i}
              color={color}
              taskId={task.id}
              onStart={onStart}
              onComplete={onComplete}
              sessionActive={sessionActive}
              isCurrentSession={sessionPomoId === pomo.id}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PomodoroRow({
  pomo, index, color, taskId, onStart, onComplete, sessionActive, isCurrentSession,
}: {
  pomo: Pomodoro;
  index: number;
  color: string;
  taskId: string;
  onStart: (taskId: string, pomoId: string) => void;
  onComplete: (taskId: string, pomoId: string) => void;
  sessionActive: boolean;
  isCurrentSession: boolean;
}) {
  return (
    <div className={`${styles.pomoRow} ${pomo.completed ? styles.pomoCompleted : ""} ${isCurrentSession ? styles.pomoActive : ""}`}>
      <div className={styles.pomoNum} style={{ background: pomo.completed ? color : "transparent", borderColor: color }}>
        {pomo.completed ? "✓" : index + 1}
      </div>
      <div className={styles.pomoContent}>
        <p className={styles.pomoInstruction}>{pomo.instruction}</p>
        {pomo.resource && (
          <a className={styles.pomoResource} href={pomo.resourceUrl} target="_blank" rel="noreferrer">
            ↗ {pomo.resource}
          </a>
        )}
        <div className={styles.pomoMeta}>
          🍅 {pomo.duration} мин · +{pomo.xpReward} XP · +{pomo.coinsReward} ◈
        </div>
      </div>
      {!pomo.completed && (
        <div className={styles.pomoActions}>
          {!sessionActive && (
            <button className={styles.btnStart} style={{ background: color }} onClick={() => onStart(taskId, pomo.id)}>
              ▶ Старт
            </button>
          )}
          <button className={styles.btnDone} onClick={() => onComplete(taskId, pomo.id)}>
            ✓
          </button>
        </div>
      )}
    </div>
  );
}