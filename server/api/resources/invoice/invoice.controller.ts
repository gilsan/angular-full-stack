import Invoice from './invoice.model';
import * as Joi from 'joi';
import * as HttpStatus from 'http-status-code';
import invoiceService from './invoice.service';
import userService from '../user/user.service';

export default {
  findAll(req, res, next) {
    console.log(req.query);
    const {page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
    const options = {
       page: parseInt(page, 10),
       limit: parseInt(perPage, 10),
      populate: 'client',
    };
      const query = {};
      if (filter) {
        query.item = { $regex: filter, };
      }
      if (sortField && sortDir) {
        options.sort = { [sortField]: sortDir, };
      }
     console.log(query, options);
      Invoice.paginate(query, options)
      .then(invoices => res.json(invoices) )
      .catch( err => res.status(HttpStatus.getMessage(400)).json(err));


  },

  create(req , res, next) {
      const schema =  Joi.object().keys({
        item: Joi.string().required(),
        qty: Joi.number().integer().required(),
        client: Joi.string().required(),
        date:  Joi.date().required(),
        due: Joi.date().required(),
        tax: Joi.number().optional(),
        rate: Joi.number().optional(),

      });

      const { error, value } = Joi.validate(req.body, schema);

      if (error && error.details ) {
        return res.status(400).json(error);
      }
      console.log('입력: ', value);
    Invoice.create(value)
      .then(invoice => {
        console.log('생성: ', invoice);
        res.json(invoice);
       } )
      .catch( err => { res.json(err); } );
  },
  findOne(req, res) {
    const { id } = req.params;
    Invoice.findById(id)
      .then(invoice => {
        if (!invoice) {
          return res.status(400).json({ err: 'Could not find any invoice' });
        }
        return res.json(invoice);
      })
      .catch(err => res.status(400).json(err));
  },


  findOneById(req, res) {
       const {  id }  = req.params;
     //   console.log('id: ', id);
       Invoice.findById(id)
        .populate('client')
         .then( invoice => {
         //  console.log('findeOnyById invoice: ', invoice);
           if (!invoice) {
            return res.status(400).json({ msg: '자료가 없습니다...'});
           } else {
             return res.status(200).json(invoice);
           }
          })
         .catch(err => { console.log('에러: ', err);       res.status(400).json(err); });
  },

  delete(req, res) {
    const id = req.params;
    Invoice.findByIdAndRemove(id)
    .then(item => {
      if (!item) {
       return res.status(400).json({ msg: '자료가 없습니다...'});
      } else {
        return res.status(200).json(item);
      }
     })
    .catch(err => res.status(400).json(err));
  },

  update(req, res) {
       const { id } = req.params;

    const schema =  Joi.object().keys({
      item: Joi.string().optional(),
      qty: Joi.number().optional(),
      date:  Joi.date().optional(),
      due: Joi.date().optional(),
      tax: Joi.number().optional(),
      rate: Joi.number().optional(),
      client: Joi.string().optional()
    });

    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details ) {
      return res.status(400).json(error);
    }
    console.log(id, value);
  Invoice.findOneAndUpdate({_id: id}, value, { new: true})
    .then(invoice => { res.json(invoice); } )
    .catch( err => { res.json(err); } );
  },

  async download(req, res) {
    try {

      const { id } = req.params;
      const invoice = await Invoice.findById(id).populate('client');
      if (!invoice) {
           return res.status(400).send({err: 'could not find any invoices'});
      }
      const { subTotal, total } = invoiceService.getTotal(invoice);
      const user = userService.getUser(req.currentUser);
      const templateBody = invoiceService.getTemplateBody(invoice, subTotal, total, user);
      const html = invoiceService.getInvoiceTemplate(templateBody, subTotal, total);
      res.pdfFromHTML({
        filename: '${invoice.item}.pdf',
        htmlContent: html,
      });

    } catch (err) {
          res.status(500).json({err: 'pdf error'});
    }


  }


};
