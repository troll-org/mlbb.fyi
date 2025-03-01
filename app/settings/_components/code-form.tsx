"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

import { SafeUser } from "@/types";

import { Input } from "@/components/shared/input";
import { Button } from "@/components/shared/button";
import LoadingDots from "@/components/shared/icons/loading-dots";

const bodyToast = (msg: string) => <div className="">{msg}</div>;

interface CodeFormProps {
  currentUser?: SafeUser | null;
}
const CodeForm: React.FC<CodeFormProps> = ({ currentUser }) => {
  const params = useSearchParams();
  const router = useRouter();

  const accId = params?.getAll("id")[0];
  const accServer = params?.getAll("id")[1];

  const [form, setForm] = useState({
    accId: accId ? accId : null,
    accServer: accServer ? accServer : null,
    code: null,
  });

  const [loadingSend, setLoadingSend] = useState(false);

  const handleChangeForm = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };
  if (!params?.getAll || !accId || !accServer) {
    return (
      <div className="mt-40">
        <div className="mx-auto flex max-w-xl flex-col justify-center text-center">
          <p className="pt-3 text-[16px] md:text-[20px]">
            Please navigate back to the previous page...
          </p>
          <Button
            className="mx-auto mt-4 w-fit rounded-2xl"
            variant="gradiantNavySec"
          >
            <Link href="/settings/bind">Back</Link>
          </Button>
        </div>
      </div>
    );
  }
  return (
    <div>
      <span className="text-[44px] font-bold leading-10 tracking-tight md:text-[64px] md:leading-[60px]">
        Bind
      </span>
      <p className="pt-3 text-[16px] md:text-[16px]">
        Kindly check your Mobile Legends inbox
      </p>
      <div className="flex flex-col items-center justify-center">
        <div className="flex items-end justify-center">
          <span className="w-fit text-center text-[12px] text-neutral-500">
            Please ensure that you have never bind this account with us
          </span>
        </div>
      </div>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          setLoadingSend(true);
          const bind = await fetch("/settings/api/bind", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ ...form, email: currentUser?.email }),
          });
          const res = await bind.json();
          if (bind.status != 200) {
            toast(bodyToast(res?.message));
            setLoadingSend(false);
          } else {
            toast(bodyToast(res?.message));
            setLoadingSend(false);
            router.push(`/profile/${currentUser?.username}/statistics`);
          }
        }}
        className="mx-auto mt-8 flex max-w-md flex-col gap-y-2"
      >
        <Input
          type="number"
          onChange={handleChangeForm}
          placeholder="Code"
          name="code"
          required
        />
        <Button
          className="mt-4 rounded-lg"
          type="submit"
          disabled={loadingSend}
        >
          {loadingSend ? <LoadingDots color="#fafafa" /> : "Bind"}
        </Button>
      </form>
    </div>
  );
};

export default CodeForm;
