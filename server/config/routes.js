"use strict";
exports.__esModule = true;
var express = require("express");
var invoice_controller_1 = require("../api/controllers/invoice.controller");
exports.router = express.Router();
// Invoices
exports.router.get('/invoices', invoice_controller_1["default"].findAll);
exports.router.post('/invoices', invoice_controller_1["default"].create);
exports.router.get('/invoices/:_id', invoice_controller_1["default"].findOneById);
exports.router.put('/invoices/:id', invoice_controller_1["default"].update);
exports.router["delete"]('/invoices/:_id', invoice_controller_1["default"]["delete"]);
