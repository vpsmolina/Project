const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define collection and schema
let User = new Schema({
  _id: {
    type: String
  },
  id: {
    type: String
  },
  surname: {
    type: String
  },
  password: {
    type: String
  },
  position: {
    type: String
  },
  bithday: {
    type: Date
  }
}, {
  collection: 'users'
});

module.exports = mongoose.model('User', User);
