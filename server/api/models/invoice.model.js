"use strict";
exports.__esModule = true;
var mongoose = require("mongoose");
var mongoosePaginate = require("mongoose-paginate");
var Schema = mongoose.Schema;
var InvoiceSchema = new Schema({
    item: { type: String, required: true },
    qty: { type: String, required: true },
    date: { type: Date, required: true },
    due: { type: Date, required: true },
    rate: { type: Number },
    tax: { type: Number }
});
InvoiceSchema.plugin(mongoosePaginate);
exports["default"] = mongoose.model('Invoice', InvoiceSchema);
