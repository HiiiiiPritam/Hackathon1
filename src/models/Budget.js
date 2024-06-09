import { Schema } from "mongoose";
import mongoose from "mongoose";

const BudgetSchema = new Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  assignedAmount: {
    monthly: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
  },
  actualSpent: {
    monthly: { type: Number, default: 0 },
    weekly: { type: Number, default: 0 },
    daily: { type: Number, default: 0 },
  },
  categories: {
    type: [String],
    default: [],
  },
  expenses: [{
    type: mongoose.Types.ObjectId,
    ref: 'Expense',
  }],
}, { timestamps: true });

export const Budget = mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
