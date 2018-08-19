"use strict";
exports.__esModule = true;
var Joi = require("joi");
exports["default"] = {
    validateCreateSchema: function (body) {
        var schema = Joi.object().keys({
            firstName: Joi.string().required(),
            lastName: Joi.string().required(),
            email: Joi.string().email().required()
        });
        var _a = Joi.validate(body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    },
    validateUpdateSchema: function (body) {
        var schema = Joi.object().keys({
            firstName: Joi.string().optional(),
            lastName: Joi.string().optional(),
            email: Joi.string().email().optional()
        });
        var _a = Joi.validate(body, schema), error = _a.error, value = _a.value;
        if (error && error.details) {
            return { error: error };
        }
        return { value: value };
    }
};
