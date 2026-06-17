import { useEffect } from "react";
import { useAppStore } from "../../store/appStore";
import styles from "./DashboardPage.module.css";

function getGreeting(name: string) {
  const hour = new Date().getHours();
  if (hour < 6) return `Доброй ночи, ${name}`;
  if (hour < 12) return `Доброе утро, ${name}`;
  if (hour < 18) return `Добрый день, ${name}`;
  return `Добрый вечер, ${name}`;
}

export default function DashboardPage() {
  const {
    name,
    level,
    xp,
    dailyPlan,
    planDate,
    generatePlan,
    completeTask,
    recentActivities,
    currentMission,
  } = useAppStore();

  // При монтировании генерируем план на сегодня, если его нет
  useEffect(() => {
    generatePlan();
  }, [generatePlan]);

  const xpProgress = xp % 100;
  const completedCount = dailyPlan.filter((t) => t.completed).length;
  const totalCount = dailyPlan.length;

  return (
    <div className={styles.wrapper}>
      {/* Приветствие */}
      <section className={styles.greeting}>
        <h1 className={styles.title}>{getGreeting(name)}</h1>
        <p className={styles.subtitle}>
          {totalCount > 0
            ? `Сегодня ${new Date().toLocaleDateString("ru-RU", {
                day: "numeric",
                month: "long",
              })} · План: ${completedCount}/${totalCount}`
            : "План на сегодня не сгенерирован"}
        </p>
      </section>

      {/* XP и уровень */}
      <section className={styles.levelCard}>
        <div className={styles.levelHeader}>
          <span className={styles.levelBadge}>Уровень {level}</span>
          <span className={styles.xpValue}>{xp} XP</span>
        </div>
        <div className={styles.progressBar}>
          <div
            className={styles.progressFill}
            style={{ width: `${xpProgress}%` }}
          ></div>
        </div>
        <p className={styles.progressHint}>
          До следующего уровня: {100 - xpProgress} XP
        </p>
      </section>

      {/* План на день */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>📅 План на сегодня</h3>
        {dailyPlan.length === 0 ? (
          <p className={styles.emptyPlan}>План пока не сгенерирован. Нажмите "Обновить план"</p>
        ) : (
          <ul className={styles.planList}>
            {dailyPlan.map((task) => (
              <li
                key={task.id}
                className={`${styles.taskItem} ${task.completed ? styles.taskCompleted : ""}`}
              >
                <div className={styles.taskTime}>
                  {task.timeSlot}
                </div>
                <div className={styles.taskContent}>
                  <div className={styles.taskHeader}>
                    <span className={styles.taskTitle}>{task.title}</span>
                    <span className={styles.taskXp}>+{task.xp} XP</span>
                  </div>
                  <p className={styles.taskDesc}>{task.description}</p>
                  <span className={styles.taskDuration}>
                    ⏱ {task.durationMinutes} мин
                  </span>
                </div>
                {!task.completed && (
                  <button
                    className={styles.completeButton}
                    onClick={() => completeTask(task.id)}
                  >
                    ✓
                  </button>
                )}
                {task.completed && <span className={styles.completedMark}>✓</span>}
              </li>
            ))}
          </ul>
        )}
      </section>

      {/* Текущая миссия */}
      <section className={styles.card}>
        <h3 className={styles.cardTitle}>🏆 Текущая миссия</h3>
        <p className={styles.missionText}>{currentMission}</p>
      </section>

      {/* Последняя активность */}
      {recentActivities.length > 0 && (
        <section className={styles.card}>
          <h3 className={styles.cardTitle}>🕒 Недавняя активность</h3>
          <ul className={styles.activityList}>
            {recentActivities.slice(0, 5).map((act) => (
              <li key={act.id} className={styles.activityItem}>
                <span>{act.text}</span>
                <span className={styles.activityXp}>+{act.xp} XP</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}