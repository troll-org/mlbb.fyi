import { User, Comment, Post, Reply } from "@prisma/client";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      ENV: string;
      NEXT_PUBLIC_BASE_URL: string;
      EMAIL_SERVER_HOST: string;
      EMAIL_SERVER_PORT: string;
      EMAIL_SERVER_USER: string;
      EMAIL_SERVER_PASSWORD: string;
      EMAIL_FROM: string;
      DATABASE_URL: string;
      DATABASE_URI: string;
      // NEXTAUTH_URL: string;
      // NEXTAUTH_SECRET: string;
      BE_API_URL: string;
      BE_API_SECRET: string;
      GOOGLE_CLIENT_ID: string;
      GOOGLE_CLIENT_SECRET: string;
      DISCORD_CLIENT_ID: string;
      DISCORD_CLIENT_SECRET: string;
      CLOUD_NAME: string;
      CDN_API_KEY: string;
      CDN_API_SECRET: string;
      CLOUDINARY_FOLDER: string;
      NEXT_PUBLIC_POSTHOG_KEY: string;
      NEXT_PUBLIC_POSTHOG_HOST: string;
    }
  }
}

export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified?: string;
};

export const HeroRole = [
  {
    key: "explane",
    label: "Exp",
  },
  {
    key: "jungle",
    label: "Jungle",
  },
  {
    key: "goldlane",
    label: "Gold",
  },
  {
    key: "roam",
    label: "Roam",
  },
  {
    key: "midlane",
    label: "Mid",
  },
];

export const HeroType = [
  {
    key: "fighter",
    label: "Fighter",
  },
  {
    key: "tank",
    label: "Tank",
  },
  {
    key: "marksman",
    label: "Marksman",
  },
  {
    key: "mage",
    label: "Mage",
  },
  {
    key: "support",
    label: "Support",
  },
  {
    key: "assassin",
    label: "Assassin",
  },
];

export interface Query {
  q?: string;
  type?: string;
  lane?: string;
}

export interface IFullComment extends Comment {
  replies: Reply[];
}

export interface IFullPost extends Post {
  comments: IFullComment[];
}
