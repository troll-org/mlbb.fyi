import mongoose, { Schema, Types, Model } from "mongoose";

interface Stats {
  pickRate: number;
  banRate: number;
  winRate: number;
}

export interface HeroTierDocument {
  heroId: Types.ObjectId;
  name: string;
  heroLaneType: string[];
  heroRoleType: string[];
  heroPath: string;
  combinedScore: number;
  currentMetaScore: number;
  currentMetaStats: Stats;
  tier: string;
  tournamentScore: number;
  tournamentStats: Stats;
  updatedAt: Date;
}

const StatsSchema: Schema<Stats> = new Schema(
  {
    pickRate: { type: Number, required: true },
    banRate: { type: Number, required: true },
    winRate: { type: Number, required: true },
  },
  { _id: false }
);

const HeroTierSchema: Schema = new Schema(
  {
    heroId: { type: Types.ObjectId, required: true, ref: "Heroes" },
    combinedScore: { type: Number, required: true },
    currentMetaScore: { type: Number, required: true },
    currentMetaStats: { type: StatsSchema, required: true },
    tier: { type: String, required: true },
    tournamentScore: { type: Number, required: true },
    tournamentStats: { type: StatsSchema, required: true },
    updatedAt: { type: Date, default: Date.now },
  },
  {
    collection: "TierList",
    timestamps: true,
  }
);

const HeroTier: Model<HeroTierDocument> =
  mongoose.models.TierList ||
  mongoose.model<HeroTierDocument>("TierList", HeroTierSchema);

export default HeroTier;
