import { useEffect, useState } from "react";
import styles from "./NotFound.module.scss";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "../../Routes/routes";

export default function NotFound() {
  const [seconds, setSeconds] = useState<number>(5);
  const navigate = useNavigate();

  useEffect(() => {
    if (seconds > 0) {
      const timeout = setTimeout(() => {
        setSeconds((prev) => prev - 1); // Decrement countdown
      }, 1000);

      return () => clearTimeout(timeout); // Cleanup timeout
    } else {
      // Navigate after countdown ends
      navigate(ROUTES.LOGIN);
    }
  }, [seconds, navigate]);

  return (
    <div className={styles.container}>
      <div className={styles.error}>
        <h1 className={styles.main}>404 not found</h1>
        <h1>You will be redirected to the login page in {seconds}...</h1>
      </div>
    </div>
  );
}
