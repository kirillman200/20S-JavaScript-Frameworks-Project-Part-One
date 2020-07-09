// INSTRUCTIONS
/*
  Create a new resource model that uses the User
  as an associative collection (examples):
  - User -> Books
  - User -> Reservation

  Your model must contain at least three attributes
  other than the associated user and the timestamps.

  Your model must have at least one helpful virtual
  or query function. For example, you could have a
  book's details output in an easy format: book.format()
*/

const mongoose = require('mongoose');

const MemeSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  title: {
    type: String,
    required: false // This must exist
  },
  Description: {
    type: String,
    required: false
  },
  ImageLink: {
    type: String,
    required: false
  },
  LevelOfFunny: {
    type: String,
    required: false
  },

  price: {
    type: Number,
    required: true
  },
}, {
  timestamps: true
});




module.exports = mongoose.model('Meme', MemeSchema);