import { cookies } from "next/headers";
import { getUserTopTracks } from "@/lib/spotify";
import TopTracksBar from "@/components/TopTracksBar";

async function getTopTracks() {
  const data = await getUserTopTracks({ limit: 20 });
  return data;
}

export default async function TopTracksPage() {
  const token = cookies().get("access_token")?.value;
  const topTracks = await getTopTracks();

  return (
    <div>
      {token ? (
        <TopTracksBar topTracks={topTracks} />
      ) : (
        <h1>Not logged in</h1>
      )}
    </div>
  );
}