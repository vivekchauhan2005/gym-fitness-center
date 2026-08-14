const mongoose = require('mongoose');

const membershipSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  plan: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'MembershipPlan',
    required: true
  },
  fullName: {
    type: String,
    required: [true, 'Please provide full name']
  },
  email: {
    type: String,
    required: [true, 'Please provide email']
  },
  phone: {
    type: String,
    required: [true, 'Please provide phone']
  },
  startDate: {
    type: Date,
    required: [true, 'Please provide start date'],
    default: Date.now
  },
  endDate: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    enum: ['active', 'expired', 'cancelled'],
    default: 'active'
  },
  message: {
    type: String,
    maxlength: [500, 'Message cannot be more than 500 characters']
  }
}, {
  timestamps: true
});

membershipSchema.pre('save', function(next) {
  const membership = this;
  if (!membership.isNew || !membership.plan) {
    return next();
  }
  mongoose.model('MembershipPlan').findById(membership.plan)
    .then(plan => {
      if (plan) {
        const durationMap = {
          'Monthly': 1,
          'Quarterly': 3,
          'Half-Yearly': 6,
          'Yearly': 12
        };
        const months = durationMap[plan.duration] || 1;
        membership.endDate = new Date(membership.startDate);
        membership.endDate.setMonth(membership.endDate.getMonth() + months);
      }
      next();
    })
    .catch(err => next(err));
});

module.exports = mongoose.model('Membership', membershipSchema);