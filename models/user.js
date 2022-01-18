const mongoose = require('mongoose');
const crypto = require('crypto');

// create user schema
const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    max: 32,
    min: 3,
    unique: true,
    lowercase: true
  },
  name: {
    type: String,
    required: true,
    trim: true,
    max: 32,
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true,
    lowercase: true,
  },
  hashed_password: {
    type: String,
    required: true,
  },
  salt: String,
  liked_recipes: [mongoose.Types.ObjectId]
});

// convert password to hashed password at creation
UserSchema.virtual('password').set( function (password) {
  this._password = password;
  this.salt = this.makeSalt();
  this.hashed_password = this.encryptPassword(password);
}).get( function () {
  return this._password;
});

// define USER methods
UserSchema.methods = {
  
  // authenticate a user at log in
  authenticate: function (password) {
    return this.encryptPassword(password) === this.hashed_password;
  },
  // encrypt password 
  encryptPassword: function (password) {
    if (!password) {
      return "";
    }
    try {
      return crypto.createHmac('sha1', this.salt).update(password).digest('hex');
    } catch (error) {
      console.log(error);
      return "";
    }
  },
  // make salt for encryption
  makeSalt: function () {
    return Math.round(new Date().valueOf() * Math.random() + "")
  },
}

module.exports = mongoose.model('User', UserSchema);