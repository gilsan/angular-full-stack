import * as express from 'express';
import * as passport from 'passport';
import userController from './user.controller';

export const userRouter = express.Router();
userRouter.post('/signup', userController.signup);
userRouter.post('/login'  , userController.login);
userRouter.post('/test', passport.authenticate('jwt', { session: false }), userController.test);
userRouter.post('/forgot-password', userController.forgotPassword),
userRouter.put('/reset-password', userController.resetPassword);
