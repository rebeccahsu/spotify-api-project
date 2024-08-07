import { getApod } from "@/lib/nasa";
import axios from "axios";
import Image from "next/image";

async function fetchApod() {
  try {
    const res = await getApod();
    return res;
  } catch (error) {
    console.error('Error fetching APOD:', error);
  }
};

export default async function ApodPage() {
  const data = await fetchApod();

  console.log('data:', data);

  return (
    <div>
      <p>
        {data.date}
      </p>

      <h1>
        {data.title}
      </h1>

      <h4>
        {data.explanation}
      </h4>

      <div>
        <Image
          src={data.hdurl}
          alt={data.title}
          layout="intrinsic"
          width={400}
          height={400}
        />
      </div>
    </div>
  );
}
