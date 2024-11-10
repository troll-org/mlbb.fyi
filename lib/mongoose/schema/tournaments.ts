import mongoose from "mongoose";
import { Types } from "mongoose";

export interface HeroTopPlayedWith {
  heroId: Types.ObjectId;
  heroName: string;
  totalMatchWin: number;
  totalMatchLose: number;
}

export interface HeroTopPlayedVs {
  heroId: Types.ObjectId;
  heroName: string;
  totalMatchWin: number;
  totalMatchLose: number;
}

export interface HeroPicks {
  totalpicks: number;
  totalWin: number;
  totalLose: number;
  winRate: number;
  rate: number;
}

export interface SidePicks {
  total: number;
  totalWin: number;
  totalLose: number;
  winRate: number;
}

export interface HeroBans {
  total: number;
  rate: number;
}

export interface PickAndBans {
  total: number;
  rate: number;
}

export interface HeroData {
  heroId: Types.ObjectId;
  heroName: string;
  heroPicks: HeroPicks;
  blueSidePicks: SidePicks;
  redSidePicks: SidePicks;
  heroBans: HeroBans;
  pickAndBans: PickAndBans;
  heroTopPlayedWith: HeroTopPlayedWith[];
  heroTopPlayedVs: HeroTopPlayedVs[];
}

export interface TournamentDates {
  startDate: Date;
  endDate: Date;
}

export interface TournamentsDocument {
  _id: Types.ObjectId;
  dataSourceUrl: string;
  data: HeroData[];
  scrapedAt: Date;
  tournamentDates: TournamentDates;
  tournamentName: string;
  tournamentPath: string;
}

const HeroTopPlayedWithSchema = new mongoose.Schema({
  heroId: mongoose.Schema.Types.ObjectId,
  heroName: String,
  totalMatchWin: Number,
  totalMatchLose: Number,
});

const HeroTopPlayedVsSchema = new mongoose.Schema({
  heroId: mongoose.Schema.Types.ObjectId,
  heroName: String,
  totalMatchWin: Number,
  totalMatchLose: Number,
});

const HeroPicksSchema = new mongoose.Schema({
  totalpicks: Number,
  totalWin: Number,
  totalLose: Number,
  winRate: Number,
  rate: Number,
});

const SidePicksSchema = new mongoose.Schema({
  total: Number,
  totalWin: Number,
  totalLose: Number,
  winRate: Number,
});

const HeroBansSchema = new mongoose.Schema({
  total: Number,
  rate: Number,
});

const PickAndBansSchema = new mongoose.Schema({
  total: Number,
  rate: Number,
});

const HeroDataSchema = new mongoose.Schema({
  heroId: mongoose.Schema.Types.ObjectId,
  heroName: String,
  heroPicks: HeroPicksSchema,
  blueSidePicks: SidePicksSchema,
  redSidePicks: SidePicksSchema,
  heroBans: HeroBansSchema,
  pickAndBans: PickAndBansSchema,
  heroTopPlayedWith: [HeroTopPlayedWithSchema],
  heroTopPlayedVs: [HeroTopPlayedVsSchema],
});

const TournamentsSchema = new mongoose.Schema<TournamentsDocument>(
  {
    dataSourceUrl: String,
    data: [HeroDataSchema],
    scrapedAt: Date,
    tournamentDates: {
      startDate: Date,
      endDate: Date,
    },
    tournamentName: String,
    tournamentPath: String,
  },
  {
    collection: "Tournaments",
  }
);

const Tournaments =
  (mongoose.models.Tournaments as mongoose.Model<TournamentsDocument>) ||
  mongoose.model<TournamentsDocument>("Tournaments", TournamentsSchema);

export default Tournaments;
