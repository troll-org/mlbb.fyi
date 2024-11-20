import TierContainer from "@/app/wiki/tier-list/_components/tier-list-container";
import { GradiantCard } from "@/components/shared/gradiant-card";
import HeroFilter from "@/app/wiki/heroes/_components/hero-filter";
import HeroSearch from "@/app/wiki/heroes/_components/hero-search";
import { getHeroTierWithNames } from "@/lib/actions/getHeroTier";

async function TierListPage() {
  const heroes = await getHeroTierWithNames({
    select:
      "-_id -combinedScore -currentMetaScore -currentMetaStats -tournamentScore -tournamentStats -updatedAt",
  });
  return (
    <div className="flex w-full flex-col gap-4">
      <GradiantCard
        className="flex h-fit w-full flex-col gap-4 px-6"
        variant="clean"
      >
        <HeroFilter />
        <HeroSearch />
      </GradiantCard>
      <TierContainer heroes={heroes} />
    </div>
  );
}

export default TierListPage;
