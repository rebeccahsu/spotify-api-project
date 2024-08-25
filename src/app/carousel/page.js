import TracksCarousel from "@/components/TracksCarousel";
import { cookies } from "next/headers";

export default async function TopTracksPage() {
  const token = cookies().get("access_token")?.value;
  console.log('token', token);

  return (
    <div>
      {token ? (
        <div>
          <TracksCarousel />
        </div>
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
}
