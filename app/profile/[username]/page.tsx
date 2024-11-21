"use client";;
import { use } from "react";

import { useRouter } from "next/navigation";

export default function ProfilePage(
  props: {
    params: Promise<{ username: string }>;
  }
) {
  const params = use(props.params);
  const router = useRouter();
  const profileUsername = params.username;

  if (typeof window !== "undefined") {
    router.push(`/profile/${profileUsername}/statistics`);
  }

  return null;
}
