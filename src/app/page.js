import { cookies } from "next/headers";
import TracksCarousel from "@/components/TracksCarousel";
import styles from "./page.module.scss";

export default async function HomePage() {
  const token = cookies().get("access_token")?.value;
  console.log('token', token);

  return (
    <div className={styles.pageContainer}>
      {token ? (
        <div>
          <h1 className={styles.pageTitle}>
            YOUR TOP 5 TRACKS
          </h1>
          <TracksCarousel />
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
}
