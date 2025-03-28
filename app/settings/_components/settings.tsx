"use client";

import { toast } from "sonner";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CheckCircle, UserCog, XCircle } from "lucide-react";

import Image from "next/image";
import { cn } from "@/lib/utils";

import { SafeUser } from "@/types";
import { Input } from "../../../components/shared/input";
import { Button } from "../../../components/shared/button";
import { Label } from "../../../components/shared/label";
import LoadingDots from "../../../components/shared/icons/loading-dots";
import { MlbbAcc } from "@prisma/client";
import EditPicture from "./edit-picture";
import DialogFit from "../../../components/shared/dialog-fit";
import { revalPath } from "@/lib/revalidate";

interface ISettings {
  currentUser?: SafeUser | null;
  mlbbAcc?: MlbbAcc | null;
}

const Settings: React.FC<ISettings> = ({ currentUser, mlbbAcc }) => {
  const params = useSearchParams();
  const router = useRouter();

  const [username, setUsername] = useState(currentUser?.username || "");
  const [description, setDescription] = useState(currentUser?.desc || "");
  const [link1, setLink1] = useState(currentUser?.links[0] || "");
  const [link2, setLink2] = useState(currentUser?.links[1] || "");
  const [link3, setLink3] = useState(currentUser?.links[2] || "");

  const [loading, setLoading] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false);
  const [characterCount, setCharacterCount] = useState(
    currentUser?.desc ? currentUser.desc.length : 0
  );
  const [buttonDisabled, setButtonDisabled] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push("/auth/signin");
    }
  }, [currentUser]);

  if (!currentUser) {
    return null;
  }

  useEffect(() => {
    if (currentUser?.username && params?.get("r") === "signin") {
      router.push("/explore");
    }
  }, []);

  return (
    <div>
      <h1 className="text-center font-heading text-3xl font-bold">
        Profile Settings
      </h1>
      <div className="mx-auto max-w-md">
        <div className="mb-4 flex justify-center">
          <Button
            className="h-fit w-fit gap-2 rounded-2xl py-1"
            onClick={() => {
              router.push("/settings/bind");
            }}
            disabled={mlbbAcc ? true : false}
          >
            Mobile Legends Account
            {mlbbAcc ? (
              <>
                <span>{`: ${mlbbAcc.accId} (${mlbbAcc.nickname})`}</span>
                <CheckCircle
                  className={cn(
                    "h-4 w-4",
                    mlbbAcc ? "text-green-500" : "text-red-500"
                  )}
                />
              </>
            ) : (
              <XCircle
                className={cn(
                  "h-4 w-4",
                  mlbbAcc ? "text-green-500" : "text-red-500"
                )}
              />
            )}
          </Button>
        </div>
        <form className="flex w-full flex-col gap-3">
          <div className="relative mx-auto h-[150px] w-[150px] overflow-hidden rounded-full">
            <Image
              src={
                currentUser?.image === ""
                  ? "/nana.webp"
                  : currentUser?.image?.includes("/image/upload")
                  ? `${
                      currentUser?.image?.split("/image/upload/")[0]
                    }/image/upload/c_fill,h_150,w_150/${
                      currentUser?.image?.split("/image/upload/")[1]
                    }`
                  : currentUser?.image || "/nana.webp"
              }
              alt=""
              width={150}
              height={150}
              className="mx-auto mb-4 h-[150px] w-[150px] items-center bg-contain bg-center"
              placeholder="blur"
              blurDataURL={
                currentUser?.image?.split("/image/upload/")[0] +
                "/image/upload/e_blur:400,h_100,w_100/" +
                currentUser?.image?.split("/image/upload/")[1]
              }
            />
          </div>

          <DialogFit
            title="Choose profile picture (Max 5 MB)"
            triggerChild={
              <div className="flex cursor-pointer flex-row items-center justify-center gap-2">
                <UserCog
                  width={16}
                  height={16}
                  className="h-4 w-4"
                  color="#c0e6ff"
                />
                <p className="text-bold mt-1 text-sm hover:underline">
                  Edit profile picture
                </p>
              </div>
            }
          >
            <EditPicture currentUser={currentUser} />
          </DialogFit>

          <div className="space-y-1">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              placeholder="Email"
              value={currentUser?.email}
              id="email"
              disabled
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              type="text"
              placeholder="Username"
              onChange={(e) => setUsername(e.target.value)}
              defaultValue={currentUser?.username || ""}
              id="username"
              maxLength={20}
              required
              pattern="[a-z0-9]{4,}"
              className="peer"
            />
            <p className="invisible absolute text-sm text-red-500 peer-invalid:visible peer-invalid:static peer-invalid:mt-2">
              Please provide a minimum of 4 characters without any uppercase and
              special characters
            </p>
          </div>

          <div className="space-y-1">
            <Label htmlFor="description">Description (Optional)</Label>
            <Input
              type="text"
              placeholder="Description"
              onChange={(e) => {
                const inputValue = e.target.value;
                setDescription(inputValue);
                setCharacterCount(inputValue.length);
              }}
              onFocus={() => setIsInputFocused(true)}
              onBlur={() => setIsInputFocused(false)}
              defaultValue={currentUser?.desc || ""}
              id="description"
              maxLength={50}
            />
            {isInputFocused && (
              <p className="text-[10px] text-neutral-500">
                {characterCount} / {50} characters
              </p>
            )}
          </div>

          <Label htmlFor="social" className="mt-2">
            Social Links (Optional)
          </Label>
          <div className="space-y-4">
            <div>
              <Input
                type="url"
                placeholder="Link to social profile"
                onChange={(e) => setLink1(e.target.value)}
                defaultValue={currentUser?.links[0] || ""}
                name="link1"
              />
            </div>
            <div>
              <Input
                type="url"
                placeholder="Link to social profile"
                onChange={(e) => setLink2(e.target.value)}
                defaultValue={currentUser?.links[1] || ""}
                name="link2"
              />
            </div>
            <div>
              <Input
                type="url"
                placeholder="Link to social profile"
                onChange={(e) => setLink3(e.target.value)}
                defaultValue={currentUser?.links[2] || ""}
                name="link3"
              />
            </div>
          </div>

          <Button
            disabled={
              ((username === currentUser?.username || username.length < 4) &&
                description === currentUser?.desc &&
                link1 === currentUser?.links[0] &&
                link2 === currentUser?.links[1] &&
                link3 === currentUser?.links[2]) ||
              buttonDisabled
            }
            variant="gradiantNavy"
            className="mb-8 mt-1 rounded-lg"
            onClick={async (e) => {
              e.preventDefault();
              setLoading(true);
              setButtonDisabled(true);
              const fields = {
                username: username,
                description: description,
                links: [link1, link2, link3],
              };

              const set = await fetch("/settings/api/update", {
                method: "POST",
                body: JSON.stringify(fields),
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                toast.error(msg.message);
                setButtonDisabled(false);
              } else {
                setLoading(false);
                revalPath("/settings");
                toast.success(
                  "Successfully updated profile, kindly wait before making any more updates"
                );
              }
            }}
          >
            {loading ? (
              <>
                <LoadingDots color="#FAFAFA" />
              </>
            ) : (
              "Update"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Settings;
