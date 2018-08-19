import * as express from 'express';
import * as passport from 'passport';
import authController from './auth.controller';

export const authRouter = express.Router();
 authRouter.route('/test').get((req, res) => {
    res.json({mess: '성공이다.....'});
 });
// auth Google
authRouter.get(
  '/google',
    passport.authenticate('google', { scope: ['profile', 'email'], })
);

authRouter.get(
  '/google/callback',
  passport.authenticate('google', { failureRedirect: '/failure' }),
  authController.sendJWTToken
);

// Twitter
authRouter.get(
  '/twitter', passport.authenticate('twitter')
);

authRouter.get(
  '/twitter/callback',
  passport.authenticate('twitter', { failureRedirect: '/failure'}),
  authController.sendJWTToken
);

// Github
authRouter.get('/github', passport.authenticate('github'));
authRouter.get(
  '/github/callback',
   passport.authenticate('github', { failureRedirect: '/failure'}),
   authController.sendJWTToken
);


authRouter.get('/authenticate', passport.authenticate('jwt', {session: false}), authController.authenticate);
authRouter.get('/logout', passport.authenticate('jwt, {session: false'), authController.logout);
