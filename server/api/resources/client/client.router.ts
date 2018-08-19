import * as express from 'express';
import * as passport from 'passport';

import clientController from './client.controller';

export const clientRouter = express.Router();
clientRouter
.route('/')
.post(  clientController.create)
.get(  clientController.findAll);

clientRouter
.route('/:id')
.get(passport.authenticate('jwt', { session: false }), clientController.findOneById)
.delete(passport.authenticate('jwt', { session: false }), clientController.delete)
.put(passport.authenticate('jwt', { session: false }), clientController.update);
