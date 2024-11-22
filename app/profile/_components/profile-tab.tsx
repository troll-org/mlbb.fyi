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
      className="mt-4 w-full space-y-4 md:mt-0 md:space-y-1.5"
    >
      <div className="flex justify-center md:justify-start">
        <TabsList className="flex items-baseline  space-x-1 ">
          {ProfileTabList.map((item, i) => (
            <Link
              href={`/profile/${isExistingUser?.username + item.href}`}
              key={i}
              scroll={false}
            >
              <TabsTrigger
                value={item.name.toLowerCase()}
                onClick={() => setSelectedProfileTab(item.name.toLowerCase())}
              >
                {item.name}
              </TabsTrigger>
            </Link>
          ))}
        </TabsList>
      </div>

      {children}
    </Tabs>
  );
};

export default ProfileTab;
