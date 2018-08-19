import * as jwt from 'jsonwebtoken';
import * as bcryptjs from 'bcryptjs';
import { devConfig } from '../../../src/environments/environment';

export const getJWTToken = payload => {
   const token = jwt.sign(payload, devConfig.secrete, { expiresIn: '1d'});
   return token;
};

export const getEncryptedPassword = async password => {
   const salt = await bcryptjs.getSalt();
   const hash = await bcryptjs.hash(password, salt);
   return hash;
};
