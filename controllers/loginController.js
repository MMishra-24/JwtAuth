const prisma = require("../config/db");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const User = prisma.user;
//For Register Page
const registerView = (req, res) => {
    res.render("register", {
    } );
}

//Post Request for Register

const registerUser = (req, res) => {
    const { name, email, password, confirm } = req.body;

  if (!name || !email || !password || !confirm) {
    console.log("Fill empty fields");
  }

  //Confirm Passwords

  if (password !== confirm) {
    console.log("Password must match");
  } else {
    //Validation
    User.findUnique({where: { email: email } }).then((user) => {
      if (user) {
        console.log("email exists");
        res.render("register", {
          name,
          email,
          password,
          confirm,
        });
      } else {
        //Validation
        //Password Hashing
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(password, salt, (err, hash) => {
            if (err) throw err;

            User.create({
              data: {
                username: name,
                password: hash,
                email: email
              }
            }).then(res.redirect("/login")).catch((err) => console.log(err));
              
          })
        );
      }
    });
  }
};

// For View 
const loginView = (req, res) => {

    res.render("login", {
    } );
}

//Logging in Function

const loginUser = (req, res) => {
  const { email, password } = req.body;

  //Required
  if (!email || !password) {
    console.log("Please fill in all the fields");
    res.render("login", {
      email,
      password,
    });
  } else {
    passport.authenticate("local", {
      successRedirect: "/movie",
      failureRedirect: "/login",
      failureFlash: true,
    })(req, res);
    console.log("authentication done")
  }
};

  module.exports = {
    registerView,
    loginView,
    registerUser,
    loginUser,
  };