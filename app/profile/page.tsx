import getCurrentUser from "@/lib/actions/getCurrentUser";
import { redirect } from "next/navigation";

const Page = async () => {
  const currentUser = await getCurrentUser();
  redirect(currentUser ? `/profile/${currentUser.name}` : "/auth/signin");
};

export default Page;
