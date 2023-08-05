import passport, { use } from "passport";
const GoogleStrategy = require("passport-google-oauth2").Strategy;
import dotenv from "dotenv";
import { Account } from "../models/account";
import clientPromise from "../lib/mongo";

dotenv.config();

const client_id = process.env.GOOGLE_CLIENT_ID as string;
const client_secret = process.env.GOOGLE_CLIENT_SECRET as string;
const baseUrl = process.env.REACT_APP_URL as string;

passport.use(
  new GoogleStrategy(
    {
      clientID: client_id,
      clientSecret: client_secret,
      callbackURL: `${baseUrl}/api/v1/auth/google/callback`,
      passReqToCallback: true,
    },
    async function (
      request: any,
      accessToken: any,
      refreshToken: any,
      profile: any,
      done: any
    ) {
      try {
        await clientPromise;
        // Check if the user already exists in the database based on the Google ID
        const existingUser = await Account.findOne({
          profileId: profile.id,
        }).exec();

        if (existingUser) {
          console.log("existing user: ", existingUser);
          done(null, existingUser); // Return the existing user
        } else {
          // If the user does not exist, create a new user record in the database
          const newUser = new Account({
            profileId: profile.id,
            name: profile.displayName,
            email: profile.email,
            profilePicture: profile.picture,
            accessToken: accessToken,
          });
          await newUser.save();
          console.log("new user is", newUser);
          done(null, newUser); // Return the newly created user
        }
      } catch (error) {
        done(error, null); // If an error occurs, pass it to done callback with null user
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((userDataFromCookie: any, done) => {
  done(null, userDataFromCookie);
});
