import { getCsrfToken } from "next-auth/react";
import LoginForm from "@/app/auth/signin/_components/login-form";
import { getCurrentUser } from "@/lib/actions/user";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { Metadata } from "next";
import { defaultOpenGraphMD, defaultTwitterMD } from "@/lib/configs/metadata";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to mlbb.fyi",
  openGraph: {
    title: "Sign in",
    description: "Sign in to mlbb.fyi",
    url: "https://mlbb.fyi/auth/signin",
    ...defaultOpenGraphMD,
  },
  twitter: {
    title: "Sign in",
    description: "Sign in to mlbb.fyi",
    ...defaultTwitterMD,
  },
};

export default async function Signin() {
  const csrfToken = await getCsrfToken();
  const currentUser = await getCurrentUser();

  if (currentUser) {
    redirect("/explore");
  }

  return (
    <main className="mt-60 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
          Sign in
        </h1>
        <p className="pt-3 text-[16px] md:text-[16px]">
          Join the community and dominate the battlefield!
        </p>
        <Suspense>
          <LoginForm csrfToken={csrfToken} />
        </Suspense>
      </div>
    </main>
  );
}
