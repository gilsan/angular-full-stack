"use strict";
exports.__esModule = true;
var express = require("express");
var passport = require("passport");
var client_controller_1 = require("./client.controller");
exports.clientRouter = express.Router();
exports.clientRouter
    .route('/')
    .post(client_controller_1["default"].create)
    .get(client_controller_1["default"].findAll);
exports.clientRouter
    .route('/:id')
    .get(passport.authenticate('jwt', { session: false }), client_controller_1["default"].findOneById)["delete"](passport.authenticate('jwt', { session: false }), client_controller_1["default"]["delete"])
    .put(passport.authenticate('jwt', { session: false }), client_controller_1["default"].update);
