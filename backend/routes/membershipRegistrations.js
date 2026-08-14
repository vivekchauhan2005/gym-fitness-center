const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const Membership = require('../models/Membership');
const MembershipPlan = require('../models/MembershipPlan');

router.get('/my', protect, async (req, res) => {
  try {
    const membership = await Membership.findOne({ user: req.user.id, status: 'active' }).populate('plan', 'name price duration');
    if (!membership) {
      return res.status(404).json({ success: false, message: 'No active membership found' });
    }
    res.status(200).json({ success: true, data: membership });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { planId, fullName, email, phone, startDate, message } = req.body;
    const plan = await MembershipPlan.findById(planId);
    if (!plan) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    const existingMembership = await Membership.findOne({ user: req.user.id, status: 'active' });
    if (existingMembership) {
      return res.status(400).json({ success: false, message: 'You already have an active membership' });
    }
    const membership = await Membership.create({
      user: req.user.id,
      plan: planId,
      fullName: fullName || req.user.name,
      email: email || req.user.email,
      phone: phone || req.user.phone,
      startDate: startDate || new Date(),
      message
    });
    const populatedMembership = await Membership.findById(membership._id).populate('plan', 'name price duration');
    res.status(201).json({ success: true, data: populatedMembership });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/all', protect, admin, async (req, res) => {
  try {
    const memberships = await Membership.find()
      .populate('user', 'name email phone')
      .populate('plan', 'name price duration')
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    const membership = await Membership.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership not found' });
    }
    const updatedMembership = await Membership.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }).populate('plan', 'name price duration');
    res.status(200).json({ success: true, data: updatedMembership });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;