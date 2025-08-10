import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCV } from '../../contexts/CVContext';

const educationSchema = z.object({
  education: z.array(z.object({
    degree: z.string().min(1, 'Degree is required'),
    institution: z.string().min(1, 'Institution is required'),
    location: z.string().optional(),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().optional(),
    gpa: z.string().optional(),
    relevantCourses: z.array(z.string()).default([])
  })).min(1, 'At least one education entry is required')
});

type EducationFormData = z.infer<typeof educationSchema>;

const EducationForm: React.FC = () => {
  const { cvData, updateCV } = useCV();
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<EducationFormData>({
    resolver: zodResolver(educationSchema),
    defaultValues: {
      education: cvData.education.length > 0 ? cvData.education : [{
        degree: '',
        institution: '',
        location: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        gpa: '',
        relevantCourses: []
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'education'
  });

  const watchedFields = watch('education');

  const onSubmit = (data: EducationFormData) => {
    updateCV({ education: data.education });
  };

  const handleAddEducation = () => {
    append({
      degree: '',
      institution: '',
      location: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      gpa: '',
      relevantCourses: []
    });
  };

  const handleRemoveEducation = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAddCourse = (educationIndex: number) => {
    const currentCourses = watchedFields[educationIndex]?.relevantCourses || [];
    const newCourses = [...currentCourses, ''];
    
    const updatedEducation = [...watchedFields];
    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      relevantCourses: newCourses
    };
    
    updateCV({ education: updatedEducation });
  };

  const handleRemoveCourse = (educationIndex: number, courseIndex: number) => {
    const currentCourses = watchedFields[educationIndex]?.relevantCourses || [];
    const newCourses = currentCourses.filter((_, index) => index !== courseIndex);
    
    const updatedEducation = [...watchedFields];
    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      relevantCourses: newCourses
    };
    
    updateCV({ education: updatedEducation });
  };

  const handleCourseChange = (educationIndex: number, courseIndex: number, value: string) => {
    const currentCourses = watchedFields[educationIndex]?.relevantCourses || [];
    const newCourses = [...currentCourses];
    newCourses[courseIndex] = value;
    
    const updatedEducation = [...watchedFields];
    updatedEducation[educationIndex] = {
      ...updatedEducation[educationIndex],
      relevantCourses: newCourses
    };
    
    updateCV({ education: updatedEducation });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Education</h3>
        <button
          type="button"
          onClick={handleAddEducation}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Education
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-foreground">
                Education {index + 1}
              </h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveEducation(index)}
                  className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Degree */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Degree/Qualification *
                </label>
                <input
                  {...register(`education.${index}.degree`)}
                  type="text"
                  placeholder="e.g., Bachelor of Science in Computer Science"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.education?.[index]?.degree && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.education[index]?.degree?.message}
                  </p>
                )}
              </div>

              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Institution *
                </label>
                <input
                  {...register(`education.${index}.institution`)}
                  type="text"
                  placeholder="e.g., Stanford University"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.education?.[index]?.institution && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.education[index]?.institution?.message}
                  </p>
                )}
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location
                </label>
                <input
                  {...register(`education.${index}.location`)}
                  type="text"
                  placeholder="e.g., Stanford, CA"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date *
                </label>
                <input
                  {...register(`education.${index}.startDate`)}
                  type="month"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.education?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.education[index]?.startDate?.message}
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
                    {...register(`education.${index}.endDate`)}
                    type="month"
                    disabled={watch(`education.${index}.isCurrent`)}
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center space-x-2 text-sm text-foreground">
                    <input
                      {...register(`education.${index}.isCurrent`)}
                      type="checkbox"
                      className="rounded border-input text-primary focus:ring-ring"
                    />
                    <span>Current</span>
                  </label>
                </div>
              </div>

              {/* GPA */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  GPA (Optional)
                </label>
                <input
                  {...register(`education.${index}.gpa`)}
                  type="text"
                  placeholder="e.g., 3.8/4.0"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Description
              </label>
              <textarea
                {...register(`education.${index}.description`)}
                rows={3}
                placeholder="Describe your academic achievements, honors, or relevant coursework..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              />
            </div>

            {/* Relevant Courses */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Relevant Courses
                </label>
                <button
                  type="button"
                  onClick={() => handleAddCourse(index)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Add Course
                </button>
              </div>
              
              <div className="space-y-2">
                {watchedFields[index]?.relevantCourses?.map((course, courseIndex) => (
                  <div key={courseIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={course}
                      onChange={(e) => handleCourseChange(index, courseIndex, e.target.value)}
                      placeholder="e.g., Data Structures and Algorithms"
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveCourse(index, courseIndex)}
                      className="px-2 py-2 text-destructive hover:text-destructive/80 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <p className="mt-2 text-xs text-muted-foreground">
                List courses relevant to the positions you're applying for
              </p>
            </div>
          </div>
        ))}

        {errors.education && (
          <p className="text-sm text-destructive">
            {errors.education.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default EducationForm;
