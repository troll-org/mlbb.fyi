"use client";

import React, { useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { HeroTierDocument } from "@/lib/mongoose/schema/heroes-tier";
import { Query } from "@/types";
import { GradiantCard } from "@/components/shared/gradiant-card";
import HeroCard from "@/components/wiki/heroes/hero-card";
import html2canvas from "html2canvas";
import { Button } from "@/components/shared/button";

export const tiers = [
  { tier: "S", color: "#3652ba" },
  { tier: "A", color: "#059669" },
  { tier: "B", color: "#fde047" },
  { tier: "C", color: "#FFA500" },
  { tier: "D", color: "#FF6347" },
];

interface TierListProps {
  heroes: HeroTierDocument[];
  query: Query;
}

export default function TierContainer({ heroes, query }: TierListProps) {
  const router = useRouter();
  const filteredHeroes = React.useMemo(() => {
    if (!query) return heroes;

    const { q, type, lane } = query;

    return heroes.filter((hero) => {
      const matchesQuery =
        !q || hero.name.toLowerCase().includes(q.toLowerCase());

      const matchesType =
        !type ||
        type
          .split(",")
          .every((typeFilter) =>
            hero.heroRoleType.some((roleType) =>
              roleType.toLowerCase().includes(typeFilter.toLowerCase())
            )
          );

      const matchesLane =
        !lane ||
        lane
          .split(",")
          .every((laneFilter) =>
            hero.heroLaneType.some((laneType) =>
              laneType.toLowerCase().includes(laneFilter.toLowerCase())
            )
          );

      return matchesQuery && matchesType && matchesLane;
    });
  }, [query, heroes]);

  const container = useRef<HTMLDivElement>(null);

  const captureComponent = async () => {
    if (container.current) {
      // Wrap the container with padding using a clone
      const wrapper = document.createElement("div");
      wrapper.style.padding = "20px"; // Set desired padding
      wrapper.style.backgroundColor = "#030F1C"; // Match the canvas background
      wrapper.style.display = "block"; // Prevent width stretch

      // Create a text element for the title
      const title = document.createElement("div");
      title.innerText = "mlbb.fyi ; Mobile Legend Bang Bang Hero Tier List"; // Add your desired text
      title.style.fontSize = "24px"; // Adjust font size
      title.style.color = "#FFFFFF"; // Adjust text color
      title.style.fontWeight = "bold"; // Make the text bold
      title.style.textAlign = "center"; // Center the text
      title.style.marginBottom = "10px"; // Add spacing below the title

      // Create a text element for the date, hero lane, and type
      const details = document.createElement("div");
      const currentDate = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }); // Generate current date in "19 November 2024" format
      const heroLane = query.lane ? `Lane: ${query.lane}` : "Lane: All"; // Dynamic lane
      const heroType = query.type ? `Type: ${query.type}` : "Type: All"; // Dynamic type
      details.innerText = `${currentDate} | ${heroLane} | ${heroType}`;
      details.style.fontSize = "16px"; // Smaller font size for details
      details.style.color = "#FFFFFF"; // Text color
      details.style.textAlign = "center"; // Center the details
      details.style.marginBottom = "20px"; // Add spacing below the details

      // Clone the container and append it after the details
      const clonedContainer = container.current.cloneNode(true);
      wrapper.appendChild(title); // Add the title
      wrapper.appendChild(details); // Add the details
      wrapper.appendChild(clonedContainer); // Add the cloned content

      document.body.appendChild(wrapper); // Temporarily add to DOM for rendering

      // Capture the wrapper with html2canvas
      const canvas = await html2canvas(wrapper, {
        allowTaint: true,
        useCORS: true,
        backgroundColor: null, // Set null to maintain wrapper's background color
      });

      // Clean up after rendering
      document.body.removeChild(wrapper);

      // Generate the image and download
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = "tier-list.png";
      link.click();
    }
  };

  return (
    <>
      <Button variant="default" type="button" onClick={captureComponent}>
        Download
      </Button>

      <div ref={container} className="flex w-full flex-col gap-4">
        {tiers.map((item, i) => {
          const tierHeroes = filteredHeroes?.filter(
            (hero) => hero.tier === item.tier
          );

          return (
            <GradiantCard
              key={i}
              className="relative w-full rounded-lg border file:h-fit"
            >
              <p
                className="absolute left-0 top-0 flex h-full w-12 items-center justify-center rounded-l-lg text-center font-heading"
                style={{ background: item.color }}
              >
                {item.tier}
              </p>

              <div className="ml-16 mr-4 grid grid-cols-[repeat(auto-fill,minmax(122px,1fr))] gap-4">
                {tierHeroes?.map((hero, j) => (
                  <div
                    key={j}
                    // onClick={() => {
                    //   router.push(`/wiki/heroes/${hero.name.toLowerCase()}`);
                    // }}
                    className="relative mx-auto cursor-pointer"
                  >
                    <HeroCard
                      hero={
                        {
                          heroName: hero.name,
                          heroPath: hero.heroPath,
                          heroRoleType: hero.heroRoleType,
                          heroLaneType: hero.heroLaneType,
                        } as any
                      }
                    />
                  </div>
                ))}
              </div>
            </GradiantCard>
          );
        })}
      </div>
      <p className="text-lg ml-2 text-gray-400">
        mlbb.fyi tier list is updated daily based on the win, pick and ban rate
        of each hero in major Mobile Legends tournament
      </p>
    </>
  );
}
