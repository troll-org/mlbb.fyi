import mongoose, { ObjectId, Schema, Types } from "mongoose";

export interface HeroesDocument {
  _id?: ObjectId;
  heroId: number;
  heroName: string;
  heroPath: string;
  heroImg: string;
  heroRoleType: string[];
  heroLaneType: string[];
  heroDetails: IHeroDetails;
}

export interface IHeroSkills {
  skillId: number;
  skillName: string;
  skillCooldown: number | null;
  skillDescription: string;
  skillIconOriginUrl: string;
  skillTag: {
    skillTagId: number;
    skillTagName: string;
    skillTagRGB: number[];
  }[];
}

export interface IHeroStats {
  heroWinRate: number;
  heroBanRate: number;
  heroAppearanceRate: number;
  statsUpdatedAt: number;
  statsType:
    | "all"
    | "epic"
    | "legend"
    | "mythic"
    | "mythicalhonor"
    | "mythicalgloryplus";
}

export interface IHeroDetails {
  heroSpeciality: string; // control, burst
  heroAbility: number;
  heroOffense: number;
  heroDurability: number;
  heroDifficulity: number;
  heroSkill: IHeroSkills[];
}

const SkillTagSchema = new Schema({
  skillTagId: { type: Number, required: true },
  skillTagName: { type: String, required: true },
  skillTagRGB: { type: [Number], required: true },
});

const HeroSkillsSchema = new Schema({
  skillId: { type: Number, required: true },
  skillName: { type: String, required: true },
  skillCooldown: { type: Number, default: null },
  skillDescription: { type: String, required: true },
  skillIconOriginUrl: { type: String, required: true },
  skillTag: { type: [SkillTagSchema], required: true },
});

const HeroStatsSchema = new Schema({
  heroWinRate: { type: Number, required: true },
  heroBanRate: { type: Number, required: true },
  heroAppearanceRate: { type: Number, required: true },
  statsUpdatedAt: { type: Number, required: true },
  statsType: {
    type: String,
    enum: [
      "all",
      "epic",
      "legend",
      "mythic",
      "mythicalhonor",
      "mythicalgloryplus",
    ],
    required: true,
  },
});

const HeroDetailsSchema = new Schema({
  heroSpeciality: { type: String, required: true },
  heroAbility: { type: Number, required: true },
  heroOffense: { type: Number, required: true },
  heroDurability: { type: Number, required: true },
  heroDifficulity: { type: Number, required: true },
  heroSkill: [{ type: HeroSkillsSchema, required: true }],
});

const HeroesSchema = new Schema<HeroesDocument>(
  {
    _id: {
      type: Types.ObjectId,
      unique: true,
    },
    heroId: { type: Number, required: true, unique: true },
    heroName: { type: String, required: true },
    heroPath: { type: String, required: true },
    heroImg: { type: String, required: true },
    heroRoleType: { type: [String], required: true },
    heroLaneType: { type: [String], required: true },
    heroDetails: { type: HeroDetailsSchema, required: true },
  },
  {
    timestamps: false,
    collection: "Heroes",
  }
);

const Heroes =
  (mongoose.models.Heroes as mongoose.Model<HeroesDocument>) ||
  mongoose.model<HeroesDocument>("Heroes", HeroesSchema);
export default Heroes;
