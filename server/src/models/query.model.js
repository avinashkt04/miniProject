import mongoose, { Schema } from "mongoose";

const userQuerySchema = new Schema({
  symptoms: {
    type: [String],
    required: true,
  },
  prediction: {
    type: String,
    required: true,
  },
}, {timestamps: true});

export const UserQuery = mongoose.model("UserQuery", userQuerySchema);
