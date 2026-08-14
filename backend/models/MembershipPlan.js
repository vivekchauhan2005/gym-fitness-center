const mongoose = require('mongoose');

const membershipPlanSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    duration: {
      type: String,
      required: true
    },

    price: {
      type: Number,
      required: true
    },

    description: {
      type: String,
      default: ''
    },

    features: {
      type: [String],
      default: []
    }
  },
  {
    timestamps: true
  }
);

const MembershipPlan = mongoose.model(
  'MembershipPlan',
  membershipPlanSchema
);

module.exports = MembershipPlan;