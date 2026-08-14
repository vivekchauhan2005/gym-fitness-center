const mongoose = require('mongoose');

const classSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide class name'],
      trim: true
    },

    category: {
      type: String,
      required: [true, 'Please provide category'],
      enum: [
        'Yoga',
        'Strength Training',
        'Cardio',
        'CrossFit',
        'Zumba',
        'HIIT',
        'Pilates',
        'Aerobics',
        'Other'
      ]
    },

    trainer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Trainer',
      required: true
    },

    date: {
      type: Date,
      required: [true, 'Please provide date']
    },

    startTime: {
      type: String,
      required: [true, 'Please provide start time']
    },

    endTime: {
      type: String,
      required: [true, 'Please provide end time']
    },

    capacity: {
      type: Number,
      required: [true, 'Please provide capacity'],
      min: [1, 'Capacity must be at least 1']
    },

    availableSeats: {
      type: Number,
      default: function () {
        return this.capacity;
      }
    },

    description: {
      type: String,
      maxlength: [500, 'Description cannot be more than 500 characters']
    },

    status: {
      type: String,
      enum: [
        'upcoming',
        'ongoing',
        'completed',
        'cancelled'
      ],
      default: 'upcoming'
    }
  },
  {
    timestamps: true
  }
);

classSchema.pre('save', function () {
  if (this.isNew) {
    this.availableSeats = this.capacity;
    return;
  }

  if (this.isModified('capacity')) {
    this.availableSeats = this.capacity;
  }
});

module.exports = mongoose.model('Class', classSchema);