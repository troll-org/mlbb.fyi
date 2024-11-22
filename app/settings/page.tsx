import Settings from "@/app/settings/_components/settings";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { getMlbbAcc } from "@/lib/actions/user";
import { redirect } from "next/navigation";

async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email || "");

  return <Settings currentUser={currentUser} mlbbAcc={mlbbAcc} />;
}

export default SettingsPage;
