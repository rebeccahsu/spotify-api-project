import TopTracks from "@/components/TopTracks";
import { cookies } from "next/headers";
import Link from "next/link";
import styles from "./page.module.scss";

export default async function HomePage() {
  const token = cookies().get("access_token")?.value;
  console.log('token', token);

  return (
    <div className={styles.pageContainer}>
      {token ? (
        <div>
          <Link
            href="/top-tracks"
          >
            Top Tracks
          </Link>
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
}
