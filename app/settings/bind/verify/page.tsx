import getCurrentUser from "@/lib/actions/getCurrentUser";
import { getMlbbAcc } from "@/lib/actions/user";

import CodeForm from "@/app/settings/_components/code-form";
import Prompt from "@/components/shared/prompt";

export default async function AppBindVerify() {
  const currentUser = await getCurrentUser();
  const mlbbAcc = await getMlbbAcc(currentUser?.email);
  if (mlbbAcc) {
    return (
      <Prompt
        message="You have previously bound your Mobile Legends account"
        link="/settings"
        button="Back to settings"
      />
    );
  } else if (!currentUser) {
    return (
      <Prompt
        message="Please sign in first"
        link="/auth/signin"
        button="Go to sign-in page"
      />
    );
  }
  return (
    <div className="mt-60">
      <div className="text-center">
        <CodeForm currentUser={currentUser} />
      </div>
    </div>
  );
}
