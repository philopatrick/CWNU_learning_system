import { MongoClient, type Db, type WithId, type Document } from "mongodb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function connectDatabase(uri: string, dbName: string): Promise<Db> {
  if (cachedDb) {
    return cachedDb;
  }

  const client = new MongoClient(uri);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(dbName);

  return cachedDb;
}

export function getDatabase(): Db {
  if (!cachedDb) {
    throw new Error("Database not initialized. Call connectDatabase() first.");
  }
  return cachedDb;
}

export function getCollection<T extends Document>(name: string) {
  return getDatabase().collection<T>(name);
}

export async function disconnectDatabase(): Promise<void> {
  if (cachedClient) {
    await cachedClient.close();
    cachedClient = null;
    cachedDb = null;
  }
}
