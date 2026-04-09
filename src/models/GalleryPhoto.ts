import mongoose, { Schema, models } from "mongoose";

const GalleryPhotoSchema = new Schema({
  url:     { type: String, required: true },
  caption: { type: String, default: "" },
  span:    { type: String, default: "" }, // e.g. "lg:col-span-2"
  order:   { type: Number, default: 0 },
}, { timestamps: true });

export const GalleryPhoto = models.GalleryPhoto ?? mongoose.model("GalleryPhoto", GalleryPhotoSchema);
