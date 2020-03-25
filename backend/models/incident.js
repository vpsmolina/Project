const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/db');

const IncidentSchema = mongoose.Schema({
  name: {
    type: String
  },
  assignee: {
    type: String,
    required: true
  },
  area: {
    type: String,
    required: true
  },
  startDate: {
    type: Date,
      required: true
  },
  dueDate: {
    type: Date,
      required: true
  },
  description: {
    type: String,
    required: true
  },
  priority: {
    type: String,
      required: true
  },
  status: {
    type: String,
      required: true
  },
});
module.exports.addUser = function (newUser, callback) {
  if (err) throw err;
  newUser.save(callback);


};
const Incident = module.exports = mongoose.model('Incident', IncidentSchema);
