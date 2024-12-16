import styles from "./Error.module.scss";
export default function Error({
  errorMessage,
}: {
  errorMessage: string | undefined;
}) {
  return (
    <>{errorMessage && <span className={styles.error}>{errorMessage}</span>}</>
  );
}
