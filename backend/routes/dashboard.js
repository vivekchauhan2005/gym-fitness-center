const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const User = require('../models/User');
const Membership = require('../models/Membership');
const Trainer = require('../models/Trainer');
const Class = require('../models/Class');
const Booking = require('../models/Booking');
const Enquiry = require('../models/Enquiry');

router.get('/dashboard', protect, admin, async (req, res) => {
  try {
    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const totalTrainers = await Trainer.countDocuments({ status: 'active' });
    const totalClasses = await Class.countDocuments({ status: 'upcoming' });
    const totalBookings = await Booking.countDocuments({ status: 'confirmed' });
    const pendingEnquiries = await Enquiry.countDocuments({ status: 'New' });
    const activeMemberships = await Membership.countDocuments({ status: 'active' });
    
    const totalMemberships = await Membership.countDocuments();
    
    const membershipDistribution = await Membership.aggregate([
      {
        $group: {
          _id: '$status',
          count: { $sum: 1 }
        }
      }
    ]);
    
    const monthlyRegistrations = await User.aggregate([
      {
        $match: { role: 'customer' }
      },
      {
        $group: {
          _id: {
            year: { $year: '$createdAt' },
            month: { $month: '$createdAt' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': -1, '_id.month': -1 }
      },
      {
        $limit: 6
      }
    ]);
    
    const classBookings = await Booking.aggregate([
      {
        $match: { status: 'confirmed' }
      },
      {
        $group: {
          _id: '$class',
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      },
      {
        $limit: 5
      }
    ]);
    
    const recentEnquiries = await Enquiry.find()
      .sort({ createdAt: -1 })
      .limit(5);
    
    res.status(200).json({
      success: true,
      data: {
        totalCustomers,
        totalTrainers,
        totalClasses,
        totalBookings,
        pendingEnquiries,
        activeMemberships,
        totalMemberships,
        membershipDistribution,
        monthlyRegistrations,
        classBookings,
        recentEnquiries
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;