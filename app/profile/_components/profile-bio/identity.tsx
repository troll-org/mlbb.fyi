"use client";

import Image from "next/image";

import { User } from "@prisma/client";

interface IdentityHolderProps {
  user: User | null;
  baseInfo?: {
    username: string;
    following: string[];
    followers: string[];
    name: string;
    desc: string;
  };
}

const IdentityHolder: React.FC<IdentityHolderProps> = ({ user, baseInfo }) => {
  return (
    <div>
      <div className="relative mx-auto h-[150px] w-[150px] overflow-hidden rounded-full">
        <Image
          src={
            user?.image === ""
              ? "/nana.webp"
              : user?.image?.includes("/image/upload")
              ? `${
                  user?.image?.split("/image/upload/")[0]
                }/image/upload/c_fill,h_150,w_150/${
                  user?.image?.split("/image/upload/")[1]
                }`
              : user?.image || "/nana.webp"
          }
          alt=""
          width={150}
          height={150}
          className="mx-auto h-[150px] w-[150px] bg-contain bg-center"
          placeholder="blur"
          blurDataURL={
            user?.image?.split("/image/upload/")[0] +
            "/image/upload/e_blur:400,h_100,w_100/" +
            user?.image?.split("/image/upload/")[1]
          }
        />
      </div>
      <div className="text-center">
        <span className="my-3 block font-heading text-xl">
          {baseInfo?.username}
        </span>
        <span className="px-2 block text-sm font-normal leading-4">
          {user?.desc}
        </span>
      </div>
    </div>
  );
};

export default IdentityHolder;
