'use client'

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { FadeInSection } from './FadeInSection'
import { useState } from 'react'

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [formErrors, setFormErrors] = useState({
    name: false,
    email: false,
    subject: false,
    message: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormState(prev => ({
      ...prev,
      [id]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[id as keyof typeof formErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [id]: false
      }));
    }
    
    // Reset submit status when user changes input
    if (submitStatus !== 'idle') {
      setSubmitStatus('idle');
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    const errors = {
      name: !formState.name,
      email: !formState.email,
      subject: !formState.subject,
      message: !formState.message
    };
    
    setFormErrors(errors);
    
    // If no errors, submit form
    if (!Object.values(errors).some(error => error)) {
      setIsSubmitting(true);
      
      try {
        // Method 1: Formspree - A free service that forwards form submissions to your email
        // Replace FORMSPREE_ENDPOINT with your formspree endpoint (e.g., https://formspree.io/f/yourFormId)
        // Sign up at formspree.io and create a form to get your endpoint
        const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORM_ID'; 
        
        try {
          const response = await fetch(FORMSPREE_ENDPOINT, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: formState.name,
              email: formState.email,
              subject: formState.subject,
              message: formState.message
            })
          });
          
          if (response.ok) {
            // Successful submission
            setSubmitStatus('success');
            // Reset form
            setFormState({
              name: '',
              email: '',
              subject: '',
              message: ''
            });
            return;
          }
        } catch (formspreeError) {
          console.log('Formspree error, trying fallback:', formspreeError);
        }
        
        // Fallback Method: Using mailto (will open user's email client)
        const mailtoLink = `mailto:thuanduc911@gmail.com?subject=${encodeURIComponent(formState.subject)}&body=${encodeURIComponent(`Name: ${formState.name}\nEmail: ${formState.email}\n\n${formState.message}`)}`;
        window.open(mailtoLink, '_blank');
        
        // Show success message
        setSubmitStatus('success');
        
        // Reset form after successful submission
        setFormState({
          name: '',
          email: '',
          subject: '',
          message: ''
        });
      } catch (error) {
        console.error('Error sending email:', error);
        setSubmitStatus('error');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center py-20">
      <div className="w-full max-w-6xl mx-auto px-4">
        <div className="space-y-12">
          <FadeInSection>
            <div className="text-center">
              <h2 className="text-4xl font-bold mb-4">Contact me</h2>
              <p className="text-gray-400 mb-10">Let's get in touch!</p>
            </div>
          </FadeInSection>
          
          <div className="flex flex-col md:flex-row gap-12">
            {/* Contact info column */}
            <div className="w-full md:w-2/5 space-y-10">
              {/* Call me section */}
              <FadeInSection delay={200}>
                <div className="flex items-start space-x-4">
                  <div className="text-gray-700 mt-1">
                    <FaPhone className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Call me</h3>
                    <p className="text-gray-400">+358 4696 01319</p>
                  </div>
                </div>
              </FadeInSection>
              
              {/* Email section */}
              <FadeInSection delay={300}>
                <div className="flex items-start space-x-4">
                  <div className="text-gray-700 mt-1">
                    <FaEnvelope className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Email</h3>
                    <p className="text-gray-400 mb-1">thuanduc911@gmail.com</p>
                    <p className="text-gray-400">ducthuan.pham@aalto.fi</p>
                  </div>
                </div>
              </FadeInSection>
              
              {/* Location section */}
              <FadeInSection delay={400}>
                <div className="flex items-start space-x-4">
                  <div className="text-gray-700 mt-1">
                    <FaMapMarkerAlt className="w-10 h-10" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold mb-2">Location</h3>
                    <p className="text-gray-400">Raviradantie 3A5, 50100, Mikkeli, Finland</p>
                  </div>
                </div>
              </FadeInSection>
            </div>
            
            {/* Contact form column */}
            <div className="w-full md:w-3/5">
              <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FadeInSection delay={500}>
                  <div>
                    <label htmlFor="name" className="block text-gray-300 mb-2">Who's reaching out? <span className="text-gray-700">*</span></label>
                    <input 
                      type="text" 
                      id="name" 
                      name="name"
                      value={formState.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-[#1e1e1e] rounded-md border ${formErrors.name ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600`}
                      placeholder="Aatos Pham..."
                      disabled={isSubmitting}
                    />
                    {formErrors.name && (
                      <p className="text-red-500 text-sm mt-1">Please fill in this field</p>
                    )}
                  </div>
                </FadeInSection>
                
                <FadeInSection delay={550}>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 mb-2">How can I get back to you? <span className="text-gray-700">*</span></label>
                    <input 
                      type="email" 
                      id="email" 
                      name="email"
                      value={formState.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-[#1e1e1e] rounded-md border ${formErrors.email ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600`}
                      placeholder="Promise I won't spam!"
                      disabled={isSubmitting}
                    />
                    {formErrors.email && (
                      <p className="text-red-500 text-sm mt-1">Please fill in this field</p>
                    )}
                  </div>
                </FadeInSection>
                
                <FadeInSection delay={600} className="md:col-span-2">
                  <div className="mt-4">
                    <label htmlFor="subject" className="block text-gray-300 mb-2">What's on your mind? <span className="text-gray-700">*</span></label>
                    <input 
                      type="text" 
                      id="subject" 
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-[#1e1e1e] rounded-md border ${formErrors.subject ? 'border-red-500' : 'border-gray-700'} focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600`}
                      placeholder="Partnership, feedback, just saying hi…"
                      disabled={isSubmitting}
                    />
                    {formErrors.subject && (
                      <p className="text-red-500 text-sm mt-1">Please fill in this field</p>
                    )}
                  </div>
                </FadeInSection>
                
                <FadeInSection delay={700} className="md:col-span-2">
                  <div className="mt-4">
                    <label htmlFor="message" className="block text-gray-300 mb-2">Tell me everything! <span className="text-gray-700">*</span></label>
                    <textarea 
                      id="message" 
                      name="message"
                      rows={6}
                      value={formState.message}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 bg-[#1e1e1e] rounded-md border ${formErrors.message ? 'border-red-500' : 'border-gray-700'} resize-none focus:outline-none focus:ring-1 focus:ring-gray-600 focus:border-gray-600`}
                      placeholder="Drop me a message, and let's make magic happen!"
                      disabled={isSubmitting}
                    ></textarea>
                    {formErrors.message && (
                      <p className="text-red-500 text-sm mt-1">Please fill in this field</p>
                    )}
                  </div>
                </FadeInSection>
                
                <FadeInSection delay={800} className="md:col-span-2">
                  {submitStatus === 'success' && (
                    <div className="bg-green-500 bg-opacity-20 text-green-400 p-4 rounded-md mb-4 font-medium">
                      Message sent successfully! I'll get back to you soon. 👍
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-500 bg-opacity-20 text-red-400 p-4 rounded-md mb-4 font-medium">
                      There was an error sending your message. Please try again or contact me directly at thuanduc911@gmail.com
                    </div>
                  )}
                  
                  <button 
                    type="submit"
                    className={`mt-6 inline-block bg-gray-700 group relative overflow-hidden px-8 py-3 rounded-md font-medium transition-all duration-300 transform hover:scale-105 hover:shadow-lg active:scale-95 ${isSubmitting ? 'opacity-75 cursor-not-allowed' : ''}`}
                    disabled={isSubmitting}
                  >
                    <span className="relative z-10 flex items-center text-white group-hover:text-gray-100">
                      {isSubmitting ? 'Sending...' : 'Hit me up! 👋'}
                      <svg 
                        className={`w-5 h-5 ml-2 transform transition-transform group-hover:translate-x-1 ${isSubmitting ? 'animate-pulse' : ''}`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path 
                          fillRule="evenodd" 
                          d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" 
                          clipRule="evenodd" 
                        />
                      </svg>
                    </span>
                    <div className="absolute inset-0 bg-gray-600 transform transition-transform origin-left scale-x-0 group-hover:scale-x-100"></div>
                  </button>
                </FadeInSection>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 