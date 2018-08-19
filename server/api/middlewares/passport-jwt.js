"use strict";
exports.__esModule = true;
var passportJWT = require("passport-jwt");
var passport = require("passport");
var user_model_1 = require("../resources/user/user.model");
var environment_1 = require("../../../src/environments/environment");
exports.configureJWTStrategy = function () {
    var opts = { jwtFromRequest: '', secretOrKey: '' };
    opts.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
    opts.secretOrKey = environment_1.devConfig.secrete;
    passport.use(new passportJWT.Strategy(opts, function (payload, done) {
        user_model_1["default"].findOne({ _id: payload.id }, function (err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            }
            else {
                return done(null, false);
                // or you could create a new account
            }
        });
    }));
};
