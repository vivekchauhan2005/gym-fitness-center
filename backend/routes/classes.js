const express = require('express');
const router = express.Router();
const { protect, admin } = require('../middleware/auth');
const Class = require('../models/Class');
const Trainer = require('../models/Trainer');

router.get('/', async (req, res) => {
  try {
    const { category, status, date } = req.query;
    const query = {};
    
    if (category) query.category = category;
    if (status) query.status = status;
    if (date) {
      const startDate = new Date(date);
      const endDate = new Date(date);
      endDate.setDate(endDate.getDate() + 1);
      query.date = { $gte: startDate, $lt: endDate };
    }
    
    const classes = await Class.find(query)
      .populate('trainer', 'name specialization image')
      .sort({ date: 1, startTime: 1 });
    
    res.status(200).json({
      success: true,
      count: classes.length,
      data: classes
    });
  } catch (error) {
    console.error('Get classes error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id)
      .populate('trainer', 'name specialization image bio');
    
    if (!classItem) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: classItem
    });
  } catch (error) {
    console.error('Get class error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.post('/', protect, admin, async (req, res) => {
  try {
    const trainer = await Trainer.findById(req.body.trainer);
    if (!trainer) {
      return res.status(404).json({
        success: false,
        message: 'Trainer not found'
      });
    }
    
    const classData = {
      ...req.body,
      availableSeats: req.body.capacity
    };
    
    const classItem = await Class.create(classData);
    
    res.status(201).json({
      success: true,
      data: classItem
    });
  } catch (error) {
    console.error('Create class error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.put('/:id', protect, admin, async (req, res) => {
  try {
    let classItem = await Class.findById(req.params.id);
    
    if (!classItem) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    if (req.body.trainer && req.body.trainer !== classItem.trainer.toString()) {
      const trainer = await Trainer.findById(req.body.trainer);
      if (!trainer) {
        return res.status(404).json({
          success: false,
          message: 'Trainer not found'
        });
      }
    }
    
    classItem = await Class.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    ).populate('trainer', 'name specialization');
    
    res.status(200).json({
      success: true,
      data: classItem
    });
  } catch (error) {
    console.error('Update class error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const classItem = await Class.findById(req.params.id);
    
    if (!classItem) {
      return res.status(404).json({
        success: false,
        message: 'Class not found'
      });
    }
    
    await classItem.deleteOne();
    
    res.status(200).json({
      success: true,
      message: 'Class deleted successfully'
    });
  } catch (error) {
    console.error('Delete class error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

module.exports = router;