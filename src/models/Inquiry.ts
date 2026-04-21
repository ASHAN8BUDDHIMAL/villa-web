import mongoose, { Schema, models } from "mongoose";

const InquirySchema = new Schema({
  name:     { type: String, required: true },
  email:    { type: String, required: true },
  message:  { type: String, required: true },
  checkIn:  { type: String, default: "" },
  checkOut: { type: String, default: "" },
  read:     { type: Boolean, default: false },
}, { timestamps: true });

export const Inquiry = models.Inquiry ?? mongoose.model("Inquiry", InquirySchema);
