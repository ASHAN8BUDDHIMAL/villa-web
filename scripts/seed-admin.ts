import { config } from "dotenv";
config({ path: ".env.local" });

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const MONGODB_URI = process.env.MONGODB_URI!;
const ADMIN_EMAIL = process.env.ADMIN_EMAIL ?? "admin@villagalle.com";
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD ?? "changeme123";

const AdminSchema = new mongoose.Schema({
  email:    { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
const Admin = mongoose.models.Admin ?? mongoose.model("Admin", AdminSchema);

async function seed() {
  await mongoose.connect(MONGODB_URI);
  const existing = await Admin.findOne({ email: ADMIN_EMAIL });
  if (existing) {
    console.log("Admin already exists:", ADMIN_EMAIL);
  } else {
    const hash = await bcrypt.hash(ADMIN_PASSWORD, 12);
    await Admin.create({ email: ADMIN_EMAIL, password: hash });
    console.log("✅ Admin created:", ADMIN_EMAIL);
  }
  await mongoose.disconnect();
}

seed().catch(console.error);
