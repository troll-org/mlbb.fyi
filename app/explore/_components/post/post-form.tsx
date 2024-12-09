"use client";

import { useCallback, useRef, useState } from "react";
import { FileRejection, useDropzone } from "react-dropzone";
import { toast } from "sonner";
import Image from "next/image";

import { SafeUser } from "@/types";
import useAutosizeTextArea from "@/lib/state/useAutosizeTextArea";

import { Button } from "@/components/shared/button";
import { Plus } from "lucide-react";
import { Paperclip } from "lucide-react";
import { Label } from "@/components/shared/label";
import LoadingDots from "@/components/shared/icons/loading-dots";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/shared/dialog";
import { Input } from "@/components/shared/input";

const PostForm = ({ currUser }: { currUser: SafeUser }) => {
  const [title, setTitle] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [isMessageInputFocused, setIsMessageInputFocused] =
    useState<boolean>(false);
  const [titleCharacterCount, setTitleCharacterCount] = useState<number>(0);
  const [messageCharacterCount, setMessageCharacterCount] = useState<number>(0);
  const [tags, setTags] = useState("");

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  useAutosizeTextArea(textAreaRef.current, message);

  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState("");

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      if (acceptedFiles.length > 0) {
        setSelectedImage(acceptedFiles[0]);
      }
      rejectedFiles.forEach((file) => {
        file.errors.forEach((err) => {
          if (err.code === "file-too-large") {
            toast.error(`Sorry, maximum file size was 5MB`);
          }
        });
      });
    },
    []
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: 1,
    maxSize: 5242880,
    multiple: false,
  });

  const handleUpload = async (e: any) => {
    e.preventDefault();
    const sign = await fetch("/settings/api/cdn-sign");
    const data = await sign.json();
    const url =
      "https://api.cloudinary.com/v1_1/" + data.cloudname + "/auto/upload";
    try {
      const formData = new FormData();
      if (selectedImage) {
        formData.append("file", selectedImage);
        formData.append("api_key", data.apikey);
        formData.append("timestamp", data.timestamp.toString());
        formData.append("signature", data.signature);
        formData.append("eager", data.eager);
        formData.append("folder", data.folder);

        const response = await fetch(url, {
          method: "POST",
          body: formData,
          cache: "no-store",
        });
        const result = await response.json();

        toast.success("Picture uploaded, please close this window");
        setImageUrl(result.secure_url);
        setLoading(false);
        setButtonDisabled(false);
        setSelectedImage(null);
      } else {
        setLoading(false);
        setButtonDisabled(false);
        toast.error("There is no picture uploaded");
      }
    } catch (error) {
      setLoading(false);
      setButtonDisabled(false);
      toast.error("Failed to upload picture, please try again");
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="gradiantNavy">
          <Plus className="h-4 w-4 sm:mr-2" />
          <span className="hidden sm:block">Start Discussion</span>
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Start a new discussion!</DialogTitle>
        <DialogDescription>
          <form
            className="mt-3 flex w-full flex-col gap-3"
            onSubmit={async (e) => {
              e.preventDefault();
              let array: string[] = [];
              if (tags !== "") {
                const wordsInsideQuotes = tags.replace(/'/g, "");
                const elements = wordsInsideQuotes.split(",");

                array = elements.map((element) => element.trim().toLowerCase());
              }

              setLoading(true);
              const fields = {
                title: title,
                message: message,
                image: imageUrl,
                tags: array.slice(0, 3),
              };

              const set = await fetch(`/api/explore/post?id=${currUser?.id}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify(fields),
                cache: "no-store",
              });
              const msg = await set.json();
              if (!set.ok) {
                setLoading(false);
                toast.error(msg.message);
              } else {
                setLoading(false);
                toast.success("Successfully posted! Please wait.");

                window.location.reload();
              }
            }}
          >
            <div className="flex h-fit items-center gap-2.5 rounded-lg p-2 pt-0">
              <Image
                src={(currUser?.image as string) || "/nana.webp"}
                alt="image"
                width={48}
                height={48}
                className="h-12 w-12 rounded-full object-cover"
              />
              <textarea
                placeholder="Title"
                className="w-full resize-none overflow-hidden rounded-lg border-b border-slate-700 bg-transparent px-3 py-2 text-slate-200 outline-none transition-all duration-500 focus:outline-none"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setTitle(inputValue);
                  setTitleCharacterCount(inputValue.length);
                }}
                maxLength={50}
                value={title}
                rows={1}
              />
            </div>

            <div className="space-y-1">
              <textarea
                className="w-full resize-none overflow-hidden rounded-lg border border-slate-700 bg-transparent p-3 text-slate-200 outline-none transition-all duration-100 focus:outline-none focus:ring"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setMessage(inputValue);
                  setMessageCharacterCount(inputValue.length);
                }}
                onFocus={() => setIsMessageInputFocused(true)}
                onBlur={() => setIsMessageInputFocused(false)}
                maxLength={2000}
                placeholder="Message"
                ref={textAreaRef}
                value={message}
                rows={5}
              />
              {isMessageInputFocused && (
                <p className="text-[10px] text-neutral-500">
                  {messageCharacterCount} / {2000} characters
                </p>
              )}
            </div>
            <div className="space-y-1">
              <Label htmlFor="tags">Optional</Label>
              <Input
                type="text"
                placeholder={"Enter up to 3 tags (e.g. heroes, meta, bug)"}
                value={tags}
                id="tags"
                onChange={(e) => {
                  const inputValue = e.target.value;
                  setTags(inputValue);
                }}
                className="w-full resize-none overflow-hidden rounded-lg border border-slate-700 bg-transparent p-3 text-sm text-slate-200 outline-none transition-all duration-100 focus:outline-none focus:ring"
              />
            </div>

            <div
              className="cursor-pointer rounded-lg border border-slate-700 p-3 text-sm text-slate-200 transition-all duration-100 hover:bg-slate-800"
              {...getRootProps()}
            >
              <input {...getInputProps()} />
              <div className="flex flex-row items-center justify-center">
                <Paperclip className="mr-2 h-4 w-4" />
                {isDragActive ? (
                  <p className="font-semibold">Drop image here</p>
                ) : (
                  <p className="font-semibold">
                    Upload/replace by clicking or dropping an image
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-end gap-2">
              <Button
                className="mt-1 w-full rounded-2xl text-cloud"
                variant="gradiantNavy"
                disabled={!title || !message}
              >
                {loading ? (
                  <>
                    <LoadingDots color="#FAFAFA" />
                  </>
                ) : (
                  "Post"
                )}
              </Button>
            </div>
          </form>
        </DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default PostForm;
