import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

const Page = async () => {
  const currentUser = await getCurrentUser();

  redirect(
    currentUser
      ? currentUser.name
        ? `/profile/${currentUser.name}/statistics`
        : "/settings"
      : "/auth/signin"
  );
};

export default Page;
