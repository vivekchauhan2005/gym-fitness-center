import React from 'react';
import { Link } from 'react-router-dom';
import { FaDumbbell, FaUsers, FaClock, FaHeart, FaArrowRight } from 'react-icons/fa';

const About = () => {
  const features = [
    {
      icon: <FaDumbbell className="text-4xl text-primary" />,
      title: 'Modern Equipment',
      description: 'State-of-the-art equipment for all your fitness needs.'
    },
    {
      icon: <FaUsers className="text-4xl text-primary" />,
      title: 'Expert Trainers',
      description: 'Certified professionals dedicated to your success.'
    },
    {
      icon: <FaClock className="text-4xl text-primary" />,
      title: 'Flexible Hours',
      description: 'Open early morning to late night to fit your schedule.'
    },
    {
      icon: <FaHeart className="text-4xl text-primary" />,
      title: 'Supportive Community',
      description: 'Join a community that motivates and supports you.'
    }
  ];

  return (
    <div className="pt-20">
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-6">
                About <span className="gradient-text">Fitness Center</span>
              </h1>
              <p className="text-gray-600 text-lg mb-4">
                Welcome to Fitness Center, where we believe that fitness is not just about exercise—it's about transformation, community, and achieving your best self.
              </p>
              <p className="text-gray-600 text-lg mb-6">
                Since our founding, we've been dedicated to providing a world-class fitness experience with state-of-the-art equipment, expert guidance, and a supportive environment that motivates you to reach your goals.
              </p>
              <Link to="/register" className="btn-primary inline-flex items-center">
                Join Our Community <FaArrowRight className="ml-2" />
              </Link>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600" alt="Gym" className="rounded-xl shadow-lg" />
              <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600" alt="Training" className="rounded-xl shadow-lg mt-8" />
            </div>
          </div>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-heading text-3xl md:text-4xl font-bold text-secondary">
              Why Choose <span className="gradient-text">Us</span>
            </h2>
            <p className="text-gray-600 text-lg mt-4">
              We provide everything you need to succeed in your fitness journey.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6 bg-gray-50 rounded-xl card-hover">
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="font-heading text-xl font-semibold text-secondary mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-padding gradient-bg-dark text-white">
        <div className="container-custom text-center">
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Ready to Transform Your Life?
          </h2>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto">
            Join our community and start your fitness journey today.
          </p>
          <Link to="/register" className="btn-primary text-lg px-8 py-3 inline-block">
            Get Started Today
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;