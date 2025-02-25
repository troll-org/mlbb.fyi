"use client";

import { useLoading } from "@/app/loading-context";
import Footer from "@/components/footer";

export default function FooterLoader() {
  const { isLoaded } = useLoading();

  if (!isLoaded) return null;

  return <Footer />;
}
