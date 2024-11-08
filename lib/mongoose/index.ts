import mongoose, { ConnectOptions, Mongoose } from "mongoose";

if (!process.env.DATABASE_URI) {
  throw new Error('Invalid/Missing environment variable: "DATABASE_URI"');
}

const baseUri = process.env.DATABASE_URI;

const options = {};

let clientPromise: (dbName: string) => Promise<Mongoose>;

const connectToDatabase = (dbName: string): Promise<Mongoose> => {
  const uri = `${baseUri}/${dbName}`;
  return mongoose.connect(uri, options as ConnectOptions);
};

if (process.env.NODE_ENV === "development") {
  let globalMongo = global as typeof globalThis & {
    isConnected?: { [key: string]: Promise<Mongoose> };
  };

  if (!globalMongo.isConnected) {
    globalMongo.isConnected = {};
  }

  clientPromise = (dbName: string) => {
    if (globalMongo.isConnected && !globalMongo.isConnected[dbName]) {
      globalMongo.isConnected[dbName] = connectToDatabase(dbName);
    }
    return globalMongo.isConnected
      ? globalMongo.isConnected[dbName]
      : connectToDatabase(dbName);
  };
} else {
  clientPromise = (dbName: string) => connectToDatabase(dbName);
}

export default clientPromise;
