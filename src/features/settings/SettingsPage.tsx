import { useState } from "react";
import { useAppStore } from "../../store/appStore";
import type { Goal } from "../../store/appStore";
import styles from "./SettingsPage.module.css";

export default function SettingsPage() {
  const { goals, updateGoal, addGoal, removeGoal } = useAppStore();
  const [newCategory, setNewCategory] = useState("");
  const [newMinutes, setNewMinutes] = useState(30);
  const [newXpPerMin, setNewXpPerMin] = useState(0.5);
  const [newPriority, setNewPriority] = useState(2);

  const handleAdd = () => {
    const cat = newCategory.trim().toLowerCase();
    if (!cat) return;
    const goal: Goal = {
      category: cat,
      dailyMinutes: newMinutes,
      xpPerMinute: newXpPerMin,
      priority: newPriority,
    };
    addGoal(cat, goal);
    setNewCategory("");
    setNewMinutes(30);
    setNewXpPerMin(0.5);
    setNewPriority(2);
  };

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Настройки целей</h1>
      <p className={styles.subtitle}>Здесь можно настроить ежедневные занятия и приоритеты</p>

      <div className={styles.grid}>
        {Object.entries(goals).map(([cat, goal]) => (
          <div key={cat} className={styles.goalCard}>
            <div className={styles.goalHeader}>
              <h3>{cat}</h3>
              <button
                className={styles.removeBtn}
                onClick={() => removeGoal(cat)}
              >
                ✕
              </button>
            </div>
            <div className={styles.field}>
              <label>Минут в день</label>
              <input
                type="number"
                value={goal.dailyMinutes}
                onChange={(e) =>
                  updateGoal(cat, { dailyMinutes: +e.target.value })
                }
                min={5}
                max={120}
              />
            </div>
            <div className={styles.field}>
              <label>XP за минуту</label>
              <input
                type="number"
                value={goal.xpPerMinute}
                onChange={(e) =>
                  updateGoal(cat, { xpPerMinute: +e.target.value })
                }
                step={0.1}
                min={0.1}
                max={2}
              />
            </div>
            <div className={styles.field}>
              <label>Приоритет (1-3)</label>
              <input
                type="number"
                value={goal.priority}
                onChange={(e) =>
                  updateGoal(cat, { priority: +e.target.value })
                }
                min={1}
                max={3}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Добавление новой цели */}
      <div className={styles.addCard}>
        <h3>Добавить цель</h3>
        <div className={styles.addForm}>
          <input
            placeholder="Категория (например, sql)"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <input
            type="number"
            placeholder="Минут в день"
            value={newMinutes}
            onChange={(e) => setNewMinutes(+e.target.value)}
          />
          <input
            type="number"
            placeholder="XP за минуту"
            value={newXpPerMin}
            onChange={(e) => setNewXpPerMin(+e.target.value)}
            step={0.1}
          />
          <input
            type="number"
            placeholder="Приоритет"
            value={newPriority}
            onChange={(e) => setNewPriority(+e.target.value)}
            min={1}
            max={3}
          />
          <button onClick={handleAdd}>Добавить</button>
        </div>
      </div>
    </div>
  );
}