import * as jwt from 'jsonwebtoken';
import { devConfig } from '../../../../src/environments/environment';

export default {
  sendJWTToken(req, res) {
   const token = jwt.sign({ id: req.currentUser._id}, devConfig.secrete, { expiresIn: '1d'});
   console.log('sendJWTToken: ', token);

   res.redirect(`${devConfig.frontendURL}/dashboard/invoices/?token=${token}`);
  },

  authenticate(req, res) {
    console.log('auth controller 인증');
    return res.send(true);
  },

  logout(req, res) {
    req.logout(); // remove the session and remove req.currentUser;
    return res.json({success: true});
  },


};
