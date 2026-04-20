import mongoose, { Schema, models } from "mongoose";

const FeatureSchema = new Schema({ icon: String, title: String, desc: String }, { _id: false });

const SiteContentSchema = new Schema({
  hero: {
    tagline:  { type: String, default: "Southern Coast · Sri Lanka" },
    title:    { type: String, default: "Villa Galle" },
    subtitle: { type: String, default: "A boutique luxury retreat where the Indian Ocean meets tropical serenity." },
  },
  features: { type: [FeatureSchema], default: [
    { icon: "🌊", title: "Ocean Views",      desc: "Wake up to the sound of waves and panoramic Indian Ocean vistas." },
    { icon: "🌿", title: "Tropical Gardens", desc: "Lush private gardens with native flora surrounding every corner." },
    { icon: "🍽️", title: "Private Dining",   desc: "Bespoke dining experiences crafted by our in-house chef." },
    { icon: "🧘", title: "Wellness",          desc: "Yoga pavilion, spa treatments and infinity pool at your leisure." },
  ]},
  cta: {
    title:    { type: String, default: "Begin Your Journey" },
    subtitle: { type: String, default: "Reserve your stay at Villa Galle and experience the finest hospitality on Sri Lanka's southern coast." },
  },
}, { timestamps: true });

export const SiteContent = models.SiteContent ?? mongoose.model("SiteContent", SiteContentSchema);
