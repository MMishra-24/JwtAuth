const bcrypt = require("bcryptjs");
LocalStrategy = require("passport-local").Strategy;

//Load model

const prisma = require("../config/db");
const User = prisma.user;

const loginCheck = passport => {
  passport.use(
    new LocalStrategy({ usernameField: "email" }, (email, password, done) => {
      //Check customer

      prisma.user.findUnique({ where:{ email: email } })
        .then((user) => {
          console.log(user)
          if (!user) {
            console.log("wrong email");
            return done();
          }

          //Match Password

          bcrypt.compare(password, user.password, (error, isMatch) => {
            if (error) throw error;
            if (isMatch) {
              return done(null, user);
            } else {
              console.log("Wrong password");
              return done();
            }
          });
        })
        .catch((error) => console.log(error));
    })
  );

  // Serialize user for session storage
  passport.serializeUser((user, done) => {
  done(null, user.id);
  });

  // Deserialize user from session
  passport.deserializeUser( (id, done) => {
    prisma.user.findUnique({ where: { id } })
    .then((user) => {
      done(null, user);
    })
    .catch((error) => {
      done(error);
    });
  });
};

module.exports = {
  loginCheck,
};