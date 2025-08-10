import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCV, Link } from '../../contexts/CVContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { PlusIcon, XIcon, LinkIcon, EyeIcon, EyeOffIcon } from 'lucide-react';

// Zod schema for validation as specified in our documentation
const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'Full name is required').max(100, 'Name too long'),
  jobTitle: z.string().max(100, 'Job title too long').optional(),
  phone: z.string()
    .regex(/^[\+]?[0-9\s\-\(\)]{10,20}$/, 'Please enter a valid phone number')
    .optional(),
  email: z.string()
    .email('Please enter a valid email address')
    .min(1, 'Email is required'),
  location: z.string().max(100, 'Location too long').optional(),
  maritalStatus: z.enum(['single', 'married', 'divorced', 'widowed', 'prefer-not-to-say', '']).optional(),
  militaryStatus: z.enum(['none', 'veteran', 'active-duty', 'reserves', 'prefer-not-to-say', '']).optional(),
});

type PersonalInfoFormData = z.infer<typeof personalInfoSchema>;

interface LinkFormData {
  type: Link['type'];
  url: string;
}

const PersonalInfoForm: React.FC = () => {
  const { cvData, dispatch } = useCV();
  const [showOptionalFields, setShowOptionalFields] = useState(false);
  const [showLinks, setShowLinks] = useState(false);
  const [newLink, setNewLink] = useState<LinkFormData>({ type: 'linkedin', url: '' });

  const form = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: cvData.personalInfo.fullName,
      jobTitle: cvData.personalInfo.jobTitle || '',
      phone: cvData.personalInfo.phone || '',
      email: cvData.personalInfo.email,
      location: cvData.personalInfo.location || '',
      maritalStatus: cvData.personalInfo.maritalStatus || '',
      militaryStatus: cvData.personalInfo.militaryStatus || '',
    },
    mode: 'onChange', // Real-time validation
  });

  // Watch form values for auto-save
  const watchedValues = form.watch();

  // Auto-save with debounce
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (form.formState.isValid && form.formState.isDirty) {
        dispatch({
          type: 'UPDATE_PERSONAL_INFO',
          payload: watchedValues,
        });
      }
    }, 500); // 500ms debounce

    return () => clearTimeout(timeoutId);
  }, [watchedValues, dispatch, form.formState.isValid, form.formState.isDirty]);

  const onSubmit = (data: PersonalInfoFormData) => {
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: data,
    });
  };

  // Pre-made link options with proper labeling
  const linkOptions = [
    { type: 'linkedin' as const, label: 'LinkedIn Profile', icon: '💼', placeholder: 'https://linkedin.com/in/yourname' },
    { type: 'github' as const, label: 'GitHub Profile', icon: '🐙', placeholder: 'https://github.com/yourusername' },
    { type: 'portfolio' as const, label: 'Portfolio Website', icon: '🎨', placeholder: 'https://yourportfolio.com' },
    { type: 'behance' as const, label: 'Behance Portfolio', icon: '🎭', placeholder: 'https://behance.net/yourname' },
    { type: 'dribbble' as const, label: 'Dribbble Profile', icon: '🏀', placeholder: 'https://dribbble.com/yourname' },
    { type: 'medium' as const, label: 'Medium Profile', icon: '📝', placeholder: 'https://medium.com/@yourname' },
    { type: 'twitter' as const, label: 'Twitter Profile', icon: '🐦', placeholder: 'https://twitter.com/yourname' },
  ];

  const addLink = () => {
    if (newLink.url.trim()) {
      const updatedLinks = [...cvData.personalInfo.links, {
        ...newLink,
        iconColor: '#F25C1C', // Default phoenix color
      }];
      
      dispatch({
        type: 'UPDATE_PERSONAL_INFO',
        payload: {
          ...cvData.personalInfo,
          links: updatedLinks,
        },
      });
      
      setNewLink({ type: 'linkedin', url: '' });
    }
  };

  const removeLink = (index: number) => {
    const updatedLinks = cvData.personalInfo.links.filter((_, i) => i !== index);
    dispatch({
      type: 'UPDATE_PERSONAL_INFO',
      payload: {
        ...cvData.personalInfo,
        links: updatedLinks,
      },
    });
  };

  const getLinkOption = (type: Link['type']) => {
    return linkOptions.find(option => option.type === type);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Personal Information
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            Add your basic contact information and professional details
          </p>
        </div>
        <div className="flex items-center space-x-2">
          {form.formState.isValid && cvData.personalInfo.fullName && cvData.personalInfo.email && (
            <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
              Complete
            </Badge>
          )}
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          {/* Basic Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>
                Required information for your CV header
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Full Name - Required */}
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">
                      Full Name <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Sarah Johnson"
                        className="input-field"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Job Title - Optional */}
              <FormField
                control={form.control}
                name="jobTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Job Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Senior Frontend Developer"
                        className="input-field"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Your current or desired job title
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Contact Information Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Email - Required */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">
                        Email <span className="text-red-500">*</span>
                      </FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="sarah@example.com"
                          className="input-field"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Phone - Optional */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-medium">Phone Number</FormLabel>
                      <FormControl>
                        <Input
                          type="tel"
                          placeholder="+1 (555) 123-4567"
                          className="input-field"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Location - Optional */}
              <FormField
                control={form.control}
                name="location"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-medium">Location</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., San Francisco, CA, USA"
                        className="input-field"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      City, State/Province, Country
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Professional Links Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span className="flex items-center">
                  <LinkIcon className="w-5 h-5 mr-2" />
                  Professional Links
                </span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowLinks(!showLinks)}
                  className="text-xs"
                >
                  {showLinks ? (
                    <>
                      <EyeOffIcon className="w-4 h-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Manage Links
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>
                Add your professional social media and portfolio links
              </CardDescription>
            </CardHeader>
            
            {showLinks && (
              <CardContent className="space-y-4">
                {/* Existing Links */}
                {cvData.personalInfo.links.length > 0 && (
                  <div className="space-y-3">
                    <Label className="text-sm font-medium">Your Links</Label>
                    {cvData.personalInfo.links.map((link, index) => {
                      const linkOption = getLinkOption(link.type);
                      return (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <span className="text-lg">{linkOption?.icon}</span>
                            <div>
                              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                                {linkOption?.label}
                              </p>
                              <p className="text-xs text-gray-600 dark:text-gray-400 truncate max-w-xs">
                                {link.url}
                              </p>
                            </div>
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeLink(index)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                          >
                            <XIcon className="w-4 h-4" />
                          </Button>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Add New Link */}
                <div className="space-y-3">
                  <Label className="text-sm font-medium">Add New Link</Label>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <Select
                      value={newLink.type}
                      onValueChange={(value: Link['type']) => setNewLink({ ...newLink, type: value })}
                    >
                      <SelectTrigger className="w-full sm:w-48">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {linkOptions.map((option) => (
                          <SelectItem key={option.type} value={option.type}>
                            <span className="flex items-center">
                              <span className="mr-2">{option.icon}</span>
                              {option.label}
                            </span>
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <div className="flex-1 flex gap-2">
                      <Input
                        placeholder={linkOptions.find(opt => opt.type === newLink.type)?.placeholder || 'Enter URL...'}
                        value={newLink.url}
                        onChange={(e) => setNewLink({ ...newLink, url: e.target.value })}
                        className="flex-1"
                      />
                      <Button
                        type="button"
                        onClick={addLink}
                        disabled={!newLink.url.trim()}
                        size="sm"
                        className="px-4"
                      >
                        <PlusIcon className="w-4 h-4 mr-1" />
                        Add Link
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            )}
          </Card>

          {/* Optional Information Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center justify-between">
                <span>Additional Information</span>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setShowOptionalFields(!showOptionalFields)}
                  className="text-xs"
                >
                  {showOptionalFields ? (
                    <>
                      <EyeOffIcon className="w-4 h-4 mr-1" />
                      Hide
                    </>
                  ) : (
                    <>
                      <EyeIcon className="w-4 h-4 mr-1" />
                      Show Optional
                    </>
                  )}
                </Button>
              </CardTitle>
              <CardDescription>
                Optional fields that may be relevant for certain regions or roles
              </CardDescription>
            </CardHeader>

            {showOptionalFields && (
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Marital Status */}
                  <FormField
                    control={form.control}
                    name="maritalStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Marital Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Prefer not to say</SelectItem>
                            <SelectItem value="single">Single</SelectItem>
                            <SelectItem value="married">Married</SelectItem>
                            <SelectItem value="divorced">Divorced</SelectItem>
                            <SelectItem value="widowed">Widowed</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Military Status */}
                  <FormField
                    control={form.control}
                    name="militaryStatus"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-medium">Military Status</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="">Not Applicable</SelectItem>
                            <SelectItem value="veteran">Veteran</SelectItem>
                            <SelectItem value="active-duty">Active Duty</SelectItem>
                            <SelectItem value="reserves">Reserves</SelectItem>
                            <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </CardContent>
            )}
          </Card>

          {/* Form Actions */}
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-3 sm:space-y-0 sm:space-x-4 pt-4">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Changes are saved automatically
            </div>
            <Button type="submit" className="w-full sm:w-auto">
              Save & Continue
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default PersonalInfoForm;
