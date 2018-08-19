import * as Joi from 'joi';
import clientService from './client.service';
import Client from './client.model';


export default {

  async  create(req, res) {
     try {
          const { value, error} = clientService.validateCreateSchema(req.body);

           if ( error && error.details) {
            return res.status(400).json(error);
          }
          const client = await  Client.create(value);
          return  res.json(client);
     } catch (err) {

       res.status(500).json(err);
     }
  },

  async findAll(req, res) {
    try {
       const client = await Client.find();
      // console.log('findAll: ', client);
       return  res.json(client);
    } catch (err) {
      return  res.status(500).json(err);
    }
  },

  async findOneById(req, res) {
    try {
       const client = await Client.findById(req.params.id);
       if (!client) {
        return res.status(400).json({err: '데이터가 없습니다. !!!!'});
     }
       return res.json(client);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async delete(req, res) {
    try {
      const client = await Client.findOneAndRemove({_id: req.params.id});
      console.log('delete: ', client);
      if (!client) {
         return res.status(400).json({err: '데이터가 없습니다. !!!!'});
      }
      return res.json(client);
    } catch (err) {
      return res.status(500).json(err);
    }
  },

  async update(req, res) {
      try {
         const { id } = req.params;
         const { value, error} = clientService.validateUpdateSchema(req.body);

         if (error && error.details ) {
           return res.status(500).json(error);
         }

         const client = await  Client.findOneAndUpdate({_id: id}, value, { new: true});
         if (!client) {
           return res.status(500).json({err: '데이타가 없습니다.'});
         }

         return res.json(client);
      } catch (err) {
        return res.status(500).json(err);
      }
  },


};


