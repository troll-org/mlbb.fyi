import mongoose, { Schema, Model, Types } from "mongoose";

interface Talent {
  talentId: number;
  talentAttribute: string[];
  talentName: string;
}

interface Spell {
  skillId: number;
  skillDesc: string;
  skillDescEmblem: string;
  skillIconOriginUrl: string;
  skillIdLv: string;
  skillName: string;
}

interface Equipment {
  equipId: Number;
  equipName: string;
  equipIconOriginUrl: string;
  equipSkill1: string;
  equipSkill2: string;
  equipSkill3: string;
  equipSkill4: string;
  equipSkill5: string;
  equipSkill6: string;
  equipSkill7: string;
  equipSkillDesc: string;
  equipTips: string;
  equipType: string;
  equipTypeName: string;
  targetEquipId: string;
}

interface Emblem {
  emblemId: number;
  emblemSkills: {
    numDescribe: string;
    skillDesc: string;
    skillIconOriginUrl: string;
    skillId: Number;
    skillIdLv: string;
    skillname: string;
  };
  emblemTier: number;
}

export interface RecommendedDocument {
  skillId: Types.ObjectId;
  talentId: Types.ObjectId;
  emblemId1: Types.ObjectId;
  emblemId2: Types.ObjectId;
  emblemId3: Types.ObjectId;
  equipmentsId: Types.ObjectId[];
  skill: Spell[];
  talent: Talent;
  emblems: Emblem[];
  equipmentDetails: Equipment[];
  authorName: string;
  authorTitle: string;
  authorOriginImgUrl: string;
  scrapedAt: Date;
}

interface HeroEquipmentDocument {
  heroId: Types.ObjectId;
  equipments: RecommendedDocument[];
}

const RecommendedSchema: Schema = new Schema({
  skillId: { type: Types.ObjectId, ref: "Skills", required: true },
  talentId: { type: Types.ObjectId, ref: "Talents", required: true },
  emblemId1: { type: Types.ObjectId, ref: "Emblems", required: true },
  emblemId2: { type: Types.ObjectId, ref: "Emblems", required: true },
  emblemId3: { type: Types.ObjectId, ref: "Emblems", required: true },
  equipmentsId: [{ type: Types.ObjectId, ref: "Equipments", required: true }],
  authorName: { type: String, required: true },
  authorTitle: { type: String, required: true },
  authorOriginImgUrl: { type: String, required: true },
  scrapedAt: { type: Date, required: true },
});

const HeroEquipmentSchema: Schema = new Schema(
  {
    heroId: { type: Types.ObjectId, ref: "Heroes", required: true },
    equipments: { type: [RecommendedSchema], required: true },
  },
  {
    collection: "RecommendedEquipments",
  }
);

const HeroEquipment: Model<HeroEquipmentDocument> =
  mongoose.models.RecommendedEquipments ||
  mongoose.model<HeroEquipmentDocument>(
    "RecommendedEquipments",
    HeroEquipmentSchema
  );

export default HeroEquipment;
