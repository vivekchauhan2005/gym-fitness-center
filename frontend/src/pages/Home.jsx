import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import {
  FaDumbbell,
  FaUsers,
  FaCalendar,
  FaHeart,
  FaClock,
  FaStar,
  FaArrowRight,
  FaCheck,
  FaQuoteLeft,
  FaPlay,
  FaUserPlus,
  FaUserShield,
  FaUser
} from 'react-icons/fa';
import { motion } from 'framer-motion';
import api from '../services/api';

const Home = () => {
  const [memberships, setMemberships] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const { isAuthenticated, isAdmin } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [membershipsRes, trainersRes, classesRes] = await Promise.all([
          api.get('/api/memberships'),
          api.get('/api/trainers'),
          api.get('/api/classes')
        ]);

        setMemberships(membershipsRes.data.data.slice(0, 3));
        setTrainers(trainersRes.data.data.slice(0, 4));
        setClasses(classesRes.data.data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const stats = [
    {
      icon: <FaUsers className="text-3xl text-primary" />,
      value: '500+',
      label: 'Happy Members'
    },
    {
      icon: <FaDumbbell className="text-3xl text-primary" />,
      value: '20+',
      label: 'Expert Trainers'
    },
    {
      icon: <FaCalendar className="text-3xl text-primary" />,
      value: '50+',
      label: 'Weekly Classes'
    },
    {
      icon: <FaHeart className="text-3xl text-primary" />,
      value: '95%',
      label: 'Satisfaction Rate'
    }
  ];

  const features = [
    {
      icon: <FaDumbbell />,
      title: 'Expert Trainers',
      description: 'Certified professionals dedicated to your success',
      color: 'from-orange-500 to-red-500'
    },
    {
      icon: <FaCalendar />,
      title: 'Flexible Schedule',
      description: 'Classes available 5 AM to 11 PM daily',
      color: 'from-blue-500 to-indigo-500'
    },
    {
      icon: <FaHeart />,
      title: 'Supportive Community',
      description: 'Join 500+ members on their fitness journey',
      color: 'from-pink-500 to-purple-500'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Member since 2022',
      text: 'This gym transformed my life. The trainers are amazing and the community is so supportive!',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100'
    },
    {
      name: 'Michael Chen',
      role: 'Member since 2021',
      text: 'Best decision I ever made. Lost 30 pounds and gained so much confidence.',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    },
    {
      name: 'Emily Davis',
      role: 'Member since 2023',
      text: 'The classes are incredible and the facility is top-notch. Highly recommend!',
      rating: 5,
      image:
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100'
    }
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#0a0a1a] to-[#1a1a3a]">
        <div className="text-center">
          <div className="loading-spinner mx-auto"></div>
          <p className="text-white mt-4">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden">

      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0a0a1a] via-[#1a1a3a] to-[#2a1a3a]"></div>

        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-20 w-72 h-72 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-2000"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-semibold mb-6 border border-white/20">
              <FaPlay className="inline mr-2 text-primary" />
              Welcome to the Best Gym
            </span>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
              Transform Your Body, <br />
              <span className="gradient-text">Transform Your Life</span>
            </h1>

            <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-gray-300">
              Join the best gym in town and start your fitness journey today
              with expert trainers and modern facilities.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">

              {!isAuthenticated ? (
                <>
                  <Link
                    to="/register"
                    className="group relative px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg font-semibold text-white text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <FaUserPlus className="mr-2" />
                      Join as Customer
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-orange-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>

                  <Link
                    to="/admin/login"
                    className="group relative px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-semibold text-white text-lg overflow-hidden transition-all hover:scale-105 hover:shadow-2xl"
                  >
                    <span className="relative z-10 flex items-center justify-center">
                      <FaUserShield className="mr-2" />
                      Admin Login
                      <FaArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </span>

                    <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/profile"
                    className="px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-500 rounded-lg font-semibold text-white text-lg hover:scale-105 hover:shadow-2xl transition-all"
                  >
                    <FaUser className="inline mr-2" />
                    My Profile
                  </Link>

                  {isAdmin ? (
                    <Link
                      to="/admin"
                      className="px-8 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg font-semibold text-white text-lg hover:scale-105 hover:shadow-2xl transition-all"
                    >
                      <FaUserShield className="inline mr-2" />
                      Admin Dashboard
                    </Link>
                  ) : (
                    <Link
                      to="/my-membership"
                      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg font-semibold text-white text-lg hover:scale-105 hover:shadow-2xl transition-all"
                    >
                      <FaDumbbell className="inline mr-2" />
                      My Membership
                    </Link>
                  )}
                </>
              )}

              <Link
                to="/memberships"
                className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-lg font-semibold text-white text-lg hover:bg-white/20 transition-all hover:scale-105"
              >
                Explore Plans
              </Link>

            </div>
          </motion.div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#0a0a1a"
            />
          </svg>
        </div>
      </section>

      <section className="py-16 bg-[#0a0a1a] relative">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="group relative p-6 bg-gradient-to-br from-[#12122a] to-[#1a1a3a] rounded-2xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-[#2a2a4a] overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>

                <div className="relative z-10 text-center">
                  <div className="flex justify-center mb-3 text-4xl">
                    {stat.icon}
                  </div>
                  <div className="text-4xl font-heading font-bold text-white mb-1">
                    {stat.value}
                  </div>
                  <div className="text-gray-400 text-sm">
                    {stat.label}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-orange-200/20 rounded-full filter blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-200/20 rounded-full filter blur-3xl"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
              Why Choose Us
            </span>

            <h2 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
              Your Journey to <span className="gradient-text">Excellence</span>
            </h2>

            <p className="text-gray-600 text-lg">
              We provide everything you need to achieve your fitness goals in
              a supportive and motivating environment.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className="group relative bg-white p-8 rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-gray-100 overflow-hidden"
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}
                ></div>

                <div
                  className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center text-white text-2xl mb-4 group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>

                <h3 className="font-heading text-xl font-bold text-secondary mb-2">
                  {feature.title}
                </h3>

                <p className="text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-purple-500/5"></div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12 flex-wrap gap-4"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-4">
                Membership Plans
              </span>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-white">
                Choose Your <span className="gradient-text">Plan</span>
              </h2>
            </div>

            <Link
              to="/memberships"
              className="text-white/80 hover:text-primary font-semibold flex items-center gap-2 group"
            >
              View All Plans
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {memberships.map((plan, index) => (
              <motion.div
                key={plan._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                className={`relative bg-gradient-to-br from-[#12122a] to-[#1a1a3a] rounded-2xl overflow-hidden transition-all hover:-translate-y-2 border ${
                  plan.popular
                    ? 'border-orange-500 shadow-2xl shadow-orange-500/20'
                    : 'border-[#2a2a4a]'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gradient-to-r from-orange-500 to-pink-500 text-white px-6 py-1 text-sm font-semibold transform rotate-45 translate-x-8 translate-y-3">
                      Popular
                    </div>
                  </div>
                )}

                <div className="p-8">
                  <h3 className="font-heading text-2xl font-bold text-white">
                    {plan.name}
                  </h3>

                  <div className="mt-4">
                    <span className="text-4xl font-heading font-bold text-primary">
                      ${plan.price}
                    </span>
                    <span className="text-gray-400">
                      /{plan.duration}
                    </span>
                  </div>

                  <p className="text-gray-400 mt-4 text-sm">
                    {plan.description}
                  </p>

                  <ul className="mt-6 space-y-3">
                    {plan.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-center text-gray-300 text-sm"
                      >
                        <FaCheck className="text-primary mr-3 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  <Link
                    to={`/memberships?plan=${plan._id}`}
                    className={`mt-8 w-full block text-center px-6 py-3 rounded-lg font-semibold transition-all ${
                      plan.popular
                        ? 'bg-gradient-to-r from-orange-500 to-pink-500 text-white hover:shadow-2xl hover:scale-105'
                        : 'bg-white/10 text-white hover:bg-white/20'
                    }`}
                  >
                    Get Started
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/3 right-0 w-80 h-80 bg-orange-200/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-1/3 left-0 w-80 h-80 bg-purple-200/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12 flex-wrap gap-4"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-orange-100 text-orange-600 rounded-full text-sm font-semibold mb-4">
                Expert Trainers
              </span>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                Meet Our <span className="gradient-text">Team</span>
              </h2>
            </div>

            <Link
              to="/trainers"
              className="text-primary font-semibold flex items-center gap-2 group"
            >
              View All Trainers
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {trainers.map((trainer, index) => (
              <motion.div
                key={trainer._id}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={
                      trainer.image ||
                      'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400'
                    }
                    alt={trainer.name}
                    className="w-full h-72 object-cover group-hover:scale-110 transition-transform duration-500"
                  />

                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </div>

                <div className="p-6">
                  <h4 className="font-heading text-xl font-bold text-secondary">
                    {trainer.name}
                  </h4>

                  <p className="text-primary text-sm font-semibold">
                    {trainer.specialization}
                  </p>

                  <p className="text-gray-500 text-sm mt-1">
                    {trainer.experience}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 right-0 w-96 h-96 bg-blue-200/20 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-200/20 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex justify-between items-center mb-12 flex-wrap gap-4"
          >
            <div>
              <span className="inline-block px-4 py-2 bg-blue-100 text-blue-600 rounded-full text-sm font-semibold mb-4">
                Class Schedule
              </span>

              <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary">
                Upcoming <span className="gradient-text">Classes</span>
              </h2>
            </div>

            <Link
              to="/classes"
              className="text-primary font-semibold flex items-center gap-2 group"
            >
              View All Classes
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {classes.map((cls, index) => (
              <motion.div
                key={cls._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-2 border border-blue-100/50"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <h4 className="font-heading text-xl font-bold text-secondary group-hover:text-primary transition-colors">
                      {cls.name}
                    </h4>

                    <span className="inline-block px-3 py-1 bg-orange-100 text-orange-600 rounded-full text-xs font-semibold mt-1">
                      {cls.category}
                    </span>
                  </div>

                  <span className="px-3 py-1 bg-green-100 text-green-600 rounded-full text-xs font-semibold">
                    {cls.status}
                  </span>
                </div>

                <div className="mt-4 space-y-2 text-gray-600 text-sm">
                  <p className="flex items-center">
                    <FaClock className="mr-2 text-primary" />
                    {cls.startTime} - {cls.endTime}
                  </p>

                  <p className="flex items-center">
                    <FaUsers className="mr-2 text-primary" />
                    {cls.availableSeats || 0} seats available
                  </p>
                </div>

                {cls.trainer && (
                  <div className="mt-4 flex items-center p-3 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-pink-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {cls.trainer.name?.charAt(0)}
                    </div>

                    <div className="ml-3">
                      <p className="font-semibold text-secondary text-sm">
                        {cls.trainer.name}
                      </p>

                      <p className="text-gray-500 text-xs">
                        {cls.trainer.specialization}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#0a0a1a] relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-orange-500/10 rounded-full filter blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-500/10 rounded-full filter blur-3xl"></div>
        </div>

        <div className="container-custom relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <span className="inline-block px-4 py-2 bg-orange-500/20 text-orange-400 rounded-full text-sm font-semibold mb-4">
              Testimonials
            </span>

            <h2 className="font-heading text-3xl md:text-4xl font-bold text-white mb-4">
              What Our Members <span className="gradient-text">Say</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                viewport={{ once: true }}
                className="group relative p-8 bg-gradient-to-br from-[#12122a] to-[#1a1a3a] rounded-2xl border border-[#2a2a4a] hover:border-orange-500/50 transition-all hover:-translate-y-2 hover:shadow-2xl hover:shadow-orange-500/10"
              >
                <FaQuoteLeft className="text-orange-500/20 text-4xl mb-4" />

                <p className="text-gray-300 mb-4">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-orange-500"
                  />

                  <div className="ml-3">
                    <h4 className="font-semibold text-white">
                      {testimonial.name}
                    </h4>

                    <p className="text-gray-400 text-sm">
                      {testimonial.role}
                    </p>
                  </div>
                </div>

                <div className="flex text-yellow-400 mt-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <FaStar key={i} className="text-sm" />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-500"></div>

        <div className="absolute inset-0 opacity-30">
          <div className="absolute top-0 left-0 w-full h-full"></div>
        </div>

        <div className="container-custom relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-white mb-4">
              Ready to Start Your{' '}
              <span className="text-yellow-300">
                Fitness Journey
              </span>
              ?
            </h2>

            <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
              Join our community today and get access to world-class
              facilities, expert trainers, and a supportive environment.
            </p>

            <div className="flex flex-wrap gap-4 justify-center">

              {!isAuthenticated ? (
                <>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/register"
                      className="inline-flex items-center px-10 py-4 bg-white text-secondary rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
                    >
                      <FaUserPlus className="mr-2" />
                      Join Now
                      <FaArrowRight className="ml-2" />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link
                      to="/admin/login"
                      className="inline-flex items-center px-10 py-4 bg-white/20 backdrop-blur-sm border-2 border-white/30 text-white rounded-lg font-bold text-lg hover:bg-white/30 transition-all"
                    >
                      <FaUserShield className="mr-2" />
                      Admin Login
                    </Link>
                  </motion.div>
                </>
              ) : (
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    to={isAdmin ? '/admin' : '/profile'}
                    className="inline-flex items-center px-10 py-4 bg-white text-secondary rounded-lg font-bold text-lg hover:shadow-2xl transition-all"
                  >
                    {isAdmin ? (
                      <>
                        <FaUserShield className="mr-2" />
                        Go to Admin Dashboard
                      </>
                    ) : (
                      <>
                        <FaUser className="mr-2" />
                        Go to My Profile
                      </>
                    )}

                    <FaArrowRight className="ml-2" />
                  </Link>
                </motion.div>
              )}

            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
};

export default Home;