import styles from "./CheckboxStyles.module.css";

export default function Checkbox({ checked, onChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className={`${styles.checkbox} ${styles.rounded}`}
    />
  );
}
