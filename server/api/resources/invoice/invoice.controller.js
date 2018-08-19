"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = y[op[0] & 2 ? "return" : op[0] ? "throw" : "next"]) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [0, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var invoice_model_1 = require("./invoice.model");
var Joi = require("joi");
var HttpStatus = require("http-status-code");
var invoice_service_1 = require("./invoice.service");
var user_service_1 = require("../user/user.service");
exports["default"] = {
    findAll: function (req, res, next) {
        console.log(req.query);
        var _a = req.query, _b = _a.page, page = _b === void 0 ? 1 : _b, _c = _a.perPage, perPage = _c === void 0 ? 10 : _c, filter = _a.filter, sortField = _a.sortField, sortDir = _a.sortDir;
        var options = {
            page: parseInt(page, 10),
            limit: parseInt(perPage, 10),
            populate: 'client'
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
            client: Joi.string().required(),
            date: Joi.date().required(),
            due: Joi.date().required(),
            tax: Joi.number().optional(),
            rate: Joi.number().optional()
        });
        var _a = Joi.validate(req.body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return res.status(400).json(error);
        }
        console.log('입력: ', value);
        invoice_model_1["default"].create(value)
            .then(function (invoice) {
            console.log('생성: ', invoice);
            res.json(invoice);
        })["catch"](function (err) { res.json(err); });
    },
    findOne: function (req, res) {
        var id = req.params.id;
        invoice_model_1["default"].findById(id)
            .then(function (invoice) {
            if (!invoice) {
                return res.status(400).json({ err: 'Could not find any invoice' });
            }
            return res.json(invoice);
        })["catch"](function (err) { return res.status(400).json(err); });
    },
    findOneById: function (req, res) {
        var id = req.params.id;
        //   console.log('id: ', id);
        invoice_model_1["default"].findById(id)
            .populate('client')
            .then(function (invoice) {
            //  console.log('findeOnyById invoice: ', invoice);
            if (!invoice) {
                return res.status(400).json({ msg: '자료가 없습니다...' });
            }
            else {
                return res.status(200).json(invoice);
            }
        })["catch"](function (err) { console.log('에러: ', err); res.status(400).json(err); });
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
            rate: Joi.number().optional(),
            client: Joi.string().optional()
        });
        var _a = Joi.validate(req.body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return res.status(400).json(error);
        }
        console.log(id, value);
        invoice_model_1["default"].findOneAndUpdate({ _id: id }, value, { "new": true })
            .then(function (invoice) { res.json(invoice); })["catch"](function (err) { res.json(err); });
    },
    download: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var id, invoice, _a, subTotal, total, user, templateBody, html, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        id = req.params.id;
                        return [4 /*yield*/, invoice_model_1["default"].findById(id).populate('client')];
                    case 1:
                        invoice = _b.sent();
                        if (!invoice) {
                            return [2 /*return*/, res.status(400).send({ err: 'could not find any invoices' })];
                        }
                        _a = invoice_service_1["default"].getTotal(invoice), subTotal = _a.subTotal, total = _a.total;
                        user = user_service_1["default"].getUser(req.currentUser);
                        templateBody = invoice_service_1["default"].getTemplateBody(invoice, subTotal, total, user);
                        html = invoice_service_1["default"].getInvoiceTemplate(templateBody, subTotal, total);
                        res.pdfFromHTML({
                            filename: '${invoice.item}.pdf',
                            htmlContent: html
                        });
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _b.sent();
                        res.status(500).json({ err: 'pdf error' });
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        });
    }
};
