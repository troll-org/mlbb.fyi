"use client";

import React, { useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { LogOutIcon, PersonStandingIcon, Settings } from "lucide-react";

import { cn } from "@/lib/utils";
import { SafeUser } from "@/types";

import Close from "../icons/close";
import Burger from "../icons/burger";
import { Button } from "../button";
import { signOut } from "next-auth/react";
import Link from "next/link";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/shared/command";
import { wikiQuickLinks } from "@/lib/configs/wiki-links";

interface NavMenuProps {
  currentUser?: SafeUser | null;
}

const MenuList = [
  {
    name: "Wiki",
    active: false,
    href: "/wiki",
  },
  {
    name: "Explore",
    active: false,
    href: "/explore",
  },
  {
    name: "Profile",
    active: false,
    href: `/profile`,
  },
];

const NavMenu: React.FC<NavMenuProps> = ({ currentUser }) => {
  const router = useRouter();
  const pathname = usePathname();

  const [collapse, setCollapse] = useState(false);
  const isOwnProfile =
    pathname?.split("/")[1] === "profile" &&
    pathname?.split("/")[2] === currentUser?.username;
  const pathArray = pathname?.split("/");
  const active =
    pathArray?.[1] === "profile" && isOwnProfile
      ? pathArray?.[1]
      : pathArray?.[1] === "profile" && !isOwnProfile
      ? "explore"
      : pathArray?.[1] !== "wiki" &&
        pathArray?.[1] !== "explore" &&
        pathArray?.[1] !== "profile"
      ? ""
      : pathArray?.[1];

  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  return (
    <>
      <div className="flex flex-row items-center justify-between gap-4">
        {!currentUser && (
          <div className="block md:hidden md:items-center">
            <Button
              onClick={() => {
                router.push("/auth/signin");
              }}
              className="flex h-6 w-[72px] rounded-2xl p-2"
              variant="gradiantNavy"
            >
              <span className="stroke-[3] text-[16px] text-cloud">Sign In</span>
            </Button>
          </div>
        )}
        <div
          className={cn(
            "flex cursor-pointer md:hidden",
            "transition-transform duration-200"
          )}
          onClick={() => {
            setCollapse(!collapse);
          }}
        >
          {collapse ? <Close /> : <Burger />}
        </div>
      </div>

      <div
        className={cn(
          "md:static md:flex md:h-auto md:bg-transparent",
          collapse
            ? "fixed inset-0 top-[54px] z-10 h-screen bg-deepocean/80"
            : "hidden"
        )}
      >
        <CommandDialog open={open} onOpenChange={setOpen}>
          <CommandInput placeholder="Search heroes..." />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Heroes">
              {wikiQuickLinks[0].subItems?.map((hero) => (
                <CommandItem key={hero.path} asChild>
                  <Link href={hero.path} className="text-cloud">
                    <PersonStandingIcon />
                    {hero.label}
                  </Link>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </CommandDialog>

        <ul
          className={cn(
            "md:flex md:flex-row",
            "items-center ",
            collapse ? "flex flex-col gap-y-4 font-semibold" : "hidden"
          )}
        >
          {MenuList.map((menu) => {
            if (menu.name === "Profile" && !currentUser) {
              return null;
            }
            return (
              <li
                key={menu.name}
                onClick={() => {
                  setCollapse(false);
                }}
              >
                <Link
                  href={
                    menu.href === "/profile"
                      ? currentUser?.username
                        ? `/profile/${currentUser?.username}/statistics`
                        : "/settings"
                      : menu.href
                  }
                  className={cn(
                    "px-3 py-2 font-medium text-cloud/50 hover:text-cloud hover:transition-all hover:duration-150",
                    active === menu.name.toLowerCase() &&
                      "underline:ease-in-out text-cloud underline decoration-2 underline-offset-4"
                  )}
                >
                  {menu.name}
                </Link>
              </li>
            );
          })}

          {!currentUser ? (
            <li>
              <Button
                onClick={() => {
                  router.push("/auth/signin");
                  setCollapse(!collapse);
                }}
                className="hidden h-6 w-[72px] rounded-2xl p-2 md:flex"
                variant="gradiantNavy"
              >
                <span className="stroke-[3] text-[16px] text-cloud">
                  Sign In
                </span>
              </Button>
            </li>
          ) : (
            <li className="flex gap-2">
              <Button
                onClick={() => {
                  if (currentUser) {
                    router.push("/settings");
                    setCollapse(!collapse);
                  }
                }}
                className="group h-8 w-8 rounded-full p-2"
                variant="gradiantNavy"
              >
                <Settings className="stroke-[3] text-cloud group-hover:rotate-180 group-hover:transition-all group-hover:duration-500" />
              </Button>
              <Button
                onClick={() => {
                  setCollapse(!collapse);
                  signOut({ callbackUrl: "/" });
                }}
                className="h-8 w-8 rounded-full p-2"
                variant="gradiantNavy"
              >
                <LogOutIcon className="stroke-[3] text-cloud" />
              </Button>
            </li>
          )}
        </ul>
      </div>
    </>
  );
};

export default NavMenu;
