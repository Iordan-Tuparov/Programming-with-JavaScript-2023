const User = require("../models/userModel");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { SALT, SECRET, SESSION_COOKIE_NAME } = require("../config/env");

exports.register = async (userData) => {
  if (userData.password != userData.repeatPassword) {
    throw { message: "Password is not maching!" };
  }

  const hashedPassword = await bcrypt.hash(userData.password, SALT);

  const createdUser = User.create({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    password: hashedPassword,
  });

  if (!createdUser) {
    throw {
      message: "Invalid request!",
    };
  }

  return createdUser;
};

exports.login = async ({ email, password }) => {
  if (!email || !password) {
    throw {
      message: "Email and password is require!",
    };
  }

  const user = await User.findOne({ email: email });

  if (!user) {
    throw { message: "Password or username is not valid!" };
  }

  const isValid = bcrypt.compare(user.password, password);

  if (!isValid) {
    throw { message: "Invalid username or password!" };
  }

  return user;
};

exports.createToken = (user) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
      SECRET,
      { expiresIn: "2d" },
      (err, decodedToken) => {
        if (err) {
          return reject(err);
        }

        resolve(decodedToken);
      }
    );
  });
};
