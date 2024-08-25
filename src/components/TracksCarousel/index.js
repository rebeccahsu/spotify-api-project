import { getUserTopTracks } from "@/lib/spotify";
import TracksCarouselView from "./TracksCarouselView";

async function getTopFiveTracks() {
  const data = await getUserTopTracks({ limit: 5 });
  return data;
}

export default async function TracksCarousel() {
  const data = await getTopFiveTracks();

  return (
    <TracksCarouselView initialData={data} />
  )
}