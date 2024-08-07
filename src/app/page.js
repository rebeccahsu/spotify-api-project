import { cookies } from "next/headers";

export default async function HomePage() {
  const token = cookies().get("access_token")?.value;
  console.log('token', token);

  return (
    <div>
      
    </div>
  );
}
