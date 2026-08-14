const dns = require('dns');

dns.setServers([
  '8.8.8.8',
  '1.1.1.1'
]);

const mongoose = require('mongoose');
require('dotenv').config();

const User = require('../models/User');
const MembershipPlan = require('../models/MembershipPlan');
const Trainer = require('../models/Trainer');
const Class = require('../models/Class');
const Enquiry = require('../models/Enquiry');

const seedDatabase = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error('MONGODB_URI is missing from .env');
    }

    console.log('📡 Connecting to MongoDB Atlas...');

    const conn = await mongoose.connect(
      process.env.MONGODB_URI,
      {
        serverSelectionTimeoutMS: 15000,
        socketTimeoutMS: 45000,
        family: 4
      }
    );

    console.log('✅ MongoDB Connected');
    console.log(`📊 Database: ${conn.connection.name}`);

    console.log('🗑️ Clearing existing data...');

    await User.deleteMany({});
    await MembershipPlan.deleteMany({});
    await Trainer.deleteMany({});
    await Class.deleteMany({});
    await Enquiry.deleteMany({});

    console.log('✅ Data cleared');

    // KEEP THE REST OF YOUR EXISTING SEED CODE HERE

  } catch (error) {
    console.error('');
    console.error('❌ Error seeding database:', error.message);

    if (mongoose.connection.readyState !== 0) {
      await mongoose.connection.close();
    }

    process.exit(1);
  }
};

seedDatabase();