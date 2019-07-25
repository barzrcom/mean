"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose = require("mongoose");
var supplierSchema = new mongoose.Schema({
    supplierName: String,
    address: String,
    phoneNumber: Number,
    faxNumber: Number,
    email: { type: String, unique: true, lowercase: true, trim: true },
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now },
    date: { type: String, required: true },
    id: { type: String, required: true },
    payment: { type: String, required: true },
    /**almost */
    invoiceScheme: { date: [String], id: [String],
        payment: [String] }
    /**doesnt work-> */
    /* invoiceScheme: { date: {type: String, required: true}, id: { type: String, required: true},
     payment: {type: String, required: true}}*/
});
/*
doesnt work
const SupplierInvoiceScheme = new mongoose.Schema({
    date: {type: String, required: true},
    id: {type: String, required: true},
    payment: {type: String, required: true}
    });*/
var Supplier = mongoose.model('Supplier', supplierSchema);
exports.default = Supplier;
//# sourceMappingURL=supplier.js.map