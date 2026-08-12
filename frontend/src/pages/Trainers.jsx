import React, { useState, useEffect } from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';
import api from '../services/api';
import toast from 'react-hot-toast';

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedTrainer, setSelectedTrainer] = useState(null);

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const response = await api.get('/api/trainers');
      setTrainers(response.data.data);
    } catch (error) {
      toast.error('Failed to load trainers');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  return (
    <div className="pt-20 section-padding bg-gray-50">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-secondary mb-4">
            Our Expert <span className="gradient-text">Trainers</span>
          </h1>
          <p className="text-gray-600 text-lg">
            Meet our team of certified professionals dedicated to helping you achieve your fitness goals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {trainers.map((trainer) => (
            <div key={trainer._id} className="bg-white rounded-xl shadow-lg overflow-hidden card-hover">
              <img 
                src={trainer.image || 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400'} 
                alt={trainer.name} 
                className="w-full h-72 object-cover"
              />
              <div className="p-6">
                <h3 className="font-heading text-2xl font-bold text-secondary">{trainer.name}</h3>
                <p className="text-primary font-semibold">{trainer.specialization}</p>
                <p className="text-gray-600 text-sm mt-1">{trainer.experience} experience</p>
                <p className="text-gray-600 mt-3">{trainer.bio}</p>
                {trainer.certifications && trainer.certifications.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-semibold text-secondary">Certifications:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {trainer.certifications.map((cert, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
                {trainer.socialLinks && Object.values(trainer.socialLinks).some(link => link) && (
                  <div className="flex gap-3 mt-4">
                    {trainer.socialLinks.facebook && (
                      <a href={trainer.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                        <FaFacebook size={20} />
                      </a>
                    )}
                    {trainer.socialLinks.twitter && (
                      <a href={trainer.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                        <FaTwitter size={20} />
                      </a>
                    )}
                    {trainer.socialLinks.instagram && (
                      <a href={trainer.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                        <FaInstagram size={20} />
                      </a>
                    )}
                    {trainer.socialLinks.linkedin && (
                      <a href={trainer.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-primary">
                        <FaLinkedin size={20} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Trainers;