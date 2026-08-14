const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet');

dotenv.config();

const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const membershipRoutes = require('./routes/memberships');
const trainerRoutes = require('./routes/trainers');
const classRoutes = require('./routes/classes');
const bookingRoutes = require('./routes/bookings');
const enquiryRoutes = require('./routes/enquiries');
const dashboardRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/users');
const membershipRegistrationRoutes = require('./routes/membershipRegistrations');

const { errorHandler } = require('./middleware/error');

const app = express();

app.use(helmet());

app.use(
  cors({
    origin: [
      'http://localhost:5173',
      'http://localhost:5174',
      'http://localhost:5175'
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth', authRoutes);
app.use('/api/memberships', membershipRoutes);
app.use('/api/trainers', trainerRoutes);
app.use('/api/classes', classRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/enquiries', enquiryRoutes);
app.use('/api/admin', dashboardRoutes);
app.use('/api/users', userRoutes);
app.use('/api/membership-registrations', membershipRegistrationRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    status: 'OK',
    message: 'Gym Fitness API is running'
  });
});

app.use(errorHandler);
const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on port ${PORT}`);
  });
});

process.on('unhandledRejection', (err) => {
  console.error('Unhandled Rejection:', err);
  process.exit(1);
});