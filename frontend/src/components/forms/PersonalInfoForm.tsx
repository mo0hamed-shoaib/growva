import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useCV, Link } from '../../contexts/CVContext';

interface PersonalInfoFormData {
  fullName: string;
  jobTitle: string;
  phone: string;
  email: string;
  location: string;
  maritalStatus: string;
  militaryStatus: string;
}

const PersonalInfoForm: React.FC = () => {
  const { cvData, dispatch } = useCV();
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [showLinks, setShowLinks] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    watch,
  } = useForm<PersonalInfoFormData>({
    defaultValues: {
      fullName: cvData.personalInfo.fullName,
      jobTitle: cvData.personalInfo.jobTitle || '',
      phone: cvData.personalInfo.phone || '',
      email: cvData.personalInfo.email,
      location: cvData.personalInfo.location || '',
      maritalStatus: cvData.personalInfo.maritalStatus || '',
      militaryStatus: cvData.personalInfo.militaryStatus || '',
    },
  });

  const watchedValues = watch();

  // Update CV data when form changes
  React.useEffect(() => {
    if (isDirty) {
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: {
          fullName: watchedValues.fullName,
          jobTitle: watchedValues.jobTitle,
          phone: watchedValues.phone,
          email: watchedValues.email,
          location: watchedValues.location,
          maritalStatus: watchedValues.maritalStatus,
          militaryStatus: watchedValues.militaryStatus,
        },
      });
    }
  }, [watchedValues, dispatch, isDirty]);

  // Pre-made link options
  const linkOptions = [
    { type: 'linkedin' as const, label: 'LinkedIn', icon: '💼' },
    { type: 'github' as const, label: 'GitHub', icon: '🐙' },
    { type: 'portfolio' as const, label: 'Portfolio', icon: '🎨' },
    { type: 'behance' as const, label: 'Behance', icon: '🎭' },
    { type: 'dribbble' as const, label: 'Dribbble', icon: '🏀' },
    { type: 'medium' as const, label: 'Medium', icon: '📝' },
    { type: 'twitter' as const, label: 'Twitter/X', icon: '🐦' },
  ];

  const addLink = (type: Link['type']) => {
    const newLink: Link = {
      type,
      url: '',
      iconColor: '#6B7280',
    };
    
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: {
        links: [...cvData.personalInfo.links, newLink],
      },
    });
  };

  const updateLink = (index: number, field: keyof Link, value: string) => {
    const updatedLinks = [...cvData.personalInfo.links];
    updatedLinks[index] = { ...updatedLinks[index], [field]: value };
    
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { links: updatedLinks },
    });
  };

  const removeLink = (index: number) => {
    const updatedLinks = cvData.personalInfo.links.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: { links: updatedLinks },
    });
  };

  const getLinkIcon = (type: Link['type']) => {
    return linkOptions.find(option => option.type === type)?.icon || '🔗';
  };

  const getLinkLabel = (type: Link['type']) => {
    return linkOptions.find(option => option.type === type)?.label || type;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Personal Information
        </h2>
        <div className="flex items-center space-x-2">
          {cvData.personalInfo.fullName && cvData.personalInfo.email && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Complete</span>
            </div>
          )}
        </div>
      </div>

      <form className="space-y-4">
        {/* Required Fields */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Full Name *
            </label>
            <input
              type="text"
              {...register('fullName', { required: 'Full name is required' })}
              className="input-field"
              placeholder="John Doe"
            />
            {errors.fullName && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.fullName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Job Title
            </label>
            <input
              type="text"
              {...register('jobTitle')}
              className="input-field"
              placeholder="Software Engineer"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Email *
            </label>
            <input
              type="email"
              {...register('email', { 
                required: 'Email is required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Invalid email address'
                }
              })}
              className="input-field"
              placeholder="john.doe@example.com"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              {...register('phone')}
              className="input-field"
              placeholder="+1 (555) 123-4567"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="input-field"
            placeholder="San Francisco, CA"
          />
        </div>

        {/* Optional Fields Toggle */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <button
            type="button"
            onClick={() => setShowOptionalFields(!showOptionalFields)}
            className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
          >
            <svg 
              className={`w-4 h-4 mr-2 transition-transform ${showOptionalFields ? 'rotate-90' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
            Additional Information
          </button>
        </div>

        {/* Optional Fields */}
        {showOptionalFields && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Marital Status
              </label>
              <select
                {...register('maritalStatus')}
                className="input-field"
              >
                <option value="">Select status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Military Status
              </label>
              <select
                {...register('militaryStatus')}
                className="input-field"
              >
                <option value="">Select status</option>
                <option value="Veteran">Veteran</option>
                <option value="Active Duty">Active Duty</option>
                <option value="Reserve">Reserve</option>
                <option value="National Guard">National Guard</option>
                <option value="None">None</option>
              </select>
            </div>
          </div>
        )}

        {/* Links Section */}
        <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Professional Links
            </h3>
            <button
              type="button"
              onClick={() => setShowLinks(!showLinks)}
              className="flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"
            >
              <svg 
                className={`w-4 h-4 mr-2 transition-transform ${showLinks ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showLinks ? 'Hide' : 'Show'} Links
            </button>
          </div>

          {showLinks && (
            <div className="space-y-4">
              {/* Add Link Buttons */}
              <div className="flex flex-wrap gap-2">
                {linkOptions.map((option) => {
                  const exists = cvData.personalInfo.links.some(link => link.type === option.type);
                  return (
                    <button
                      key={option.type}
                      type="button"
                      onClick={() => addLink(option.type)}
                      disabled={exists}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        exists
                          ? 'bg-gray-100 dark:bg-gray-700 text-gray-400 cursor-not-allowed'
                          : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                      }`}
                    >
                      <span className="mr-2">{option.icon}</span>
                      {option.label}
                    </button>
                  );
                })}
              </div>

              {/* Existing Links */}
              {cvData.personalInfo.links.map((link, index) => (
                <div key={index} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                  <span className="text-lg">{getLinkIcon(link.type)}</span>
                  <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      {getLinkLabel(link.type)} URL
                    </label>
                    <input
                      type="url"
                      value={link.url}
                      onChange={(e) => updateLink(index, 'url', e.target.value)}
                      className="input-field"
                      placeholder={`https://${link.type}.com/your-profile`}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => removeLink(index)}
                    className="text-red-600 dark:text-red-400 hover:text-red-800 dark:hover:text-red-300"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
