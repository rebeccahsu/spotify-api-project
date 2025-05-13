import { cookies } from "next/headers";
import TracksCarousel from "@/components/TracksCarousel";
import styles from "./page.module.scss";

export default async function HomePage() {
  const token = cookies().get("access_token")?.value;

  return (
    <div className={styles.pageContainer}>
      <div>
        <h1 className={styles.pageTitle}>
          YOUR TOP 5 TRACKS
        </h1>

        {token ? (
          <TracksCarousel />
        ) : (
          <div className={styles.loginHintContainer}>
            <h5 className={styles.loginHint}>
              Please login to view.
            </h5>
          </div>
        )}
      </div>
    </div>
  );
}
