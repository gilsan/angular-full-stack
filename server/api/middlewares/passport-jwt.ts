 import * as passportJWT from 'passport-jwt';
 import * as passport from 'passport';
 import User from '../resources/user/user.model';
 import {  devConfig } from '../../../src/environments/environment';


 export const configureJWTStrategy = () => {

  const opts = { jwtFromRequest: '', secretOrKey: '' };
  opts.jwtFromRequest = passportJWT.ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = devConfig.secrete;

  passport.use(new passportJWT.Strategy(opts, ( payload, done) => {
      User.findOne({ _id: payload.id}, (err, user) => {
          if (err) {
              return done(err, false);
          }
          if (user) {
              return done(null, user);
          } else {
              return done(null, false);
              // or you could create a new account
          }
      });
  }));

 };
