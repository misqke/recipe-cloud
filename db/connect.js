const mongoose = require('mongoose');

const connectDB = (db) => {
  mongoose.connect(db);
}

module.exports = connectDB