import { redirect } from "next/navigation";

export default async function WikiPage() {
  redirect("/wiki/heroes");
}
