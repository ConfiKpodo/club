// models/club.js

const mongoose = require("mongoose");

const ClubSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  username:
{
    type: String,
    required: true,
    unique: true,
  },

  description: {
    type: String,
    
  },
  location: {
    street:String,
    city: String,  },
  contact: {
    phone: String,
    email: String,
    website: String,
  },
  profile_photo: {
    type: String,
    default: "https://via.placeholder.com/150",
  },
  sample_photos: {
    type: [String],
  },
  opening_times: {
    type: [String],
  },
  services: {
    type: [String],
  },
  capacity: {
    type: Number,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Club", ClubSchema);
