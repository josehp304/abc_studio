'use client';

import React, { useState, useEffect } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import Link from 'next/link';
import Image from 'next/image';
import { FaSun, FaMoon } from 'react-icons/fa';

interface FormData {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute('data-theme', savedTheme);
    }

    // Add Formbricks script
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.innerHTML = `
      !function(){
        var apiHost = "https://app.formbricks.com";
        var environmentId = "cm8a3sdyc0007jy03mq1gy345";
        var userId = "testUser";
        var t=document.createElement("script");t.type="text/javascript",t.async=!0,t.src=apiHost+"/js/formbricks.umd.cjs";var e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(t,e),setTimeout(function(){window.formbricks.init({environmentId: environmentId, apiHost: apiHost, userId: userId})},500)}();
    `;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: FormData) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically integrate with Formbricks API
      // This is a placeholder for the actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Your message has been sent successfully!');
      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send your message. Please try again.');
      console.error('Form submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className={`min-h-screen transition-colors duration-300 ${theme === 'dark' ? 'bg-gradient-to-b from-gray-900 to-gray-800 text-white' : 'bg-gradient-to-b from-gray-100 to-white text-gray-800'}`}>
      <Toaster position="top-center" />
      
      {/* Theme Toggle Button */}
      <button 
        onClick={toggleTheme} 
        className={`fixed top-4 right-4 z-50 p-3 rounded-full transition-colors duration-300 ${
          theme === 'dark' 
            ? 'bg-gray-700 text-yellow-300 hover:bg-gray-600' 
            : 'bg-indigo-100 text-indigo-600 hover:bg-indigo-200'
        }`}
        aria-label="Toggle theme"
      >
        {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
      </button>
      
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full overflow-hidden">
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/60' : 'bg-black/30'} z-10`}></div>
        <div className={`absolute inset-0 bg-gradient-to-t ${theme === 'dark' ? 'from-gray-900' : 'from-gray-100'} to-transparent z-10`}></div>
        <div className="h-full w-full bg-[url('/studio-bg.jpg')] bg-cover bg-center"></div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <h1 className={`text-5xl md:text-7xl font-bold ${theme === 'dark' ? 'text-white' : 'text-gray-900'} mb-4`}>
              Contact <span className="text-indigo-600">Us</span>
            </h1>
            <p className={`text-xl ${theme === 'dark' ? 'text-gray-200' : 'text-gray-700'} max-w-2xl mx-auto px-4`}>
              We'd love to hear from you! Reach out to discuss your next project.
            </p>
            <Link href="#contact-form" className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors duration-300 ease-in-out">
              Submit Enquiry
            </Link>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Contact Info & Form Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          {/* Contact Information */}
          <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl transform hover:scale-[1.01] transition-transform duration-300`}>
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">Get In Touch</h2>
            <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mb-8`}>
              Have a project in mind? Need a quote? Or just want to say hello? We're here to help you bring your vision to life.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-600 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Address</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    SJCET Palai, Palai, Kottayam<br />
                    Kerala, India - 686579
                  </p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-600 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Phone</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>+91 (484) 246-1930</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-600 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Email</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>contact@abcstudios.com</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-4">
                <div className="bg-indigo-600 p-3 rounded-full">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'}`}>Working Hours</h3>
                  <p className={`${theme === 'dark' ? 'text-gray-300' : 'text-gray-600'} mt-1`}>
                    Monday - Friday: 9am - 6pm<br />
                    Weekend: By appointment
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-10">
              <h3 className={`text-xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-gray-800'} mb-4`}>Connect With Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="bg-indigo-600 p-3 rounded-full hover:bg-indigo-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z" />
                  </svg>
                </a>
                <a href="#" className="bg-indigo-600 p-3 rounded-full hover:bg-indigo-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                  </svg>
                </a>
                <a href="#" className="bg-indigo-600 p-3 rounded-full hover:bg-indigo-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a href="#" className="bg-indigo-600 p-3 rounded-full hover:bg-indigo-700 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div id="contact-form" className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl p-8 shadow-xl transform hover:scale-[1.01] transition-transform duration-300`}>
            <h2 className="text-3xl font-bold text-indigo-600 mb-6">Send Us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="relative">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border placeholder-transparent peer`}
                  placeholder="Full Name"
                />
                <label 
                  htmlFor="name" 
                  className={`absolute left-4 -top-6 text-sm ${
                    theme === 'dark' 
                      ? 'text-gray-300 peer-placeholder-shown:text-gray-400 peer-focus:text-indigo-400' 
                      : 'text-gray-600 peer-placeholder-shown:text-gray-500 peer-focus:text-indigo-600'
                  } transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:top-3 
                  peer-focus:-top-6 peer-focus:text-sm`}
                >
                  Full Name
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border placeholder-transparent peer`}
                  placeholder="Email Address"
                />
                <label 
                  htmlFor="email" 
                  className={`absolute left-4 -top-6 text-sm ${
                    theme === 'dark' 
                      ? 'text-gray-300 peer-placeholder-shown:text-gray-400 peer-focus:text-indigo-400' 
                      : 'text-gray-600 peer-placeholder-shown:text-gray-500 peer-focus:text-indigo-600'
                  } transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:top-3 
                  peer-focus:-top-6 peer-focus:text-sm`}
                >
                  Email Address
                </label>
              </div>
              
              <div className="relative">
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className={`w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border placeholder-transparent peer`}
                  placeholder="Phone Number"
                />
                <label 
                  htmlFor="phone" 
                  className={`absolute left-4 -top-6 text-sm ${
                    theme === 'dark' 
                      ? 'text-gray-300 peer-placeholder-shown:text-gray-400 peer-focus:text-indigo-400' 
                      : 'text-gray-600 peer-placeholder-shown:text-gray-500 peer-focus:text-indigo-600'
                  } transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:top-3 
                  peer-focus:-top-6 peer-focus:text-sm`}
                >
                  Phone Number
                </label>
              </div>
              
              <div className="relative">
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  required
                  value={formData.message}
                  onChange={handleChange}
                  className={`w-full ${theme === 'dark' ? 'bg-gray-700 text-white border-gray-600' : 'bg-gray-100 text-gray-800 border-gray-300'} px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 border placeholder-transparent peer`}
                  placeholder="Your Message"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className={`absolute left-4 -top-6 text-sm ${
                    theme === 'dark' 
                      ? 'text-gray-300 peer-placeholder-shown:text-gray-400 peer-focus:text-indigo-400' 
                      : 'text-gray-600 peer-placeholder-shown:text-gray-500 peer-focus:text-indigo-600'
                  } transition-all 
                  peer-placeholder-shown:text-base peer-placeholder-shown:top-3 
                  peer-focus:-top-6 peer-focus:text-sm`}
                >
                  Your Message
                </label>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`px-8 py-3 bg-indigo-600 text-white font-medium rounded-full hover:bg-indigo-700 transition-colors duration-300 ease-in-out
                    ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''} relative overflow-hidden group`}
                >
                  <span className="absolute top-0 left-0 w-0 h-full bg-white opacity-20 transition-all duration-300 group-hover:w-full"></span>
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
        
        {/* Map Section */}
        <div className={`${theme === 'dark' ? 'bg-gray-800' : 'bg-white'} rounded-2xl overflow-hidden shadow-xl`}>
          <h2 className="text-3xl font-bold text-indigo-600 p-8">Find Us</h2>
          <div className="h-[500px] w-full relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.8997028288364!2d76.72164507489573!3d9.607066290489695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07ce23bc170053%3A0x8757971e61eb21dd!2sSt.%20Joseph&#39;s%20College%20of%20Engineering%20and%20Technology%2C%20Palai!5e0!3m2!1sen!2sin!4v1710501553000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              className="absolute inset-0"
            ></iframe>
          </div>
        </div>
      </div>
    </main>
  );
}