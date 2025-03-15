"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaSun, FaMoon } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [darkTheme, setDarkTheme] = useState(false);
  const [formErrors, setFormErrors] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Load theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setDarkTheme(true);
      document.documentElement.classList.add("dark");
    } else {
      setDarkTheme(false);
      document.documentElement.classList.remove("dark");
    }
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = !darkTheme;
    setDarkTheme(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    if (newTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
    
    // Clear error when user types
    if (formErrors[name as keyof typeof formErrors]) {
      setFormErrors({
        ...formErrors,
        [name]: "",
      });
    }
  };

  const validateForm = () => {
    let valid = true;
    const newErrors = { ...formErrors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      valid = false;
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      valid = false;
    } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
      valid = false;
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
      valid = false;
    }

    setFormErrors(newErrors);
    return valid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);
    
    try {
      // Simulating API call with timeout
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      toast.success('Your message has been sent successfully!', {
        style: {
          background: darkTheme ? '#333' : '#fff',
          color: darkTheme ? '#fff' : '#333',
        },
        iconTheme: {
          primary: '#4F46E5',
          secondary: '#fff',
        },
      });
      
      // Reset form
      setFormData({
        name: "",
        email: "",
        message: "",
      });
    } catch (error) {
      toast.error('Something went wrong. Please try again later.', {
        style: {
          background: darkTheme ? '#333' : '#fff',
          color: darkTheme ? '#fff' : '#333',
        },
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkTheme ? "bg-gray-900 text-white" : "bg-gray-50 text-gray-900"}`}>
      <Toaster position="top-center" />
      
      {/* Theme Toggle Button */}
      <motion.button
        onClick={toggleTheme}
        className={`fixed top-4 right-4 p-3 rounded-full shadow-lg transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-indigo-400 z-50 ${
          darkTheme ? "bg-gray-800 text-yellow-300" : "bg-white text-indigo-600"
        }`}
        aria-label={darkTheme ? "Switch to light mode" : "Switch to dark mode"}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {darkTheme ? <FaSun size={20} /> : <FaMoon size={20} />}
      </motion.button>

      <motion.div 
        className="container mx-auto px-4 py-12 max-w-6xl"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.h1 
          className={`text-4xl md:text-5xl font-bold mb-2 ${darkTheme ? "text-white" : "text-indigo-600"} transition-colors duration-300`}
          variants={fadeInUp}
        >
          Contact Us
        </motion.h1>
        <motion.p 
          className={`text-lg ${darkTheme ? "text-gray-300" : "text-gray-600"} mb-12 max-w-3xl transition-colors duration-300`}
          variants={fadeInUp}
        >
          We'd love to hear from you. Fill out the form below and we'll get back to you as soon as possible.
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <motion.div 
            className={`rounded-xl p-8 shadow-lg transition-all duration-300 ${
              darkTheme ? "bg-gray-800" : "bg-white"
            }`}
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${darkTheme ? "text-white" : "text-indigo-600"} transition-colors duration-300`}>Send Us a Message</h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name Field */}
              <motion.div 
                className="relative"
                variants={fadeInUp}
              >
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className={`peer w-full p-4 pt-6 rounded-lg border-2 outline-none transition-all duration-200 ${
                    darkTheme 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400" 
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } ${formErrors.name ? (darkTheme ? "border-red-400" : "border-red-500") : ""}`}
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                    ${formData.name ? "text-xs top-2" : "text-base top-4"} 
                    peer-focus:text-xs peer-focus:top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                    ${darkTheme 
                      ? "text-gray-300 peer-focus:text-indigo-300" 
                      : "text-gray-600 peer-focus:text-indigo-600"}`}
                >
                  Name
                </label>
                <AnimatePresence>
                  {formErrors.name && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-1 text-sm ${darkTheme ? "text-red-400" : "text-red-500"}`}
                    >
                      {formErrors.name}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Email Field */}
              <motion.div 
                className="relative"
                variants={fadeInUp}
              >
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`peer w-full p-4 pt-6 rounded-lg border-2 outline-none transition-all duration-200 ${
                    darkTheme 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400" 
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } ${formErrors.email ? (darkTheme ? "border-red-400" : "border-red-500") : ""}`}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                    ${formData.email ? "text-xs top-2" : "text-base top-4"} 
                    peer-focus:text-xs peer-focus:top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                    ${darkTheme 
                      ? "text-gray-300 peer-focus:text-indigo-300" 
                      : "text-gray-600 peer-focus:text-indigo-600"}`}
                >
                  Email
                </label>
                <AnimatePresence>
                  {formErrors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-1 text-sm ${darkTheme ? "text-red-400" : "text-red-500"}`}
                    >
                      {formErrors.email}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Message Field */}
              <motion.div 
                className="relative"
                variants={fadeInUp}
              >
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={5}
                  className={`peer w-full p-4 pt-6 rounded-lg border-2 outline-none transition-all duration-200 resize-none ${
                    darkTheme 
                      ? "bg-gray-700 border-gray-600 text-white focus:border-indigo-400" 
                      : "bg-gray-50 border-gray-200 text-gray-900 focus:border-indigo-500"
                  } ${formErrors.message ? (darkTheme ? "border-red-400" : "border-red-500") : ""}`}
                  placeholder=" "
                ></textarea>
                <label
                  htmlFor="message"
                  className={`absolute left-4 transition-all duration-200 pointer-events-none 
                    ${formData.message ? "text-xs top-2" : "text-base top-4"} 
                    peer-focus:text-xs peer-focus:top-2 peer-placeholder-shown:top-4 peer-placeholder-shown:text-base
                    ${darkTheme 
                      ? "text-gray-300 peer-focus:text-indigo-300" 
                      : "text-gray-600 peer-focus:text-indigo-600"}`}
                >
                  Message
                </label>
                <AnimatePresence>
                  {formErrors.message && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className={`mt-1 text-sm ${darkTheme ? "text-red-400" : "text-red-500"}`}
                    >
                      {formErrors.message}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className={`w-full py-4 px-6 rounded-lg font-medium text-white transition-all duration-300 
                  ${darkTheme ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-600 hover:bg-indigo-700"}
                  disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-none
                  focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:ring-opacity-50`}
                variants={fadeInUp}
                whileHover={!isSubmitting ? { y: -2, boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' } : {}}
                whileTap={!isSubmitting ? { y: 0, boxShadow: 'none' } : {}}
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Sending...
                  </span>
                ) : (
                  "Send Message"
                )}
              </motion.button>
            </form>
          </motion.div>

          {/* Map Section */}
          <motion.div 
            className={`rounded-xl shadow-lg overflow-hidden transition-all duration-300 h-[600px] relative ${
              darkTheme ? "bg-gray-800" : "bg-white"
            }`}
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <h2 className={`text-2xl font-semibold p-6 ${darkTheme ? "text-white" : "text-indigo-600"} transition-colors duration-300`}>Find Us</h2>
            <div className="h-full w-full relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3933.8997028288364!2d76.72164507489573!3d9.607066290489695!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b07ce23bc170053%3A0x8757971e61eb21dd!2sSt.%20Joseph&#39;s%20College%20of%20Engineering%20and%20Technology%2C%20Choondacherry%2C%20Palai%2C%20Kerala%20686579!5e0!3m2!1sen!2sin!4v1710506461619!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Information */}
          <motion.div 
            className={`rounded-xl p-8 shadow-lg transition-all duration-300 ${
              darkTheme ? "bg-gray-800" : "bg-white"
            }`}
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${darkTheme ? "text-white" : "text-indigo-600"} transition-colors duration-300`}>Contact Information</h2>
            
            <motion.div 
              className="space-y-6"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex items-start space-x-4"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className={`mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${darkTheme ? "bg-indigo-900" : "bg-indigo-100"}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkTheme ? "text-indigo-300" : "text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className={`text-lg font-medium ${darkTheme ? "text-gray-200" : "text-gray-800"} transition-colors duration-300`}>Phone</h3>
                  <p className={`mt-1 ${darkTheme ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>+91 (484) 246-1930</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className={`mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${darkTheme ? "bg-indigo-900" : "bg-indigo-100"}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkTheme ? "text-indigo-300" : "text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className={`text-lg font-medium ${darkTheme ? "text-gray-200" : "text-gray-800"} transition-colors duration-300`}>Email</h3>
                  <p className={`mt-1 ${darkTheme ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>contact@abcstudios.com</p>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <motion.div 
                  className={`mt-1 flex-shrink-0 w-10 h-10 flex items-center justify-center rounded-full ${darkTheme ? "bg-indigo-900" : "bg-indigo-100"}`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkTheme ? "text-indigo-300" : "text-indigo-600"}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </motion.div>
                <div>
                  <h3 className={`text-lg font-medium ${darkTheme ? "text-gray-200" : "text-gray-800"} transition-colors duration-300`}>Address</h3>
                  <p className={`mt-1 ${darkTheme ? "text-gray-400" : "text-gray-600"} transition-colors duration-300`}>
                    St Joseph's College of Engineering and Technology,<br />
                    Choondacherry, Palai, Kottayam,<br />
                    Kerala, India - 686579
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Business Hours */}
          <motion.div 
            className={`rounded-xl p-8 shadow-lg transition-all duration-300 ${
              darkTheme ? "bg-gray-800" : "bg-white"
            }`}
            variants={fadeInUp}
            whileHover={{ y: -5, boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' }}
          >
            <h2 className={`text-2xl font-semibold mb-6 ${darkTheme ? "text-white" : "text-indigo-600"} transition-colors duration-300`}>Business Hours</h2>
            
            <motion.div 
              className="space-y-4"
              variants={staggerContainer}
              initial="hidden"
              animate="visible"
            >
              <motion.div 
                className="flex justify-between items-center"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <span className={`${darkTheme ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>Monday - Friday</span>
                <span className={`font-medium ${darkTheme ? "text-gray-200" : "text-gray-900"} transition-colors duration-300`}>9:00 AM - 6:00 PM</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <span className={`${darkTheme ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>Saturday</span>
                <span className={`font-medium ${darkTheme ? "text-gray-200" : "text-gray-900"} transition-colors duration-300`}>10:00 AM - 4:00 PM</span>
              </motion.div>
              
              <motion.div 
                className="flex justify-between items-center"
                variants={fadeInUp}
                whileHover={{ x: 5 }}
              >
                <span className={`${darkTheme ? "text-gray-300" : "text-gray-700"} transition-colors duration-300`}>Sunday</span>
                <span className={`font-medium ${darkTheme ? "text-gray-200" : "text-gray-900"} transition-colors duration-300`}>Closed</span>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}