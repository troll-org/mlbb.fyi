"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { User } from "@prisma/client";
import { GradiantCard } from "@/components/shared/gradiant-card";
import { RotateCcw } from "lucide-react";
import LoadingDots from "@/components/shared/icons/loading-dots";

interface RandomUserProps {
  randomUsers: User[];
}

const RandomUser: React.FC<RandomUserProps> = ({ randomUsers }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [newRandomUsers, setRandomUsers] = useState(randomUsers);

  async function handleGenerateRandom(
    e: React.MouseEvent<SVGSVGElement, MouseEvent>
  ) {
    e.preventDefault();
    setLoading(true);
    const get = await fetch("/api/explore/getRandomUser");
    const json = await get.json();
    if (!get.ok) {
      setLoading(false);
    } else {
      setLoading(false);
      setRandomUsers(json.users);
    }
  }

  return (
    <GradiantCard
      className="sticky top-[3.75rem] hidden h-full max-h-[90vh] max-w-[360px] rounded-3xl lg:block"
      variant="clean"
    >
      <div className="flex items-center justify-between">
        <h2 className="font-heading text-xl font-bold tracking-wide">
          Connect with others
        </h2>
        <button disabled={loading}>
          {loading ? (
            <>
              <LoadingDots color="#FAFAFA" />
            </>
          ) : (
            <RotateCcw
              className="transition-all ease-in-out hover:text-sea hover:duration-300 "
              onClick={async (e) => {
                handleGenerateRandom(e);
              }}
            />
          )}
        </button>
      </div>
      <ul className="mt-3 flex flex-col gap-3">
        {newRandomUsers.length !== 0 ? (
          newRandomUsers.map((user) => (
            <li key={user.id} className="flex gap-3">
              <Image
                src={user.image || "/nana.webp"}
                alt={(user.name as string) || "User Avatar"}
                width={48}
                height={48}
                className="h-12 w-12 rounded-full"
              />
              <div className="-space-y-1">
                <Link
                  className="cursor-pointer duration-300 hover:underline hover:decoration-white hover:underline-offset-2"
                  href={`/profile/${user.username}/statistics`}
                  target="_blank"
                >
                  {user.username}
                </Link>
                <p className=" text-gray-500">{user.name}</p>
              </div>
            </li>
          ))
        ) : (
          <p className="font-sat">Please refresh to get users</p>
        )}
      </ul>
    </GradiantCard>
  );
};

export default RandomUser;
