import { MongoClient } from "mongodb";
import { config } from "dotenv";

config({ path: ".env.local" });

const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ MONGODB_URI is not set in .env.local");
  process.exit(1);
}

async function testConnection() {
  const client = new MongoClient(uri!);
  try {
    await client.connect();
    await client.db("admin").command({ ping: 1 });
    console.log("✅ MongoDB connection successful");
  } catch (err) {
    console.error("❌ MongoDB connection failed:", err);
  } finally {
    await client.close();
  }
}

testConnection();
