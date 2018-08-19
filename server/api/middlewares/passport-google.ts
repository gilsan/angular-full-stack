import * as passport from 'passport';
import * as GoogleStrategy from 'passport-google-oauth';
import { devConfig } from '../../../src/environments/environment';
import User from '../resources/user/user.model';

export const configureGoogleStrategy = () => {
  passport.use(
    new GoogleStrategy.OAuth2Strategy(
      {
        clientID: devConfig.google.clientId,
        clientSecret: devConfig.google.clientSecret,
        callbackURL: devConfig.google.callbackURL,
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          //   User.findOrCreate({ googleId: profile.id }, (err, user) => done(err, user));
          console.log('accessToken: ', accessToken);
          console.log('refreshToken: ', refreshToken);
          console.log('profile: ', profile);

          // find the user by google id
          const user = await User.findOne({ 'google.id': profile.id });
           console.log('passport-google: ', user);
          if (user) {
            // if user exit
            // return this user
            return done(null, user);
          }

          // otherwise create the user with google
          const newUser = new User({});
          // save accessToken, email, displayName, id
          newUser.google.id = profile.id;
          newUser.google.token = accessToken;
          newUser.google.displayName = profile.displayName;
          newUser.google.email = profile.emails[0].value;
          await newUser.save();
          done(null, newUser);
        } catch (err) {
          console.error(err);
          return done(err);
        }
      }
    )
  );
};
