const User = require("../models/user");
const jwt = require("jwt-simple");
const config = require("../config");

function tokenForUser(user) {
  const timestamp = new Date().getTime();
  return jwt.encode({ sub: user.id, iat: timestamp }, config.secret);
}

exports.signup = function (req, res, next) {
  const email = req.body.email;
  const password = req.body.password;

  if (!email || !password) {
    return res
      .status(422)
      .send({ error: "You must provide and email and password" });
  }

  // See if a user with given email exists
  User.findOne({ email: email }, function (err, existingUser) {
    if (err) {
      return next(err);
    }
    // If exists return error
    if (existingUser) {
      return res.status(422).send({ error: "Email already exists" });
    }
    // If doent exist create and save user record
    const user = new User({
      email: email,
      password: password,
    });
    user.save(function (err) {
      if (err) {
        return next(err);
      }

      // Respond to req that user created
      res.json({ token: tokenForUser(user) });
    });
  });
};

exports.signin = function (req, res, next) {
  // User already had email and pass auth'd
  // all they need is a token
  res.send({ token: tokenForUser(req.user) });
};
