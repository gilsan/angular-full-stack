import Invoice from '../models/invoice.model';
import * as Joi from 'joi';
import * as HttpStatus from 'http-status-code';

export default {
  findAll(req, res, next) {

    const {page = 1, perPage = 10, filter, sortField, sortDir } = req.query;
    const options = {
       page: parseInt(page, 10),
       limit: parseInt(perPage, 10),

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
        date:  Joi.date().required(),
        due: Joi.date().required(),
        tax: Joi.number().optional(),
        rate: Joi.number().optional(),
      });

      const { error, value } = Joi.validate(req.body, schema);
      console.log(value);
      if (error && error.details ) {

        return res.status(400).json(error);
      }
    Invoice.create(value)
      .then(invoice => { res.json(invoice); } )
      .catch( err => { res.json(err); } );
  },

  findOneById(req, res) {
       const  id  = req.params;

       Invoice.findById(id)
         .then( item => {
           if (!item) {
            return res.status(400).json({ msg: '자료가 없습니다...'});
           } else {
             return res.status(200).json(item);
           }
          })
         .catch(err => res.status(400).json(err));
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
    });

    const { error, value } = Joi.validate(req.body, schema);
    if (error && error.details ) {
      return res.status(400).json(error);
    }
    console.log(id, value);
  Invoice.findOneAndUpdate({_id: id}, value, { new: true})
    .then(invoice => { res.json(invoice); } )
    .catch( err => { res.json(err); } );
  }

};
