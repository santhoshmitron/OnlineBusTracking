import { redirect } from "next/navigation";

export default function Home() {
  // Redirect to the send page directly
  redirect("/send");
}
