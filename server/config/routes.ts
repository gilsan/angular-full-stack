import * as express from 'express';
import invoiceController from '../api/controllers/invoice.controller';
export const router = express.Router();


// Invoices
 router.get('/invoices', invoiceController.findAll);
 router.post('/invoices', invoiceController.create);
 router.get('/invoices/:_id', invoiceController.findOneById);
 router.put('/invoices/:id', invoiceController.update);
 router.delete('/invoices/:_id', invoiceController.delete);
