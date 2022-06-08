import { ChangeEvent, FormEvent, InvalidEvent, useState } from "react";
import { ClipboardText, PlusCircle } from "phosphor-react";

import { Header } from "./components/Header";

import styles from "./App.module.scss";
import { Task } from "./components/Task";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: String(Math.random()),
      title: "Adicionar novas funcionalidades no projeto Ignite Feed.",
      isCompleted: false,
    },
    {
      id: String(Math.random()),
      title: "Finalizar o primeiro módulo da trilha atualizada de ReactJS.",
      isCompleted: true,
    },
  ]);
  const [newTaskInput, setNewTaskInput] = useState<string>("");

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    const formattedNewTask: Task = {
      id: String(Math.random()),
      title: newTaskInput,
      isCompleted: false,
    };

    setTasks((prevTasks) => [formattedNewTask, ...prevTasks]);
    setNewTaskInput("");
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity("");
    setNewTaskInput(event.target.value);
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity("Esse campo é obrigatório!");
  }

  function deleteTask(taskIdToDelete: string) {
    const TasksWithoutDeletedOne = tasks.filter(
      (task) => task.id !== taskIdToDelete
    );

    setTasks(TasksWithoutDeletedOne);
  }

  function toggleCompletedTask(taskIdToToggle: string) {
    const tasksWithNewStatus = tasks.map((task) => {
      if (task.id === taskIdToToggle) {
        return { ...task, isCompleted: !task.isCompleted };
      }

      return task;
    });

    const tasksSortedByStatus = tasksWithNewStatus.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        return 0;
      }

      return b.isCompleted ? -1 : 1;
    });

    setTasks(tasksWithNewStatus);
  }

  const isNewTaskInputEmpty = newTaskInput.trim().length === 0;
  const quantityOfTasksCreated = tasks.length;
  const quantityOfTasksCompleted = tasks.filter(
    (task) => task.isCompleted
  ).length;

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.wrapper}>
          <form className={styles.taskForm} onSubmit={handleCreateNewTask}>
            <input
              placeholder="Adicione uma nova tarefa"
              type="text"
              value={newTaskInput}
              onChange={handleNewTaskChange}
              onInvalid={handleNewTaskInvalid}
              required
            />
            <button type="submit" disabled={isNewTaskInputEmpty}>
              Criar <PlusCircle size={20} />
            </button>
          </form>

          <main>
            <header>
              <div className={styles.statusText}>
                <strong className={styles.statusText__created}>
                  Tarefas criadas
                </strong>
                <span>{quantityOfTasksCreated}</span>
              </div>
              <div className={styles.statusText}>
                <strong className={styles.statusText__completed}>
                  Concluídas
                </strong>
                <span>
                  {quantityOfTasksCreated > 0
                    ? `${quantityOfTasksCompleted} de ${quantityOfTasksCreated}`
                    : 0}
                </span>
              </div>
            </header>
            <div className={styles.tasksContent}>
              {tasks.length === 0 ? (
                <div className={styles.empty}>
                  <ClipboardText size={56} />
                  <strong>Você ainda não tem tarefas cadastradas</strong>
                  <p>Crie tarefas e organize seus itens a fazer</p>
                </div>
              ) : (
                <div className={styles.tasksList}>
                  {tasks.map((task) => (
                    <Task
                      id={task.id}
                      title={task.title}
                      isCompleted={task.isCompleted}
                      onDeleteTask={deleteTask}
                      onToggleCompletedTask={toggleCompletedTask}
                    />
                  ))}
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </>
  );
}
