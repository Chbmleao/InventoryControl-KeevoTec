import mongoose, { Document, Schema } from "mongoose";

export interface Item extends Document {
  description: string;
  quantity: number;
  measureUnit: string;
}

const itemSchema = new Schema<Item>({
  description: String,
  quantity: Number,
  measureUnit: String,
});

const ItemModel = mongoose.model<Item>("Item", itemSchema);

export default ItemModel;
