import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI!;
const DB_NAME = "redoxdb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db> {
  if (cachedDb) return cachedDb;

  const client = new MongoClient(MONGODB_URI);
  await client.connect();
  cachedClient = client;
  cachedDb = client.db(DB_NAME);
  return cachedDb;
}

// Collection helpers
export async function getPages() {
  const db = await getDb();
  return db.collection("pages");
}

export async function getBlogs() {
  const db = await getDb();
  return db.collection("blogs");
}

export async function getMedia() {
  const db = await getDb();
  return db.collection("media");
}

export async function getUsers() {
  const db = await getDb();
  return db.collection("users");
}

export async function getSiteSettings() {
  const db = await getDb();
  return db.collection("site_settings");
}
