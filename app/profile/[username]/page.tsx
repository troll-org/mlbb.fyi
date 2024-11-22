import { redirect } from "next/navigation";

export default async function ProfilePage(props: {
  params: Promise<{ username: string }>;
}) {
  const params = await props.params;
  const profileUsername = params.username;

  redirect(`/profile/${profileUsername}/statistics`);
}
