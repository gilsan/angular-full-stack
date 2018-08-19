"use strict";
exports.__esModule = true;
var jwt = require("jsonwebtoken");
var environment_1 = require("../../../../src/environments/environment");
exports["default"] = {
    sendJWTToken: function (req, res) {
        var token = jwt.sign({ id: req.currentUser._id }, environment_1.devConfig.secrete, { expiresIn: '1d' });
        console.log('sendJWTToken: ', token);
        res.redirect(environment_1.devConfig.frontendURL + "/dashboard/invoices/?token=" + token);
    },
    authenticate: function (req, res) {
        console.log('auth controller 인증');
        return res.send(true);
    },
    logout: function (req, res) {
        req.logout(); // remove the session and remove req.currentUser;
        return res.json({ success: true });
    }
};
