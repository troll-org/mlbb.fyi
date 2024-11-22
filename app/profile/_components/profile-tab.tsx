"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

import { User } from "@prisma/client";
import { Tabs, TabsTrigger, TabsList } from "../../../components/shared/tabs";

interface ProfileTabProps {
  ProfileTabList: { name: string; href: string }[];
  isExistingUser?: User | null;
  children: React.ReactNode;
}

const ProfileTab: React.FC<ProfileTabProps> = ({
  ProfileTabList,
  isExistingUser,
  children,
}) => {
  const pathname = usePathname();
  const active = pathname?.split("/")[3];
  const [selectedProfileTab, setSelectedProfileTab] = useState(active);

  return (
    <Tabs
      defaultValue="statistics"
      value={selectedProfileTab}
      className="mt-3 w-full space-y-3 md:mt-0 md:space-y-1.5"
    >
      <TabsList className="flex w-full items-center justify-center space-x-1.5 md:w-fit md:justify-start ">
        {ProfileTabList.map((item, i) => (
          <TabsTrigger
            value={item.name.toLowerCase()}
            onClick={() => setSelectedProfileTab(item.name.toLowerCase())}
            key={i}
          >
            <Link
              href={`/profile/${isExistingUser?.username + item.href}`}
              scroll={false}
            >
              {item.name}
            </Link>
          </TabsTrigger>
        ))}
      </TabsList>

      {children}
    </Tabs>
  );
};

export default ProfileTab;
