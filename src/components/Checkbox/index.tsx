import { CheckCircle, Circle } from "phosphor-react";

import styles from "./styles.module.scss";

interface CheckboxProps {
  checked: boolean;
  onToggleCompleteTask: () => void;
}

export function Checkbox({ checked, onToggleCompleteTask }: CheckboxProps) {
  return (
    <button className={styles.checkbox} onClick={onToggleCompleteTask}>
      {checked ? (
        <span className={styles.checked}>
          <CheckCircle size={20} weight="fill" />
        </span>
      ) : (
        <span className={styles.unchecked}>
          <Circle size={20} weight="bold" />
        </span>
      )}
    </button>
  );
}
