import mongoose, { Schema, models } from "mongoose";

const FeatureSchema = new Schema({
  icon:  { type: String, default: "" },
  title: { type: String, default: "" },
  desc:  { type: String, default: "" },
}, { _id: false });

const SiteContentSchema = new Schema({
  hero: {
    tagline:  { type: String, default: "" },
    title:    { type: String, default: "" },
    subtitle: { type: String, default: "" },
  },
  features: { type: [FeatureSchema], default: [] },
  cta: {
    title:    { type: String, default: "" },
    subtitle: { type: String, default: "" },
  },
}, { timestamps: true });

export const SiteContent = models.SiteContent ?? mongoose.model("SiteContent", SiteContentSchema);
