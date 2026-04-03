import { MongoClient, Db } from "mongodb";

const MONGODB_URI = process.env.MONGODB_URI || "";
const DB_NAME = "redoxdb";

let cachedClient: MongoClient | null = null;
let cachedDb: Db | null = null;

export async function getDb(): Promise<Db | null> {
  if (cachedDb) return cachedDb;
  if (!MONGODB_URI) {
    console.error("MONGODB_URI is not set");
    return null;
  }

  try {
    const client = new MongoClient(MONGODB_URI, {
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 5000,
    });
    await client.connect();
    cachedClient = client;
    cachedDb = client.db(DB_NAME);
    return cachedDb;
  } catch (err) {
    console.error("MongoDB connection failed:", err);
    return null;
  }
}

// Collection helpers — return null if DB unavailable
export async function getPages() {
  const db = await getDb();
  return db ? db.collection("pages") : null;
}

export async function getBlogs() {
  const db = await getDb();
  return db ? db.collection("blogs") : null;
}

export async function getMedia() {
  const db = await getDb();
  return db ? db.collection("media") : null;
}

export async function getUsers() {
  const db = await getDb();
  return db ? db.collection("users") : null;
}

export async function getSiteSettings() {
  const db = await getDb();
  return db ? db.collection("site_settings") : null;
}
