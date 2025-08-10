import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Link } from 'react-router-dom';

// Contact form validation schema
const contactSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Please enter a valid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(100, 'Subject must be less than 100 characters'),
  message: z.string().min(10, 'Message must be at least 10 characters').max(1000, 'Message must be less than 1000 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const Contact: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Simulate API call - in production, this would send to backend
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For now, we'll just log the data and show success
      console.log('Contact form submitted:', data);
      
      setSubmitStatus('success');
      reset();
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Get in
              <span className="bg-gradient-to-r from-orange-500 to-orange-600 bg-clip-text text-transparent"> Touch</span>
            </h1>
            <p className="text-xl sm:text-2xl text-gray-600 dark:text-gray-400 max-w-4xl mx-auto leading-relaxed">
              Have questions, feedback, or suggestions? We'd love to hear from you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-6">
                  Let's Connect
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
                  We're here to help you create the perfect resume. Whether you have questions about 
                  our features, need support, or want to share feedback, we're all ears.
                </p>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Email</h3>
                      <p className="text-gray-600 dark:text-gray-400">support@growva.com</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">We'll respond within 24 hours</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">Response Time</h3>
                      <p className="text-gray-600 dark:text-gray-400">Within 24 hours</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Monday to Friday</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">FAQ</h3>
                      <p className="text-gray-600 dark:text-gray-400">Check our help center</p>
                      <p className="text-sm text-gray-500 dark:text-gray-500">Common questions answered</p>
                    </div>
                  </div>
                </div>

                {/* Quick Links */}
                <div className="mt-12 p-6 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                    Quick Links
                  </h3>
                  <div className="space-y-3">
                    <Link 
                      to="/about" 
                      className="block text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      About Growva
                    </Link>
                    <Link 
                      to="/builder" 
                      className="block text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      Start Building Resume
                    </Link>
                    <a 
                      href="#" 
                      className="block text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      Privacy Policy
                    </a>
                    <a 
                      href="#" 
                      className="block text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 transition-colors"
                    >
                      Terms of Service
                    </a>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="card p-8">
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-6">
                  Send us a Message
                </h3>

                {submitStatus === 'success' && (
                  <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                      <p className="text-green-800 dark:text-green-200 font-medium">
                        Thank you! Your message has been sent successfully. We'll get back to you soon.
                      </p>
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <div className="flex items-center">
                      <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                      </svg>
                      <p className="text-red-800 dark:text-red-200 font-medium">
                        Sorry, there was an error sending your message. Please try again.
                      </p>
                    </div>
                  </div>
                )}

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  {/* Name Field */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Full Name *
                    </label>
                    <input
                      {...register('name')}
                      type="text"
                      id="name"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.name 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Email Field */}
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email Address *
                    </label>
                    <input
                      {...register('email')}
                      type="email"
                      id="email"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.email 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                      placeholder="Enter your email address"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.email.message}
                      </p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      {...register('subject')}
                      type="text"
                      id="subject"
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors ${
                        errors.subject 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                      placeholder="What's this about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.subject.message}
                      </p>
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      {...register('message')}
                      id="message"
                      rows={6}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors resize-none ${
                        errors.message 
                          ? 'border-red-300 dark:border-red-600 bg-red-50 dark:bg-red-900/20' 
                          : 'border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800'
                      }`}
                      placeholder="Tell us more about your inquiry..."
                    />
                    {errors.message && (
                      <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                        {errors.message.message}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-6 rounded-lg font-semibold text-white transition-all duration-200 ${
                      isSubmitting
                        ? 'bg-gray-400 cursor-not-allowed'
                        : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    }`}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending Message...
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </form>

                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400 text-center">
                  By submitting this form, you agree to our{' '}
                  <a href="#" className="text-orange-600 dark:text-orange-400 hover:underline">
                    Privacy Policy
                  </a>
                  {' '}and{' '}
                  <a href="#" className="text-orange-600 dark:text-orange-400 hover:underline">
                    Terms of Service
                  </a>
                  .
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Frequently Asked Questions
            </h2>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Quick answers to common questions
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-6">
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Is Growva really free?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Yes! Growva is completely free with no hidden costs, premium features, or subscription fees. 
                All features are available to everyone.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Do I need to create an account?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                No account required! Your resume data is stored locally on your device using localStorage. 
                This ensures your privacy and allows you to start building immediately.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                Are the templates ATS-optimized?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Absolutely! All our templates are designed specifically to pass Applicant Tracking Systems. 
                They use clean formatting, standard fonts, and proper structure to ensure maximum compatibility.
              </p>
            </div>

            <div className="card p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
                What export formats are available?
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                You can export your resume as a PDF for job applications or as Markdown for version control 
                and easy editing. Both formats maintain the professional formatting.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
            Ready to Build Your Resume?
          </h2>
          <p className="text-xl sm:text-2xl text-white/90 mb-8 max-w-3xl mx-auto">
            Start creating your professional, ATS-optimized resume today. 
            No signup required, completely free.
          </p>
          <Link 
            to="/builder" 
            className="inline-block bg-white text-orange-600 font-semibold px-10 py-4 rounded-xl hover:bg-gray-100 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Start Building Now
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Contact;
