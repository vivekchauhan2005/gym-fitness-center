const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('../models/User');
const MembershipPlan = require('../models/MembershipPlan');
const Trainer = require('../models/Trainer');
const Class = require('../models/Class');
const Enquiry = require('../models/Enquiry');

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('Connected to MongoDB');

    await User.deleteMany({});
    await MembershipPlan.deleteMany({});
    await Trainer.deleteMany({});
    await Class.deleteMany({});
    await Enquiry.deleteMany({});

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@gymfitness.com',
      phone: '1234567890',
      password: adminPassword,
      role: 'admin'
    });

    const customers = await User.create([
      {
        name: 'John Doe',
        email: 'john@example.com',
        phone: '9876543210',
        password: userPassword,
        role: 'customer'
      },
      {
        name: 'Jane Smith',
        email: 'jane@example.com',
        phone: '9876543211',
        password: userPassword,
        role: 'customer'
      }
    ]);

    const membershipPlans = await MembershipPlan.create([
      {
        name: 'Basic',
        price: 49.99,
        duration: 'Monthly',
        description: 'Perfect for beginners starting their fitness journey',
        features: ['Access to gym equipment', 'Locker room access', 'Basic training guidance'],
        popular: false,
        status: 'active'
      },
      {
        name: 'Premium',
        price: 79.99,
        duration: 'Monthly',
        description: 'Our most popular plan with everything you need',
        features: ['Access to gym equipment', 'Group classes', 'Personal trainer session', 'Locker room access', 'Nutrition guidance'],
        popular: true,
        status: 'active'
      },
      {
        name: 'Pro',
        price: 129.99,
        duration: 'Monthly',
        description: 'The ultimate fitness experience with premium benefits',
        features: ['Access to gym equipment', 'Unlimited group classes', 'Personal trainer sessions', 'Locker room access', 'Nutrition guidance', 'Spa access', 'Priority support'],
        popular: false,
        status: 'active'
      }
    ]);

    const trainers = await Trainer.create([
      {
        name: 'Mike Johnson',
        email: 'mike@gymfitness.com',
        phone: '555-0101',
        specialization: 'Strength Training',
        experience: '8 years',
        bio: 'Certified strength and conditioning specialist passionate about helping clients achieve their fitness goals.',
        certifications: ['NSCA-CSCS', 'ACE Certified'],
        image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400',
        socialLinks: {
          instagram: 'https://instagram.com/mikejohnson',
          linkedin: 'https://linkedin.com/in/mikejohnson'
        },
        status: 'active'
      },
      {
        name: 'Sarah Williams',
        email: 'sarah@gymfitness.com',
        phone: '555-0102',
        specialization: 'Yoga & Pilates',
        experience: '6 years',
        bio: 'Yoga and Pilates instructor focused on mind-body connection and flexibility training.',
        certifications: ['RYT-200', 'Pilates Certified'],
        image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?w=400',
        socialLinks: {
          instagram: 'https://instagram.com/sarahwilliams',
          twitter: 'https://twitter.com/sarahwilliams'
        },
        status: 'active'
      },
      {
        name: 'David Chen',
        email: 'david@gymfitness.com',
        phone: '555-0103',
        specialization: 'CrossFit & HIIT',
        experience: '5 years',
        bio: 'CrossFit level 1 trainer specializing in high-intensity interval training and functional fitness.',
        certifications: ['CrossFit L1', 'USAW Sports Performance'],
        image: 'https://images.unsplash.com/photo-1581009146145-b5b05016a61a?w=400',
        socialLinks: {
          instagram: 'https://instagram.com/davidchen',
          facebook: 'https://facebook.com/davidchen'
        },
        status: 'active'
      },
      {
        name: 'Emily Brown',
        email: 'emily@gymfitness.com',
        phone: '555-0104',
        specialization: 'Cardio & Aerobics',
        experience: '4 years',
        bio: 'Energetic group fitness instructor specializing in cardio, aerobics, and dance-based workouts.',
        certifications: ['AFAA Group Fitness', 'Zumba Certified'],
        image: 'https://images.unsplash.com/photo-1599058917765-a780eda07a3e?w=400',
        socialLinks: {
          instagram: 'https://instagram.com/emilybrown'
        },
        status: 'active'
      },
      {
        name: 'Robert Martinez',
        email: 'robert@gymfitness.com',
        phone: '555-0105',
        specialization: 'Sports Performance',
        experience: '10 years',
        bio: 'Sports performance coach working with athletes from high school to professional level.',
        certifications: ['NSCA-CSCS', 'NASM-PES'],
        image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
        socialLinks: {
          linkedin: 'https://linkedin.com/in/robertmartinez',
          twitter: 'https://twitter.com/robertmartinez'
        },
        status: 'active'
      }
    ]);

    const currentDate = new Date();
    const tomorrow = new Date(currentDate);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(currentDate);
    dayAfter.setDate(dayAfter.getDate() + 2);

    await Class.create([
      {
        name: 'Morning Yoga Flow',
        category: 'Yoga',
        trainer: trainers[1]._id,
        date: tomorrow,
        startTime: '07:00',
        endTime: '08:00',
        capacity: 20,
        description: 'Start your day with energizing yoga flow perfect for all levels.',
        status: 'upcoming'
      },
      {
        name: 'Strength Training Basics',
        category: 'Strength Training',
        trainer: trainers[0]._id,
        date: tomorrow,
        startTime: '09:00',
        endTime: '10:30',
        capacity: 15,
        description: 'Learn proper form and technique for weight lifting exercises.',
        status: 'upcoming'
      },
      {
        name: 'HIIT Cardio Blast',
        category: 'HIIT',
        trainer: trainers[2]._id,
        date: tomorrow,
        startTime: '17:00',
        endTime: '18:00',
        capacity: 25,
        description: 'High-intensity interval training for maximum calorie burn.',
        status: 'upcoming'
      },
      {
        name: 'CrossFit WOD',
        category: 'CrossFit',
        trainer: trainers[2]._id,
        date: dayAfter,
        startTime: '06:00',
        endTime: '07:30',
        capacity: 20,
        description: 'Workout of the day combining functional movements.',
        status: 'upcoming'
      },
      {
        name: 'Zumba Dance Party',
        category: 'Zumba',
        trainer: trainers[3]._id,
        date: dayAfter,
        startTime: '18:30',
        endTime: '19:30',
        capacity: 30,
        description: 'Fun and energetic dance workout with Latin-inspired music.',
        status: 'upcoming'
      },
      {
        name: 'Advanced Strength',
        category: 'Strength Training',
        trainer: trainers[0]._id,
        date: dayAfter,
        startTime: '10:00',
        endTime: '11:30',
        capacity: 12,
        description: 'Advanced strength training for experienced lifters.',
        status: 'upcoming'
      }
    ]);

    await Enquiry.create([
      {
        name: 'Alice Johnson',
        email: 'alice@example.com',
        phone: '555-0201',
        subject: 'Membership Inquiry',
        message: 'I am interested in the premium membership. Can you provide more details about the personal trainer sessions?',
        status: 'New'
      },
      {
        name: 'Bob Wilson',
        email: 'bob@example.com',
        phone: '555-0202',
        subject: 'Class Schedule',
        message: 'Do you offer early morning yoga classes before 7 AM?',
        status: 'Contacted'
      },
      {
        name: 'Carol Davis',
        email: 'carol@example.com',
        phone: '555-0203',
        subject: 'Facility Tour',
        message: 'I would like to schedule a tour of the facility before joining. What are your visiting hours?',
        status: 'New'
      }
    ]);

    console.log('Database seeded successfully!');
    console.log('Admin credentials:');
    console.log('Email: admin@gymfitness.com');
    console.log('Password: admin123');
    console.log('\nCustomer credentials:');
    console.log('Email: john@example.com');
    console.log('Password: user123');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();