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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-6">
        {/* Full Name - Single column for mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

        {/* Job Title - Single column for mobile */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Job Title
          </label>
          <input
            type="text"
            {...register('jobTitle')}
            className="input-field"
            placeholder="Software Engineer"
          />
        </div>

        {/* Email and Phone - Stack on mobile, side by side on larger screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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

        {/* Location - Single column */}
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Location
          </label>
          <input
            type="text"
            {...register('location')}
            className="input-field"
            placeholder="San Francisco, CA"
          />
        </div>

        {/* Professional Links Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
              Professional Links
            </h3>
            <button
              type="button"
              onClick={() => setShowLinks(!showLinks)}
              className="flex items-center text-sm text-phoenix-600 dark:text-phoenix-400 hover:text-phoenix-700 dark:hover:text-phoenix-300"
            >
              <svg 
                className={`w-4 h-4 mr-1 transition-transform ${showLinks ? 'rotate-90' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              {showLinks ? 'Hide Links' : 'Add Links'}
            </button>
          </div>

          {showLinks && (
            <div className="space-y-4">
              {/* Existing Links */}
              {cvData.personalInfo.links.map((link, index) => (
                <div key={index} className="flex flex-col sm:flex-row gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="flex items-center space-x-3 flex-1">
                    <span className="text-lg">{getLinkIcon(link.type)}</span>
                    <div className="flex-1">
                      <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        {getLinkLabel(link.type)} URL
                      </label>
                      <input
                        type="url"
                        value={link.url}
                        onChange={(e) => updateLink(index, 'url', e.target.value)}
                        className="input-field text-sm"
                        placeholder={`https://${link.type}.com/yourusername`}
                      />
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={link.iconColor}
                      onChange={(e) => updateLink(index, 'iconColor', e.target.value)}
                      className="w-8 h-8 rounded border border-gray-300 dark:border-gray-600 cursor-pointer"
                      title="Choose icon color"
                    />
                    <button
                      type="button"
                      onClick={() => removeLink(index)}
                      className="p-2 text-red-500 hover:text-red-700 dark:hover:text-red-400 transition-colors"
                      title="Remove link"
                    >
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}

              {/* Add New Links */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2">
                {linkOptions.map((option) => {
                  const exists = cvData.personalInfo.links.some(link => link.type === option.type);
                  return (
                    <button
                      key={option.type}
                      type="button"
                      onClick={() => addLink(option.type)}
                      disabled={exists}
                      className={`p-3 rounded-lg border-2 border-dashed transition-colors ${
                        exists
                          ? 'border-gray-200 dark:border-gray-600 text-gray-400 dark:text-gray-500 cursor-not-allowed'
                          : 'border-gray-300 dark:border-gray-600 text-gray-600 dark:text-gray-400 hover:border-phoenix-400 dark:hover:border-phoenix-500 hover:text-phoenix-600 dark:hover:text-phoenix-400'
                      }`}
                    >
                      <div className="text-lg mb-1">{option.icon}</div>
                      <div className="text-xs font-medium">{option.label}</div>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
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
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
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
                <option value="Not Applicable">Not Applicable</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </form>
  );
};

export default PersonalInfoForm;
