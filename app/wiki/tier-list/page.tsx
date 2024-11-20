import TierContainer from "@/app/wiki/tier-list/_components/tier-list-container";
import { getHeroTierWithNames } from "@/lib/actions/getHeroTier";

async function TierListPage() {
  const heroes = await getHeroTierWithNames({
    select:
      "-_id -combinedScore -currentMetaScore -currentMetaStats -tournamentScore -tournamentStats -updatedAt",
  });
  return (
    <div className="flex w-full flex-col gap-4">
      <TierContainer heroes={heroes} />
    </div>
  );
}

export default TierListPage;
