import Settings from "@/app/settings/_components/settings";
import { getCurrentUser } from "@/lib/actions/user";
import { getMlbbAcc } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";

async function SettingsPage() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email || "");

  if (!currentUser) redirect("/auth/signin");

  return (
    <main>
      <Suspense>
        <Settings currentUser={currentUser} mlbbAcc={mlbbAcc} />
      </Suspense>
    </main>
  );
}

export default SettingsPage;
