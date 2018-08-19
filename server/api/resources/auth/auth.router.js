"use strict";
exports.__esModule = true;
var express = require("express");
var passport = require("passport");
var auth_controller_1 = require("./auth.controller");
exports.authRouter = express.Router();
exports.authRouter.route('/test').get(function (req, res) {
    res.json({ mess: '성공이다.....' });
});
// auth Google
exports.authRouter.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
exports.authRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/failure' }), auth_controller_1["default"].sendJWTToken);
// Twitter
exports.authRouter.get('/twitter', passport.authenticate('twitter'));
exports.authRouter.get('/twitter/callback', passport.authenticate('twitter', { failureRedirect: '/failure' }), auth_controller_1["default"].sendJWTToken);
// Github
exports.authRouter.get('/github', passport.authenticate('github'));
exports.authRouter.get('/github/callback', passport.authenticate('github', { failureRedirect: '/failure' }), auth_controller_1["default"].sendJWTToken);
exports.authRouter.get('/authenticate', passport.authenticate('jwt', { session: false }), auth_controller_1["default"].authenticate);
exports.authRouter.get('/logout', passport.authenticate('jwt, {session: false'), auth_controller_1["default"].logout);
