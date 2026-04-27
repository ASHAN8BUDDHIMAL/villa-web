import mongoose, { Schema, models } from "mongoose";

const FeatureSchema = new Schema({
  icon:  { type: String, default: "" },
  title: { type: String, default: "" },
  desc:  { type: String, default: "" },
}, { _id: false });

const TimelineSchema = new Schema({
  year:  { type: String, default: "" },
  event: { type: String, default: "" },
}, { _id: false });

const ValueSchema = new Schema({
  title: { type: String, default: "" },
  desc:  { type: String, default: "" },
}, { _id: false });

const ContactDetailSchema = new Schema({
  label: { type: String, default: "" },
  value: { type: String, default: "" },
  href:  { type: String, default: "" },
}, { _id: false });

const FaqSchema = new Schema({
  q: { type: String, default: "" },
  a: { type: String, default: "" },
}, { _id: false });

const AmenitySchema = new Schema({
  title: { type: String, default: "" },
  desc:  { type: String, default: "" },
}, { _id: false });

const SiteContentSchema = new Schema({
  hero: {
    tagline:        { type: String, default: "" },
    title:          { type: String, default: "" },
    subtitle:       { type: String, default: "" },
    images:         { type: [String], default: [] },
    autoScroll:     { type: Boolean, default: true },
    scrollInterval: { type: Number, default: 5 },
  },
  intro:    { type: String, default: "" },
  features: { type: [FeatureSchema], default: [] },
  quote:    { type: String, default: "" },
  cta: {
    title:    { type: String, default: "" },
    subtitle: { type: String, default: "" },
  },
  about: {
    story:    { type: [String], default: [] },
    timeline: { type: [TimelineSchema], default: [] },
    values:   { type: [ValueSchema], default: [] },
  },
  contact: {
    details:  { type: [ContactDetailSchema], default: [] },
    faqs:     { type: [FaqSchema], default: [] },
  },
  amenities: { type: [AmenitySchema], default: [] },
}, { timestamps: true });

export const SiteContent = models.SiteContent ?? mongoose.model("SiteContent", SiteContentSchema);
