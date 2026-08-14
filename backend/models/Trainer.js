const mongoose = require('mongoose');

const trainerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide trainer name'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Please provide email'],
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone number']
  },
  specialization: {
    type: String,
    required: [true, 'Please provide specialization']
  },
  experience: {
    type: String,
    required: [true, 'Please provide experience']
  },
  bio: {
    type: String,
    required: [true, 'Please provide bio'],
    maxlength: [500, 'Bio cannot be more than 500 characters']
  },
  certifications: [{
    type: String
  }],
  image: {
    type: String,
    default: null
  },
  socialLinks: {
    facebook: { type: String, default: null },
    instagram: { type: String, default: null },
    twitter: { type: String, default: null },
    linkedin: { type: String, default: null }
  },
  status: {
    type: String,
    enum: ['active', 'inactive'],
    default: 'active'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Trainer', trainerSchema);