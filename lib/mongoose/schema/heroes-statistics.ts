import mongoose, { Schema, Document, Types, ObjectId } from "mongoose";

interface Counter {
  heroId: ObjectId;
  heroIndex: number;
  increaseWinRate: number;
  minWinRate6: number;
  minWinRate6_8: number;
  minWinRate8_10: number;
  minWinRate10_12: number;
  minWinRate12_14: number;
  minWinRate14_16: number;
  minWinRate16_18: number;
  minWinRate18_20: number;
  minWinRate20: number;
}

interface DataEntry {
  pickRate: number;
  banRate: number;
  winRate: number;
  matchType: string;
  rankId: string;
  rankName:
    | "all"
    | "epic"
    | "legend"
    | "mythic"
    | "mythicalhonor"
    | "mythicalgloryplus";
  campType: string;
  counters: Counter[];
  countersLast: Counter[];
}

export interface HeroStatsDocuments {
  _id?: ObjectId;
  heroId: ObjectId;
  originDataId: string;
  originDataCreatedAt: number;
  originDataUpdatedAt: number;
  createdAt: Date;
  data: DataEntry[];
}

const CounterSchema = new Schema(
  {
    heroId: { type: Types.ObjectId, ref: "Heroes", required: true },
    heroIndex: { type: Number, required: true },
    increaseWinRate: { type: Number, required: true },
    minWinRate6: { type: Number, required: true },
    minWinRate6_8: { type: Number, required: true },
    minWinRate8_10: { type: Number, required: true },
    minWinRate10_12: { type: Number, required: true },
    minWinRate12_14: { type: Number, required: true },
    minWinRate14_16: { type: Number, required: true },
    minWinRate16_18: { type: Number, required: true },
    minWinRate18_20: { type: Number, required: true },
    minWinRate20: { type: Number, required: true },
  },
  { _id: false }
);

const DataSchema = new Schema(
  {
    pickRate: { type: Number, required: true },
    banRate: { type: Number, required: true },
    winRate: { type: Number, required: true },
    matchType: { type: String, required: true },
    rankId: { type: String, required: true },
    rankName: { type: String, required: true },
    campType: { type: String, required: true },
    counters: { type: [CounterSchema], required: true },
    countersLast: { type: [CounterSchema], required: true },
  },
  { _id: false }
);

const HeroStatsSchema = new Schema(
  {
    heroId: { type: Types.ObjectId, ref: "Heroes", required: true },
    originDataId: { type: String, required: true },
    originDataCreatedAt: { type: Number, required: true },
    originDataUpdatedAt: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    data: { type: [DataSchema], required: true },
  },
  {
    collection: "HeroStatistics",
  }
);

const HeroStats =
  (mongoose.models.HeroStatistics as mongoose.Model<HeroStatsDocuments>) ||
  mongoose.model("HeroStatistics", HeroStatsSchema);

export default HeroStats;
