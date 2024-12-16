import styles from "./Logo.module.scss";
import expensesLogo from "../../assets/images/expensesLogo.png";

export default function Logo() {
  return (
    <div className={styles.expensesContainer}>
      <img className={styles.expensesLogo} src={expensesLogo} alt="logo" />
    </div>
  );
}
