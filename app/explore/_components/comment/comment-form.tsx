"use client";

import { useRef, useState } from "react";
import { toast } from "sonner";
import Image from "next/image";

import { revalPath } from "@/lib/revalidate";
import useAutosizeTextArea from "@/lib/state/useAutosizeTextArea";

import { GradiantCard } from "@/components/shared/gradiant-card";
import { SendIcon } from "lucide-react";
import LoadingDots from "@/components/shared/icons/loading-dots";

interface CommentProps {
  postId: string;
  img: string;
}

const NewCommentForm: React.FC<CommentProps> = ({ postId, img }) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState<boolean>(false);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  useAutosizeTextArea(textAreaRef.current, value);

  return (
    <GradiantCard className="flex grow flex-row items-start" variant="clean">
      <Image
        src={
          img !== ""
            ? img.split("/image/upload/")[0] +
              "/image/upload/c_fill,h_150,w_150/" +
              img.split("/image/upload/")[1]
            : "/nana.webp"
        }
        alt=""
        width={48}
        height={48}
        className="mr-4 items-start rounded-full object-center"
        placeholder="blur"
        blurDataURL={
          img?.split("/image/upload/")[0] +
          "/image/upload/e_blur:400,h_100,w_100/" +
          img?.split("/image/upload/")[1]
        }
      />
      <div className="mt-1 grow">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            setLoading(true);
            const fields = {
              postId: postId,
              message: value,
            };

            const set = await fetch("/explore/api/postComment", {
              method: "POST",
              body: JSON.stringify(fields),
            });
            const msg = await set.json();
            if (!set.ok) {
              setLoading(false);
              toast.error(msg.message);
            } else {
              revalPath("/explore/" + postId);
              setLoading(false);
              setValue("");
              toast.success(msg.message);
            }
          }}
        >
          <div className="flex flex-row items-end">
            <textarea
              id="review-text"
              className="w-full resize-none overflow-hidden rounded-lg border-b border-slate-700 bg-transparent px-3 py-2 text-slate-200 outline-none transition-all duration-500 focus:outline-none"
              onChange={(e) => {
                const inputValue = e.target.value;
                setValue(inputValue);
              }}
              placeholder="Add a comment"
              ref={textAreaRef}
              rows={1}
              value={value}
            />

            <button
              type="submit"
              className={`${
                value ? "" : "hidden hover:text-white"
              }mb-[1px] ml-2 cursor-pointer  hover:duration-300`}
              disabled={!value}
            >
              {loading ? (
                <div className="mb-2">
                  <LoadingDots color="#FAFAFA" />
                </div>
              ) : (
                <SendIcon
                  size={20}
                  className="mb-[6px] rotate-45 hover:text-sea hover:duration-300"
                />
              )}
            </button>
          </div>
        </form>
      </div>
    </GradiantCard>
  );
};

export default NewCommentForm;
