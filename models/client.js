const mongoose = require("mongoose");

const clientSchema = mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  website: {
    type: String,
  },
  location: {
    type: String,
  },
  companyName: {
    type: String,
  },
  pageUrl: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = mongoose.model("clients", clientSchema);
