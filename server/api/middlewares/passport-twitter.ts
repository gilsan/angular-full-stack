import * as passport from 'passport';
import * as TwitterStrategy from 'passport-twitter';
import { devConfig } from '../../../src/environments/environment';
import User from '../resources/user/user.model';

// Use the GoogleStrategy within Passport.
//   Strategies in Passport require a `verify` function, which accept
//   credentials (in this case, an accessToken, refreshToken, and Google
//   profile), and invoke a callback with a user object.
export const configureTwitterStrategy = () => {
  passport.use(
    new TwitterStrategy.Strategy(
      {
        consumerKey: devConfig.twitter.consumerKey,
        consumerSecret: devConfig.twitter.consumerSecret,
        callbackURL: devConfig.twitter.callbackURL,
      },
      async (token, tokenSecret, profile, done) => {
        try {
          // find the user by twitter id
          const user = await User.findOne({ 'twitter.id': profile.id });
          console.log(profile);
          if (user) {
            return done(null, user);
          }
          const newUser = new User({});
          newUser.twitter.id = profile.id;
          newUser.twitter.token = token;
          newUser.twitter.displayName = profile.displayName;
          newUser.twitter.username = profile.username;
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
