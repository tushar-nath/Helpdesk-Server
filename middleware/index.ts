import passport, { use } from "passport";
const GoogleStrategy = require("passport-google-oauth2").Strategy;
import dotenv from "dotenv";

dotenv.config();

const client_id = process.env.GOOGLE_CLIENT_ID as string;
const client_secret = process.env.GOOGLE_CLIENT_SECRET as string;

passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: "http://localhost:3000/api/v1/auth/google/callback",
      passReqToCallback: true,
    },
    function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      console.log("this is the goddamn user - ", profile);
      request.session.userToken = accessToken;
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userDataFromCookie: any, done) => {
  done(null, userDataFromCookie);
});
