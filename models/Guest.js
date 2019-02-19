const mongoose  = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const GuestSchema = new Schema ({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  company_name: {
    type: String,
    required: true
  },
  receive_email: {
    type: Boolean
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('guests', GuestSchema);