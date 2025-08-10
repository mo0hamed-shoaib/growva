import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCV } from '../../contexts/CVContext';

const workExperienceSchema = z.object({
  workExperience: z.array(z.object({
    jobTitle: z.string().min(1, 'Job title is required'),
    company: z.string().min(1, 'Company name is required'),
    location: z.string().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().optional(),
    achievements: z.array(z.string()).default([])
  })).min(1, 'At least one work experience is required')
});

type WorkExperienceFormData = z.infer<typeof workExperienceSchema>;

const WorkExperienceForm: React.FC = () => {
  const { cvData, updateCV } = useCV();
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<WorkExperienceFormData>({
    resolver: zodResolver(workExperienceSchema),
    defaultValues: {
      workExperience: cvData.workExperience.length > 0 ? cvData.workExperience : [{
        jobTitle: '',
        company: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        achievements: []
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'workExperience'
  });

  const watchedFields = watch('workExperience');

  const onSubmit = (data: WorkExperienceFormData) => {
    updateCV({ workExperience: data.workExperience });
  };

  const handleAddWorkExperience = () => {
    append({
      jobTitle: '',
      company: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      achievements: []
    });
  };

  const handleRemoveWorkExperience = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAddAchievement = (workIndex: number) => {
    const currentAchievements = watchedFields[workIndex]?.achievements || [];
    const newAchievements = [...currentAchievements, ''];
    
    const updatedWorkExperience = [...watchedFields];
    updatedWorkExperience[workIndex] = {
      ...updatedWorkExperience[workIndex],
      achievements: newAchievements
    };
    
    updateCV({ workExperience: updatedWorkExperience });
  };

  const handleRemoveAchievement = (workIndex: number, achievementIndex: number) => {
    const currentAchievements = watchedFields[workIndex]?.achievements || [];
    const newAchievements = currentAchievements.filter((_, index) => index !== achievementIndex);
    
    const updatedWorkExperience = [...watchedFields];
    updatedWorkExperience[workIndex] = {
      ...updatedWorkExperience[workIndex],
      achievements: newAchievements
    };
    
    updateCV({ workExperience: updatedWorkExperience });
  };

  const handleAchievementChange = (workIndex: number, achievementIndex: number, value: string) => {
    const currentAchievements = watchedFields[workIndex]?.achievements || [];
    const newAchievements = [...currentAchievements];
    newAchievements[achievementIndex] = value;
    
    const updatedWorkExperience = [...watchedFields];
    updatedWorkExperience[workIndex] = {
      ...updatedWorkExperience[workIndex],
      achievements: newAchievements
    };
    
    updateCV({ workExperience: updatedWorkExperience });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Work Experience</h3>
        <button
          type="button"
          onClick={handleAddWorkExperience}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Work Experience
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-foreground">
                Work Experience {index + 1}
              </h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveWorkExperience(index)}
                  className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Job Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Job Title *
                </label>
                <input
                  {...register(`workExperience.${index}.jobTitle`)}
                  type="text"
                  placeholder="e.g., Senior Software Engineer"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.workExperience?.[index]?.jobTitle && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.workExperience[index]?.jobTitle?.message}
                  </p>
                )}
              </div>

              {/* Company */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Company *
                </label>
                <input
                  {...register(`workExperience.${index}.company`)}
                  type="text"
                  placeholder="e.g., Google Inc."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.workExperience?.[index]?.company && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.workExperience[index]?.company?.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  {...register(`workExperience.${index}.location`)}
                  type="text"
                  placeholder="e.g., San Francisco, CA"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date *
                </label>
                <input
                  {...register(`workExperience.${index}.startDate`)}
                  type="month"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.workExperience?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.workExperience[index]?.startDate?.message}
                  </p>
                )}
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Date
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    {...register(`workExperience.${index}.endDate`)}
                    type="month"
                    disabled={watch(`workExperience.${index}.isCurrent`)}
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center space-x-2 text-sm text-foreground">
                    <input
                      {...register(`workExperience.${index}.isCurrent`)}
                      type="checkbox"
                      className="rounded border-input text-primary focus:ring-ring"
                    />
                    <span>Current</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Description
              </label>
              <textarea
                {...register(`workExperience.${index}.description`)}
                rows={3}
                placeholder="Describe your role, responsibilities, and key contributions..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              />
            </div>

            {/* Achievements */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Key Achievements
                </label>
                <button
                  type="button"
                  onClick={() => handleAddAchievement(index)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Add Achievement
                </button>
              </div>
              
              <div className="space-y-2">
                {watchedFields[index]?.achievements?.map((achievement, achievementIndex) => (
                  <div key={achievementIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={achievement}
                      onChange={(e) => handleAchievementChange(index, achievementIndex, e.target.value)}
                      placeholder="e.g., Increased team productivity by 25%"
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveAchievement(index, achievementIndex)}
                      className="px-2 py-2 text-destructive hover:text-destructive/80 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <p className="mt-2 text-xs text-muted-foreground">
                Use action verbs and quantify results when possible (e.g., "Increased", "Reduced", "Managed")
              </p>
            </div>
          </div>
        ))}

        {errors.workExperience && (
          <p className="text-sm text-destructive">
            {errors.workExperience.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default WorkExperienceForm;
