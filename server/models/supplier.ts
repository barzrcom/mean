import * as mongoose from "mongoose";
import User from "./user";

const supplierSchema = new mongoose.Schema({
  supplierName: String,
  address: String,
  phoneNumber: Number,
  faxNumber: Number,
  email: { type: String, unique: true, lowercase: true, trim: true },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  createdAt: { type: Date, default: Date.now },
  invoiceScheme: { date: String, id: String, payment: String }
});

const Supplier = mongoose.model("Supplier", supplierSchema);

export default Supplier;
