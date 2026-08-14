const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const Booking = require('../models/Booking');
const Class = require('../models/Class');

router.get('/my', protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate({ path: 'class', populate: { path: 'trainer', select: 'name specialization image' } })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.get('/', protect, admin, async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate('user', 'name email phone')
      .populate({ path: 'class', populate: { path: 'trainer', select: 'name' } })
      .sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: bookings.length,
      data: bookings
    });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const { classId } = req.body;
    const classItem = await Class.findById(classId);
    if (!classItem) {
      return res.status(404).json({ success: false, message: 'Class not found' });
    }
    if (classItem.status !== 'upcoming') {
      return res.status(400).json({ success: false, message: 'Class is not available for booking' });
    }
    if (classItem.availableSeats <= 0) {
      return res.status(400).json({ success: false, message: 'Class is full' });
    }
    const existingBooking = await Booking.findOne({ user: req.user.id, class: classId, status: 'confirmed' });
    if (existingBooking) {
      return res.status(400).json({ success: false, message: 'You have already booked this class' });
    }
    const booking = await Booking.create({ user: req.user.id, class: classId });
    classItem.availableSeats -= 1;
    await classItem.save();
    const populatedBooking = await Booking.findById(booking._id)
      .populate('user', 'name email')
      .populate({ path: 'class', populate: { path: 'trainer', select: 'name' } });
    res.status(201).json({ success: true, data: populatedBooking });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

router.delete('/:id', protect, async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id);
    if (!booking) {
      return res.status(404).json({ success: false, message: 'Booking not found' });
    }
    if (booking.user.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Not authorized to cancel this booking' });
    }
    if (booking.status !== 'confirmed') {
      return res.status(400).json({ success: false, message: 'This booking cannot be cancelled' });
    }
    booking.status = 'cancelled';
    await booking.save();
    const classItem = await Class.findById(booking.class);
    if (classItem) {
      classItem.availableSeats += 1;
      await classItem.save();
    }
    res.status(200).json({ success: true, message: 'Booking cancelled successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;