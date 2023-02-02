const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const roleSchema = new Schema({
 role: {
  type: String,
  default: 'basic',
//   enum: ["basic", "developer", "admin"]
 },
 permissions: {
  type: [String]   // ['create','update','delete','readAny']
 }
});

const Role = mongoose.model('role', roleSchema);

module.exports = Role;