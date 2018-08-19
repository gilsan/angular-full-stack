"use strict";
exports.__esModule = true;
var express = require("express");
var invoice_controller_1 = require("./invoice.controller");
exports.invoiceRouter = express.Router();
exports.invoiceRouter
    .route('/')
    .post(invoice_controller_1["default"].create)
    .get(invoice_controller_1["default"].findAll);
exports.invoiceRouter
    .route('/:id')
    .get(invoice_controller_1["default"].findOneById)
    .put(invoice_controller_1["default"].update)["delete"](invoice_controller_1["default"]["delete"]);
exports.invoiceRouter
    .get('/:id/download', invoice_controller_1["default"].download);
