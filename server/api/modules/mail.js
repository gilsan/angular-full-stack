"use strict";
exports.__esModule = true;
var nodemailer = require("nodemailer");
var htmlToText = require("html-to-text");
var environment_1 = require("../../../src/environments/environment");
exports.sendEmail = function (options) {
    return new Promise(function (resolve, reject) {
        var transpoter = nodemailer.createTransport({
            host: environment_1.devConfig.ethereal.host,
            port: environment_1.devConfig.ethereal.port,
            auth: {
                user: environment_1.devConfig.ethereal.username,
                pass: environment_1.devConfig.ethereal.password
            }
        });
        var text = htmlToText.fromString(options.html, {
            wordwrap: 130
        });
        var mailOptions = {
            from: '"Haider Malik 👻" <noreplay@fulltsackhour.com>',
            to: options.email,
            subject: options.subject,
            text: text,
            html: options.html
        };
        transpoter.sendMail(mailOptions, function (error, info) {
            if (error) {
                return reject(error);
            }
            console.log('Message id ', info.messageId);
            console.log('Preview URL ', nodemailer.getTestMessageUrl(info));
            return resolve({ message: 'Reset Email has sent to your inbox' });
        });
    });
};
