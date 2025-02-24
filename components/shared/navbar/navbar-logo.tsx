"use client";

import { useRouter } from "next/navigation";

const NavLogo = () => {
  const router = useRouter();
  return (
    <>
      <span
        onClick={() => router.push("/")}
        className="cursor-pointer font-heading text-[24px]"
      >
        mlbb.fyi
      </span>
    </>
  );
};

export default NavLogo;
