const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

// const Datastore = require('nedb');
// const database = new Datastore('database.db');
// database.loadDatabase();
require('dotenv').config()
passport.use(
	new GoogleStrategy(
		{
			clientID: process.env.CLIENT_ID,
			clientSecret: process.env.CLIENT_SECRET,
			callbackURL: "/auth/google/callback",
			scope: ["profile", "email"],
			// response_type:"application/json"       // ------>
		},
		function (accessToken, refreshToken, profile, callback) {
			callback(null, profile);
		}
	)
);

passport.serializeUser((user, done) => {
	done(null, user);
});

passport.deserializeUser((user, done) => {
	done(null, user);
});