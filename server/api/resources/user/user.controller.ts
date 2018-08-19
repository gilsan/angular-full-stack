
import { BAD_REQUEST, INTERNAL_SERVICER_ERROR, UNAUTHORIZED } from 'http-status-code';
import * as bcryptjs from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import userService from './user.service';
import User from './user.model';
import { getJWTToken , getEncryptedPassword } from '../../modules/util';
import { devConfig} from '../../../../src/environments/environment';
import { sendEmail } from '../../modules/mail';

export default {
 async signup(req, res ) {

   try {
      const { error, value } = userService.validateSignupSchema(req.body);

      if (error && error.details ) {
        return res.status(500).json(error);
      }

    // const user =  await User.create(value);
    //  return res.json({success: true, message: '등록 되었습니다.'});
    const existingUser = await User.findOne({'local.email': value.email});

    if (existingUser) {
      return res.status(400).json({err: 'You have already created account.'});
    }

    const user = await new User({});
    user.local.email = value.email;
    user.local.name  = value.name;
    const salt = await bcryptjs.genSalt();
    const hash = await bcryptjs.hash(value.password, salt);
    user.local.password = hash;

    await user.save();
    return res.json({ success: true, message: 'User created successfully' });
   } catch (err) {
     return  res.status(500).json(err);
   }

  },

  async login(req, res) {
    try {

      const { error, value } = userService.validateLoginSchema(req.body);
      console.log('로그인1:', value);
      if (error && error.details) {
        return res.status(400).json({success: false, err: error});
      }

      const user = await User.findOne({ 'local.email': value.email});
      console.log('로그인2:', user);
      if (!user) {
        return res.status(400).json({err: '이메일주소 또는 암호가 틀립니다.'});
      }

      const matched = bcryptjs.compare(value.password, user.password);
      if (!matched) {
        return res.status(400).json({success: false, err: '이메일주소 또는 암호가 틀립니다.'});
      }

      const token = jwt.sign({ id: user._id}, devConfig.secrete, { expiresIn: '2d'});
      return res.json({success: true, token});

    } catch (err) {
      console.log('로그인 에러:', err);
      return res.status(400).joson({success: false, err: '이메일주소 또는 암호 확인하세요.'});
    }
  },
    async test(req, res) {
      return res.json(req.user);
    },

  async  forgotPassword(req, res ) {
     try {
       const { value, error } = userService.validateForgotSchema(req.body);

       if ( error && error.details) {
         return res.status(500).json(error);
       }

       const criteria = {
          $or: [
            { 'google.email': value.email},
            { 'github.email': value.email},
            { 'twitter.email': value.email},
            { 'local.email': value.email},
          ]
       };

       const user = await User.findOne(criteria);
       if (!user) {
         return res.status(500).json({ err: '사용자가 없습니다.'});
       }

       const token = getJWTToken({id: user._id});
       const resetLink = `
            <h4>Please click on the link to reset the password</h4>
            <a herf='${devConfig.frontendURL}/reset-password/${token}'>Reset Password</a>
       `;
       const sanitizedUser = userService.getUser(user);
       const results = await sendEmail({
          html: resetLink,
          subject: '암호를 잊어버렸습니다.',
          email: sanitizedUser.email,
       });
       return res.json(results);

     } catch (err) {
       return   res.status(500).json(err);
     }
    },


  async  resetPassword(req, res) {
    try {
        const { password } = req.body;
        if (!password ) {
          return res.status(500).json({ err: '비밀번호가 없습니다.'});
        }
        const user = await User.findById(req.currentUser._id);
        const sanitizedUser = userService.getUser(user);
        if (!user.local.email) {
           user.local.email = sanitizedUser.email;
           user.local.name  = sanitizedUser.name;
        }
        const hash = await getEncryptedPassword(password);
        user.local.password = hash;
        await user.save();
        return res.json({success: true});
    } catch (err) {
      return   res.status(500).json(err);
    }

    }

};

