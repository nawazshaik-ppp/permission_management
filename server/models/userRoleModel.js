const mongoose = require('mongoose');
const Role = require('./roleModel');
const Schema = mongoose.Schema;

const UserRoleSchema = new Schema({
 email: {
  type: String,
  required: true,
  trim: true
 },
 password: {
  type: String,
  required: true
 },
 role : {
    type: Object
 },
 accessToken: {
  type: String
 }
});

const UserRole = mongoose.model('userRole', UserRoleSchema);

module.exports = UserRole;