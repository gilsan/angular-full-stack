"use strict";
exports.__esModule = true;
var express = require("express");
var logger = require("morgan");
var swaggerUi = require("swagger-ui-express");
var cors = require("cors");
var passport = require("passport");
var session = require("express-session");
var pdf = require("express-pdf");
var passport_jwt_1 = require("./passport-jwt");
var passport_google_1 = require("./passport-google");
var passport_twitter_1 = require("./passport-twitter");
var passport_github_1 = require("./passport-github");
var environment_1 = require("../../../src/environments/environment");
var user_model_1 = require("../resources/user/user.model");
var bodyParser = require('body-parser');
var swaggerDocument = require('../../config/swagger.json');
exports.setGlobalMiddleware = function (app) {
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(cors());
    app.use(pdf);
    app.use(logger('dev'));
    app.use(session({
        secret: environment_1.devConfig.secrete,
        resave: true,
        saveUnintialized: true
    }));
    app.use(passport.initialize({ userProperty: 'currentUser' }));
    app.use(passport.session());
    passport_jwt_1.configureJWTStrategy();
    passport_google_1.configureGoogleStrategy();
    passport_twitter_1.configureTwitterStrategy();
    passport_github_1.configureGithubStrategy();
    // save user into session
    // req.session.user = {userId}
    passport.serializeUser(function (user, done) {
        done(null, user._id);
    });
    // extract the userId from session
    passport.deserializeUser(function (id, done) {
        user_model_1["default"].findById(id, function (err, user) {
            done(null, user);
        });
    });
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, { explorer: true }));
};
