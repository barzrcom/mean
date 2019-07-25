"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var invoiceSchema = new mongoose.Schema({
    username: String,
    invoiceId: Number,
    supplierName: String,
    totalPayment: Number,
    createdAt: { type: Date, default: Date.now }
});
var Invoice = mongoose.model('Invoice', invoiceSchema);
exports.default = Invoice;
//# sourceMappingURL=invoice.js.map