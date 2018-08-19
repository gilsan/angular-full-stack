"use strict";
exports.__esModule = true;
var express = require("express");
var mongoose = require("mongoose");
// import * as logger from 'morgan';
// import * as swaggerUi from 'swagger-ui-express';
// import * as cors from 'cors';
var global_middleware_1 = require("./api/middlewares/global-middleware");
// import  swaggerDocument from './config/swagger.json';
// import { router } from './config/routes';
var api_1 = require("./api");
// const bodyParser = require('body-parser');
// const swaggerDocument = require('./config/swagger.json');
mongoose.connect('mongodb://localhost/invoice-builder');
var app = express();
var PORT = 3000;
global_middleware_1.setGlobalMiddleware(app);
/*
 app.use(bodyParser.json());
 app.use(express.urlencoded());
 app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true}));
 app.use(logger('dev'));
 app.use(cors());
 */
app.use('/api', api_1.restRouter);
app.use(function (error, req, res, next) {
    res.status(error.status || 500);
    return res.json({ error: { message: error.message } });
});
var httpServer = app.listen(PORT, function () {
    console.log('HTTP SERVER Running port 3000 ......');
});
