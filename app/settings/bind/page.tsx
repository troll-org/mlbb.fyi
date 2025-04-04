import { getCurrentUser } from "@/lib/actions/user";
import SyncForm from "@/app/settings/_components/bind-form";
import { getMlbbAcc } from "@/lib/actions/user";
import Prompt from "@/components/shared/prompt";

export default async function AppBind() {
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
        <span className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Bind
        </span>
        <p className="pt-3 text-[16px] md:text-[16px]">
          Securely bind your Mobile Legends account
        </p>
        <div className="flex flex-col items-center justify-center">
          <div className="flex items-end justify-center">
            <p className="w-fit text-center text-[12px] text-neutral-500">
              Please ensure that you have never bind this account with us
            </p>
          </div>
        </div>
        <SyncForm currentUser={currentUser} />
      </div>
    </div>
  );
}
