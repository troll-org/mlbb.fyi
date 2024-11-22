import Settings from "@/app/settings/_components/settings";
import getCurrentUser from "@/lib/actions/getCurrentUser";
import { getMlbbAcc } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email || "");

  return (
    <Suspense>
      {" "}
      <Settings currentUser={currentUser} mlbbAcc={mlbbAcc} />
    </Suspense>
  );
}

export default SettingsPage;
