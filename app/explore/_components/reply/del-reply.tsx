"use client";

import { useState } from "react";
import { Button } from "../../../../components/shared/button";
import { toast } from "sonner";
import { revalPath } from "@/lib/revalidate";
import LoadingDots from "../../../../components/shared/icons/loading-dots";

interface DelReplyProps {
  replyId: string;
}

const DelReplyButton: React.FC<DelReplyProps> = ({ replyId }) => {
  const [loading, setLoading] = useState<boolean>(false);
  return (
    <div className="flex flex-col items-center justify-center gap-8">
      <p className="text-center text-sm font-semibold">
        Click the button below to confirm deletion
      </p>
      <Button
        onClick={async (e) => {
          e.preventDefault();
          setLoading(true);
          const fields = {
            replyId: replyId,
          };

          const set = await fetch("/explore/api/repDelete", {
            method: "POST",
            body: JSON.stringify(fields),
          });
          const msg = await set.json();
          if (!set.ok) {
            setLoading(false);
            toast.error(msg.message);
          } else {
            setLoading(false);
            toast.success(msg.message);
            revalPath("/explore" + replyId);
          }
        }}
        className="w-full"
        variant="destructive"
      >
        {loading ? (
          <>
            <LoadingDots color="#FAFAFA" />
          </>
        ) : (
          "Confirm"
        )}
      </Button>
    </div>
  );
};

export default DelReplyButton;
