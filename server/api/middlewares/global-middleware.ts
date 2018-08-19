import * as express from 'express';
import { Application } from 'express';
import * as logger from 'morgan';
import * as swaggerUi from 'swagger-ui-express';
import * as cors from 'cors';
import * as passport from 'passport';
import * as session from 'express-session';
import * as pdf from 'express-pdf';

import { configureJWTStrategy } from './passport-jwt';
import { configureGoogleStrategy} from './passport-google';
import { configureTwitterStrategy } from './passport-twitter';
import { configureGithubStrategy} from './passport-github';
import { devConfig } from '../../../src/environments/environment';
import User from '../resources/user/user.model';
const bodyParser = require('body-parser');
const swaggerDocument = require('../../config/swagger.json');

export const setGlobalMiddleware = app => {

  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true}));
  app.use(cors());
  app.use(pdf);
  app.use(logger('dev'));
  app.use(
    session({
      secret: devConfig.secrete,
      resave: true,
      saveUnintialized: true
    })
  );
  app.use(passport.initialize({ userProperty: 'currentUser'}));
  app.use(passport.session());
  configureJWTStrategy();
  configureGoogleStrategy();
  configureTwitterStrategy();
  configureGithubStrategy();
   // save user into session
  // req.session.user = {userId}
   passport.serializeUser((user, done) => {
     done(null, user._id);
   });
   // extract the userId from session
   passport.deserializeUser((id, done) => {
     User.findById(id, (err, user) => {
       done(null, user);
     }) ;
   });

  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {explorer: true}));
};

