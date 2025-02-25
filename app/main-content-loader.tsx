"use client";

import { useEffect } from "react";
import { useLoading } from "./loading-context";

export default function MainContentLoader({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setIsLoaded } = useLoading();

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 1000);

    return () => clearTimeout(timer);
  }, [setIsLoaded]);

  return <>{children}</>;
}
