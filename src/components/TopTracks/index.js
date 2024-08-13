import { getUserTopTracks } from "@/lib/spotify";
import TopTracksView from "./TopTracksView";

async function getTopFiveTracks() {
  const data = await getUserTopTracks({ limit: 5 });
  return data;
}

export default async function TopTracks() {
  const data = await getTopFiveTracks();

  return (
    <TopTracksView initialData={data} />
  )
}