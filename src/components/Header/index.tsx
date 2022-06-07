import styles from "./styles.module.scss";

import todoLogo from "../../assets/todo-logo.svg";

export function Header() {
  return (
    <div className={styles.container}>
      <header>
        <img src={todoLogo} alt="Logotipo do ToDo" />
      </header>
    </div>
  );
}
