export const HeroRole = [
  {
    name: "Jungle",
  },
  {
    name: "Mid",
  },
  {
    name: "Exp",
  },
  {
    name: "Gold",
  },
  {
    name: "Roam",
  },
];

export const HeroType = [
  {
    name: "Assassin",
  },
  {
    name: "Fighter",
  },
  {
    name: "Mage",
  },
  {
    name: "Support",
  },
  {
    name: "Tank",
  },
];

export interface Query {
  q?: string;
  type?: string;
  lane?: string;
}
