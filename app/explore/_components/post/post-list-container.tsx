"use client";

import { useState, useEffect } from "react";
import { SafeUser } from "@/types";
import { cn } from "@/lib/utils";
import useOptionStore from "@/lib/state/useOptionStore";
import useFilterStore from "@/lib/state/useFilterStore";
import useSearchStore from "@/lib/state/useSearchStore";
import useTagStore from "@/lib/state/useTagStore";

import { ChevronLeft, Search, X } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/shared/tabs";
import PostContainer from "./post-container";
import PostList from "./post-list";
import UserList from "../user-list";
import { Input } from "@/components/shared/input";

interface PostListContainerProps {
  currentUser?: SafeUser | null;
}

const ExploreTabList = [
  {
    name: "Recent",
    mode: "recent",
  },
  {
    name: "Following",
    mode: "follow",
  },
  {
    name: "Top Votes",
    mode: "top",
  },
];

const PostListContainer: React.FC<PostListContainerProps> = ({
  currentUser,
}) => {
  const [selectedSortMode, setSelectedSortMode] = useState("recent");
  const [selectedTab, setSelectedTab] = useState("Recent");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const { searchTerm, setSearchTerm } = useSearchStore();
  useEffect(() => {
    const storedFilter = window.sessionStorage.getItem("searchTerm");
    setSearchTerm(storedFilter || "");
  }, [setSearchTerm]);

  useEffect(() => {
    window.sessionStorage.setItem("searchTerm", searchTerm);
  }, [searchTerm]);

  // Filter
  const { filter, setFilter } = useFilterStore();
  useEffect(() => {
    const storedFilter = window.sessionStorage.getItem("filter");
    setFilter(storedFilter || "");
  }, [setFilter]);

  useEffect(() => {
    window.sessionStorage.setItem("filter", filter);
  }, [filter]);

  // Tag
  const { searchTag, setSearchTag } = useTagStore();
  useEffect(() => {
    const storedSearchTag = window.sessionStorage.getItem("searchTag");
    setSearchTag(storedSearchTag || "");
  }, [setSearchTag]);

  useEffect(() => {
    window.sessionStorage.setItem("searchTag", searchTag);
  }, [searchTag]);

  // Options
  const { selectedOption, setSelectedOption } = useOptionStore();
  useEffect(() => {
    const storedOption = window.sessionStorage.getItem("selectedOption");
    setSelectedOption(Number(storedOption) || -3);
  }, [setSelectedOption]);

  useEffect(() => {
    window.sessionStorage.setItem("selectedOption", String(selectedOption));
  }, [selectedOption]);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOption = Number(event.target.value);
    setSelectedOption(selectedOption);

    if (selectedOption === -2) {
      setSearchTag(searchTerm);
      setFilter("");
    } else {
      setSearchTag("");
      setFilter(searchTerm);
    }
  };

  const handleSortChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSort = event.target.value;
    setSelectedSortMode(selectedSort);
  };

  return (
    <div className="no-scrollbar flex max-h-fit w-full flex-col overflow-auto">
      <div className="mb-2">
        <div className="flex flex-row items-center gap-2">
          <form
            className="flex grow flex-row items-center gap-2"
            onSubmit={(e) => {
              e.preventDefault();

              if (selectedOption !== -2) {
                setFilter(searchTerm);
              } else {
                setFilter("");
                setSearchTag(searchTerm);
              }
            }}
          >
            {(filter !== "" || searchTag !== "") && (
              <button
                onClick={() => {
                  setFilter("");
                  setSearchTag("");
                  setSearchTerm("");
                }}
              >
                <ChevronLeft className="transition-all hover:text-ocean hover:duration-300" />
              </button>
            )}
            <div className="flex grow flex-row items-center gap-2 rounded-xl border border-ocean bg-transparent">
              <div
                className={cn(
                  "flex grow flex-row items-center",
                  isInputFocused
                    ? "rounded-l-lg border focus:ring-1 focus:ring-ocean focus:ring-offset-0"
                    : ""
                )}
              >
                <Input
                  type="text"
                  placeholder={
                    selectedOption === -3
                      ? "Search posts..."
                      : selectedOption === -2
                      ? "Search posts with a tag... (Up to 20 characters)"
                      : "Search users..."
                  }
                  value={searchTerm}
                  onChange={(e) => {
                    const inputValue = e.target.value;
                    setSearchTerm(inputValue);
                  }}
                  className="flex h-9 grow border-none bg-transparent"
                  maxLength={selectedOption === -2 ? 20 : 50}
                  onFocus={() => setIsInputFocused(true)}
                  onBlur={() => setIsInputFocused(false)}
                />
                {searchTerm.length !== 0 && (
                  <button onClick={() => setSearchTerm("")}>
                    <X className="mr-2 text-cloud/80 transition-all hover:text-cloud hover:duration-300" />
                  </button>
                )}
              </div>
              <button>
                <Search className="mr-2 text-cloud/80 transition-all hover:text-cloud hover:duration-300" />
              </button>
            </div>
          </form>
          <select
            className="h-[2.45rem] w-24 rounded-xl border border-ocean bg-transparent p-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-ocean"
            value={selectedOption}
            onChange={handleChange}
          >
            <option value={-3} className="bg-ocean">
              Post
            </option>
            <option value={-2} className="bg-ocean">
              Tag
            </option>
            <option value={-1} className="bg-ocean">
              User
            </option>
          </select>
        </div>
        {/* <div>
          {isTagInputFocused && (
            <p className="text-sm text-neutral-500">
              {tagCharacterCount} / {20} characters
            </p>
          )}
        </div> */}
      </div>
      {(selectedOption === -3 || selectedOption === -2) && currentUser && (
        <PostContainer currUser={currentUser} />
      )}
      {(selectedOption === -3 || selectedOption === -2) && (
        <div className="mt-5 flex flex-col gap-2">
          <Tabs value={selectedTab} className="mt-4 flex w-full">
            <TabsList className="flex shrink-0 space-x-4">
              {ExploreTabList.map((item, i) => {
                if (item.name === "Following" && !currentUser) {
                  return null;
                }
                return (
                  <TabsTrigger
                    value={item.name}
                    onClick={() => {
                      setSelectedTab(item.name);
                      setSelectedSortMode(item.mode);
                    }}
                    key={i}
                  >
                    {item.name}
                  </TabsTrigger>
                );
              })}
            </TabsList>
          </Tabs>

          <PostList
            filter={filter}
            tag={searchTag}
            sortMode={selectedSortMode}
            currUser={currentUser}
          />
        </div>
      )}
      {selectedOption === -1 && (
        <UserList filter={filter} currentUser={currentUser} />
      )}
    </div>
  );
};

export default PostListContainer;