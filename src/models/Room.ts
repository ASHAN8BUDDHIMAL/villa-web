import mongoose, { Schema, models } from "mongoose";

const RoomSchema = new Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  price:       { type: Number, required: true },
  image:       { type: String, required: true },
}, { timestamps: true });

export const Room = models.Room ?? mongoose.model("Room", RoomSchema);
