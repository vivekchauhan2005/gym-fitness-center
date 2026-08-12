import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube, FaMapMarkerAlt, FaPhone, FaEnvelope } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white">
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 gradient-bg rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl">G</span>
              </div>
              <span className="font-heading font-bold text-xl">
                Fitness<span className="gradient-text">Center</span>
              </span>
            </div>
            <p className="text-gray-400 mb-4">
              Transform your life through fitness. Join our community and achieve your health goals with expert guidance.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaFacebook size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaTwitter size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaInstagram size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaLinkedin size={20} /></a>
              <a href="#" className="text-gray-400 hover:text-primary transition"><FaYoutube size={20} /></a>
            </div>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition">Home</Link></li>
              <li><Link to="/about" className="text-gray-400 hover:text-primary transition">About Us</Link></li>
              <li><Link to="/memberships" className="text-gray-400 hover:text-primary transition">Memberships</Link></li>
              <li><Link to="/trainers" className="text-gray-400 hover:text-primary transition">Trainers</Link></li>
              <li><Link to="/classes" className="text-gray-400 hover:text-primary transition">Class Schedule</Link></li>
              <li><Link to="/contact" className="text-gray-400 hover:text-primary transition">Contact</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Classes</h4>
            <ul className="space-y-2">
              <li className="text-gray-400">Yoga</li>
              <li className="text-gray-400">Strength Training</li>
              <li className="text-gray-400">Cardio</li>
              <li className="text-gray-400">CrossFit</li>
              <li className="text-gray-400">Zumba</li>
              <li className="text-gray-400">HIIT</li>
            </ul>
          </div>

          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Contact Info</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-3">
                <FaMapMarkerAlt className="text-primary mt-1" />
                <span className="text-gray-400">123 Fitness Street, New York, NY 10001</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaPhone className="text-primary" />
                <span className="text-gray-400">+1 (555) 123-4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <FaEnvelope className="text-primary" />
                <span className="text-gray-400">info@gymfitness.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Fitness Center. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;