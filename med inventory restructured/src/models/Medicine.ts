import mongoose, { Schema, Document } from "mongoose";

export interface Medicine extends Document {
  name: string;
  manufacturer: string;
  price: number;
  quantity: number;
}

const MedicineSchema: Schema = new Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
});

export default mongoose.model<Medicine>("Medicine", MedicineSchema);
