const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const MembershipPlan = require('../models/MembershipPlan');

router.get('/', async (req, res) => {
  try {
    const memberships = await MembershipPlan.find({ status: 'active' }).sort({ price: 1 });
    res.status(200).json({
      success: true,
      count: memberships.length,
      data: memberships
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const membership = await MembershipPlan.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    res.status(200).json({ success: true, data: membership });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const membership = await MembershipPlan.create(req.body);
    res.status(201).json({ success: true, data: membership });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    let membership = await MembershipPlan.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    membership = await MembershipPlan.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    res.status(200).json({ success: true, data: membership });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const membership = await MembershipPlan.findById(req.params.id);
    if (!membership) {
      return res.status(404).json({ success: false, message: 'Membership plan not found' });
    }
    await membership.deleteOne();
    res.status(200).json({ success: true, message: 'Membership plan deleted successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;