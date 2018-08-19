"use strict";
exports.__esModule = true;
var invoice_model_1 = require("../models/invoice.model");
var Joi = require("joi");
var HttpStatus = require("http-status-code");
exports["default"] = {
    findAll: function (req, res, next) {
        var _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.perPage, perPage = _c === void 0 ? 10 : _c, filter = _a.filter, sortField = _a.sortField, sortDir = _a.sortDir;
        var options = {
            page: parseInt(page, 10),
            limit: parseInt(perPage, 10)
        };
        var query = {};
        if (filter) {
            query.item = { $regex: filter };
        }
        if (sortField && sortDir) {
            options.sort = (_d = {}, _d[sortField] = sortDir, _d);
        }
        console.log(query, options);
        invoice_model_1["default"].paginate(query, options)
            .then(function (invoices) { return res.json(invoices); })["catch"](function (err) { return res.status(HttpStatus.getMessage(400)).json(err); });
        var _d;
    },
    create: function (req, res, next) {
        var schema = Joi.object().keys({
            item: Joi.string().required(),
            qty: Joi.number().integer().required(),
            date: Joi.date().required(),
            due: Joi.date().required(),
            tax: Joi.number().optional(),
            rate: Joi.number().optional()
        });
        var _a = Joi.validate(req.body, schema), error = _a.error, value = _a.value;
        console.log(value);
        if (error && error.details) {
            return res.status(400).json(error);
        }
        invoice_model_1["default"].create(value)
            .then(function (invoice) { res.json(invoice); })["catch"](function (err) { res.json(err); });
    },
    findOneById: function (req, res) {
        var id = req.params;
        invoice_model_1["default"].findById(id)
            .then(function (item) {
            if (!item) {
                return res.status(400).json({ msg: '자료가 없습니다...' });
            }
            else {
                return res.status(200).json(item);
            }
        })["catch"](function (err) { return res.status(400).json(err); });
    },
    "delete": function (req, res) {
        var id = req.params;
        invoice_model_1["default"].findByIdAndRemove(id)
            .then(function (item) {
            if (!item) {
                return res.status(400).json({ msg: '자료가 없습니다...' });
            }
            else {
                return res.status(200).json(item);
            }
        })["catch"](function (err) { return res.status(400).json(err); });
    },
    update: function (req, res) {
        var id = req.params.id;
        var schema = Joi.object().keys({
            item: Joi.string().optional(),
            qty: Joi.number().optional(),
            date: Joi.date().optional(),
            due: Joi.date().optional(),
            tax: Joi.number().optional(),
            rate: Joi.number().optional()
        });
        var _a = Joi.validate(req.body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return res.status(400).json(error);
        }
        console.log(id, value);
        invoice_model_1["default"].findOneAndUpdate({ _id: id }, value, { "new": true })
            .then(function (invoice) { res.json(invoice); })["catch"](function (err) { res.json(err); });
    }
};
