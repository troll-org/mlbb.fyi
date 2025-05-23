"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";
import NavLogo from "./navbar-logo";
import NavMenu from "./navbar-menu";

const Navbar: React.FC = () => {
  const { data: session, status } = useSession();
  const [currentUser, setCurrentUser] = useState<SafeUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (status === "authenticated" && session?.user?.email) {
        try {
          const response = await fetch("/api/auth/current-user");
          if (!response.ok) throw new Error("Failed to fetch user");

          const data = await response.json();
          setCurrentUser(data);
        } catch (error) {
          console.error("Error fetching current user:", error);
        }
      } else if (status === "unauthenticated") {
        setCurrentUser(null);
      }
    };

    fetchUser();
  }, [session, status]);

  return (
    <nav
      className={cn(
        "fixed inset-x-0 top-0 z-30 mx-auto w-full bg-transparent py-3 backdrop-blur-lg"
      )}
    >
      <div className="mx-auto flex max-w-[1280px] items-center justify-between px-4 md:px-8 xl:px-4 2xl:px-0">
        <NavLogo />
        <NavMenu currentUser={currentUser} />
      </div>
    </nav>
  );
};

export default Navbar;
