import { Trash } from "phosphor-react";
import { Checkbox } from "../Checkbox";
import styles from "./styles.module.scss";

interface TaskProps {
  id: string;
  title: string;
  isCompleted: boolean;
  onToggleCompletedTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
}

export function Task({
  id,
  title,
  isCompleted,
  onToggleCompletedTask,
  onDeleteTask,
}: TaskProps) {
  function handleToggleCompletedTask() {
    onToggleCompletedTask(id);
  }

  function handleDeleteTask() {
    onDeleteTask(id);
  }

  return (
    <div className={styles.container}>
      <Checkbox
        checked={isCompleted}
        onToggleCompleteTask={handleToggleCompletedTask}
      />

      <span className={isCompleted ? styles.completed : ""}>{title}</span>
      <button className={styles.buttonTrash}>
        <Trash size={16} onClick={handleDeleteTask} />
      </button>
    </div>
  );
}
