"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports["default"] = {
    validateSignupSchema: function (body) {
        var schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required(),
            name: Joi.string().required()
        });
        var _a = Joi.validate(body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    },
    validateLoginSchema: function (body) {
        var schema = Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().required()
        });
        var _a = Joi.validate(body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    },
    validateForgotSchema: function (body) {
        var schema = Joi.object().keys({
            email: Joi.string().email().required()
        });
        var _a = Joi.validate(body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    },
    getUser: function (user) {
        var rsp = {};
        if (user.local.email) {
            rsp.name = user.local.name;
            rsp.email = user.local.email;
        }
        if (user.google.email) {
            rsp.name = user.google.displayName;
            rsp.email = user.google.email;
        }
        if (user.github.email) {
            rsp.name = user.github.displayName;
            rsp.email = user.github.email;
        }
        if (user.twitter.username) {
            rsp.name = user.github.displayName;
            rsp.email = user.github.username;
        }
        return rsp;
    }
};
