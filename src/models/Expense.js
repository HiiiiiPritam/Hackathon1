import { Schema } from "mongoose";
import mongoose from "mongoose";

const ExpenseSchema = new Schema({
  budgetId: {
    type: mongoose.Types.ObjectId,
    ref: 'Budget',
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
}, { timestamps: true });

export const Expense = mongoose.models.Expense || mongoose.model("Expense", ExpenseSchema);
