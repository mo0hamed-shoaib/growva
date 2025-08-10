import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCV } from '../../contexts/CVContext';

const projectSchema = z.object({
  projects: z.array(z.object({
    name: z.string().min(1, 'Project name is required'),
    role: z.string().optional(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    techStack: z.array(z.string()).default([]),
    liveDemoLink: z.string().url().optional().or(z.literal('')),
    githubLink: z.string().url().optional().or(z.literal('')),
    description: z.string().optional()
  })).min(1, 'At least one project is required')
});

type ProjectsFormData = z.infer<typeof projectSchema>;

const ProjectsForm: React.FC = () => {
  const { cvData, updateCV } = useCV();
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<ProjectsFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      projects: cvData.projects.length > 0 ? cvData.projects : [{
        name: '',
        role: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        techStack: [],
        liveDemoLink: '',
        githubLink: '',
        description: ''
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'projects'
  });

  const watchedFields = watch('projects');

  const onSubmit = (data: ProjectsFormData) => {
    updateCV({ projects: data.projects });
  };

  const handleAddProject = () => {
    append({
      name: '',
      role: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      techStack: [],
      liveDemoLink: '',
      githubLink: '',
      description: ''
    });
  };

  const handleRemoveProject = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAddTechStack = (projectIndex: number) => {
    const currentTechStack = watchedFields[projectIndex]?.techStack || [];
    const newTechStack = [...currentTechStack, ''];
    
    const updatedProjects = [...watchedFields];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      techStack: newTechStack
    };
    
    updateCV({ projects: updatedProjects });
  };

  const handleRemoveTechStack = (projectIndex: number, techIndex: number) => {
    const currentTechStack = watchedFields[projectIndex]?.techStack || [];
    const newTechStack = currentTechStack.filter((_, index) => index !== techIndex);
    
    const updatedProjects = [...watchedFields];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      techStack: newTechStack
    };
    
    updateCV({ projects: updatedProjects });
  };

  const handleTechStackChange = (projectIndex: number, techIndex: number, value: string) => {
    const currentTechStack = watchedFields[projectIndex]?.techStack || [];
    const newTechStack = [...currentTechStack];
    newTechStack[techIndex] = value;
    
    const updatedProjects = [...watchedFields];
    updatedProjects[projectIndex] = {
      ...updatedProjects[projectIndex],
      techStack: newTechStack
    };
    
    updateCV({ projects: updatedProjects });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Projects</h3>
        <button
          type="button"
          onClick={handleAddProject}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Project
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-foreground">
                Project {index + 1}
              </h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveProject(index)}
                  className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Project Name */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Project Name *
                </label>
                <input
                  {...register(`projects.${index}.name`)}
                  type="text"
                  placeholder="e.g., E-commerce Platform"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.projects?.[index]?.name && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.projects[index]?.name?.message}
                  </p>
                )}
              </div>

              {/* Role */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Your Role
                </label>
                <input
                  {...register(`projects.${index}.role`)}
                  type="text"
                  placeholder="e.g., Full Stack Developer"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date
                </label>
                <input
                  {...register(`projects.${index}.startDate`)}
                  type="month"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>

              {/* End Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  End Date
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    {...register(`projects.${index}.endDate`)}
                    type="month"
                    disabled={watch(`projects.${index}.isCurrent`)}
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center space-x-2 text-sm text-foreground">
                    <input
                      {...register(`projects.${index}.isCurrent`)}
                      type="checkbox"
                      className="rounded border-input text-primary focus:ring-ring"
                    />
                    <span>Current</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Tech Stack */}
            <div className="mt-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Tech Stack
                </label>
                <button
                  type="button"
                  onClick={() => handleAddTechStack(index)}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Add Technology
                </button>
              </div>
              
              <div className="space-y-2">
                {watchedFields[index]?.techStack?.map((tech, techIndex) => (
                  <div key={techIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={tech}
                      onChange={(e) => handleTechStackChange(index, techIndex, e.target.value)}
                      placeholder="e.g., React, Node.js, MongoDB"
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveTechStack(index, techIndex)}
                      className="px-2 py-2 text-destructive hover:text-destructive/80 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Live Demo Link
                </label>
                <input
                  {...register(`projects.${index}.liveDemoLink`)}
                  type="url"
                  placeholder="https://your-project.com"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.projects?.[index]?.liveDemoLink && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter a valid URL
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  GitHub Link
                </label>
                <input
                  {...register(`projects.${index}.githubLink`)}
                  type="url"
                  placeholder="https://github.com/username/project"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.projects?.[index]?.githubLink && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter a valid URL
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Project Description
              </label>
              <textarea
                {...register(`projects.${index}.description`)}
                rows={4}
                placeholder="Describe the project, your role, key features, and outcomes..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Focus on your contributions, technical challenges solved, and measurable outcomes
              </p>
            </div>
          </div>
        ))}

        {errors.projects && (
          <p className="text-sm text-destructive">
            {errors.projects.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default ProjectsForm;
