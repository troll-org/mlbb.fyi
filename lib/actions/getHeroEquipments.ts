import clientPromise from "@/lib/mongoose";
import HeroEquipment from "@/lib/mongoose/schema/heroes-equipment";
import { Types } from "mongoose";

export default async function getEquipmentsByHeroId(heroId: string) {
  try {
    await clientPromise("game-core");
    const heroEquipments = await HeroEquipment.aggregate([
      {
        $match: {
          heroId: new Types.ObjectId(heroId),
        },
      },
      {
        $unwind: "$equipments",
      },
      {
        $lookup: {
          from: "Skills",
          localField: "equipments.skillId",
          foreignField: "_id",
          as: "equipments.skill",
        },
      },
      {
        $lookup: {
          from: "Talents",
          localField: "equipments.talentId",
          foreignField: "_id",
          as: "equipments.talent",
        },
      },
      {
        $lookup: {
          from: "Emblems",
          localField: "equipments.emblemId1",
          foreignField: "_id",
          as: "equipments.emblem1",
        },
      },
      {
        $lookup: {
          from: "Emblems",
          localField: "equipments.emblemId2",
          foreignField: "_id",
          as: "equipments.emblem2",
        },
      },
      {
        $lookup: {
          from: "Emblems",
          localField: "equipments.emblemId3",
          foreignField: "_id",
          as: "equipments.emblem3",
        },
      },
      {
        $lookup: {
          from: "Equipments",
          localField: "equipments.equipmentsId",
          foreignField: "_id",
          as: "equipments.equipmentDetails",
        },
      },
      {
        $addFields: {
          "equipments.emblems": {
            $concatArrays: [
              "$equipments.emblem1",
              "$equipments.emblem2",
              "$equipments.emblem3",
            ],
          },
        },
      },
      {
        $project: {
          "equipments.skillId": 0,
          "equipments.talentId": 0,
          "equipments.emblemId1": 0,
          "equipments.emblemId2": 0,
          "equipments.emblemId3": 0,
          "equipments.equipmentsId": 0,
          "equipments.scrapedAt": 0,
          "equipments.skill._id": 0,
          "equipments.talent": 0,
          "equipments.emblem1": 0,
          "equipments.emblem2": 0,
          "equipments.emblem3": 0,
          "equipments.equipmentDetails._id": 0,
          "equipments.emblems._id": 0,
        },
      },
      {
        $group: {
          _id: "$_id",
          equipments: { $push: "$equipments" },
        },
      },
    ]);
    return heroEquipments.length > 0 ? heroEquipments[0].equipments[0] : [];
  } catch (error) {
    console.error("Error fetching hero equipments:", error);
    throw new Error("Failed to fetch hero equipments");
  }
}
