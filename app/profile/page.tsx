import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";

const Page = async () => {
  const currentUser = await getCurrentUser();
  redirect(
    currentUser
      ? currentUser.name 
        ? `/profile/${currentUser.name}`
        : "/settings"
      : "/auth/signin"
  );

};

export default Page;
