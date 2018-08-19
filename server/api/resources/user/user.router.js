"use strict";
exports.__esModule = true;
var express = require("express");
var passport = require("passport");
var user_controller_1 = require("./user.controller");
exports.userRouter = express.Router();
exports.userRouter.post('/signup', user_controller_1["default"].signup);
exports.userRouter.post('/login', user_controller_1["default"].login);
exports.userRouter.post('/test', passport.authenticate('jwt', { session: false }), user_controller_1["default"].test);
exports.userRouter.post('/forgot-password', user_controller_1["default"].forgotPassword),
    exports.userRouter.put('/reset-password', user_controller_1["default"].resetPassword);
