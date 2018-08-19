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
var bcryptjs = require("bcryptjs");
var jwt = require("jsonwebtoken");
var user_service_1 = require("./user.service");
var user_model_1 = require("./user.model");
var util_1 = require("../../modules/util");
var environment_1 = require("../../../../src/environments/environment");
var mail_1 = require("../../modules/mail");
exports["default"] = {
    signup: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, value, existingUser, user, salt, hash, err_1;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 6, , 7]);
                        _a = user_service_1["default"].validateSignupSchema(req.body), error = _a.error, value = _a.value;
                        if (error && error.details) {
                            return [2 /*return*/, res.status(500).json(error)];
                        }
                        return [4 /*yield*/, user_model_1["default"].findOne({ 'local.email': value.email })];
                    case 1:
                        existingUser = _b.sent();
                        if (existingUser) {
                            return [2 /*return*/, res.status(400).json({ err: 'You have already created account.' })];
                        }
                        return [4 /*yield*/, new user_model_1["default"]({})];
                    case 2:
                        user = _b.sent();
                        user.local.email = value.email;
                        user.local.name = value.name;
                        return [4 /*yield*/, bcryptjs.genSalt()];
                    case 3:
                        salt = _b.sent();
                        return [4 /*yield*/, bcryptjs.hash(value.password, salt)];
                    case 4:
                        hash = _b.sent();
                        user.local.password = hash;
                        return [4 /*yield*/, user.save()];
                    case 5:
                        _b.sent();
                        return [2 /*return*/, res.json({ success: true, message: 'User created successfully' })];
                    case 6:
                        err_1 = _b.sent();
                        return [2 /*return*/, res.status(500).json(err_1)];
                    case 7: return [2 /*return*/];
                }
            });
        });
    },
    login: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, error, value, user, matched, token, err_2;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 2, , 3]);
                        _a = user_service_1["default"].validateLoginSchema(req.body), error = _a.error, value = _a.value;
                        console.log('로그인1:', value);
                        if (error && error.details) {
                            return [2 /*return*/, res.status(400).json({ success: false, err: error })];
                        }
                        return [4 /*yield*/, user_model_1["default"].findOne({ 'local.email': value.email })];
                    case 1:
                        user = _b.sent();
                        console.log('로그인2:', user);
                        if (!user) {
                            return [2 /*return*/, res.status(400).json({ err: '이메일주소 또는 암호가 틀립니다.' })];
                        }
                        matched = bcryptjs.compare(value.password, user.password);
                        if (!matched) {
                            return [2 /*return*/, res.status(400).json({ success: false, err: '이메일주소 또는 암호가 틀립니다.' })];
                        }
                        token = jwt.sign({ id: user._id }, environment_1.devConfig.secrete, { expiresIn: '2d' });
                        return [2 /*return*/, res.json({ success: true, token: token })];
                    case 2:
                        err_2 = _b.sent();
                        console.log('로그인 에러:', err_2);
                        return [2 /*return*/, res.status(400).joson({ success: false, err: '이메일주소 또는 암호 확인하세요.' })];
                    case 3: return [2 /*return*/];
                }
            });
        });
    },
    test: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, res.json(req.user)];
            });
        });
    },
    forgotPassword: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var _a, value, error, criteria, user, token, resetLink, sanitizedUser, results, err_3;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        _b.trys.push([0, 3, , 4]);
                        _a = user_service_1["default"].validateForgotSchema(req.body), value = _a.value, error = _a.error;
                        if (error && error.details) {
                            return [2 /*return*/, res.status(500).json(error)];
                        }
                        criteria = {
                            $or: [
                                { 'google.email': value.email },
                                { 'github.email': value.email },
                                { 'twitter.email': value.email },
                                { 'local.email': value.email },
                            ]
                        };
                        return [4 /*yield*/, user_model_1["default"].findOne(criteria)];
                    case 1:
                        user = _b.sent();
                        if (!user) {
                            return [2 /*return*/, res.status(500).json({ err: '사용자가 없습니다.' })];
                        }
                        token = util_1.getJWTToken({ id: user._id });
                        resetLink = "\n            <h4>Please click on the link to reset the password</h4>\n            <a herf='" + environment_1.devConfig.frontendURL + "/reset-password/" + token + "'>Reset Password</a>\n       ";
                        sanitizedUser = user_service_1["default"].getUser(user);
                        return [4 /*yield*/, mail_1.sendEmail({
                                html: resetLink,
                                subject: '암호를 잊어버렸습니다.',
                                email: sanitizedUser.email
                            })];
                    case 2:
                        results = _b.sent();
                        return [2 /*return*/, res.json(results)];
                    case 3:
                        err_3 = _b.sent();
                        return [2 /*return*/, res.status(500).json(err_3)];
                    case 4: return [2 /*return*/];
                }
            });
        });
    },
    resetPassword: function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var password, user, sanitizedUser, hash, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        password = req.body.password;
                        if (!password) {
                            return [2 /*return*/, res.status(500).json({ err: '비밀번호가 없습니다.' })];
                        }
                        return [4 /*yield*/, user_model_1["default"].findById(req.currentUser._id)];
                    case 1:
                        user = _a.sent();
                        sanitizedUser = user_service_1["default"].getUser(user);
                        if (!user.local.email) {
                            user.local.email = sanitizedUser.email;
                            user.local.name = sanitizedUser.name;
                        }
                        return [4 /*yield*/, util_1.getEncryptedPassword(password)];
                    case 2:
                        hash = _a.sent();
                        user.local.password = hash;
                        return [4 /*yield*/, user.save()];
                    case 3:
                        _a.sent();
                        return [2 /*return*/, res.json({ success: true })];
                    case 4:
                        err_4 = _a.sent();
                        return [2 /*return*/, res.status(500).json(err_4)];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
};
