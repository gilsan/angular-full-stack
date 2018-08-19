import User from './user.model';
import * as Joi from 'joi';

export default {
  validateSignupSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),
      name: Joi.string().required(),
   });

   const { error, value } = Joi.validate(body, schema);
   if (error && error.details) {
     return { error };
   }
   return { value };
  },

  validateLoginSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
      password: Joi.string().required(),

   });

   const { error, value } = Joi.validate(body, schema);
   if (error && error.details) {
     return { error };
   }

   return { value };
  },

  validateForgotSchema(body) {
    const schema = Joi.object().keys({
      email: Joi.string().email().required(),
   });

   const { error, value } = Joi.validate(body, schema);
   if (error && error.details) {
     return { error };
   }

   return { value };
  },

  getUser(user) {
    const rsp ={};
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
  },

};

