
import * as express from 'express';
import * as passport from 'passport';

import invoiceController from './invoice.controller';

export const invoiceRouter = express.Router();
invoiceRouter
.route('/')
.post(  invoiceController.create)
.get(  invoiceController.findAll);

invoiceRouter
.route('/:id')
.get(invoiceController.findOneById)
.put(invoiceController.update)
.delete(  invoiceController.delete);

invoiceRouter
.get('/:id/download', invoiceController.download);




