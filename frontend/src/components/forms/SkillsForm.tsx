import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCV } from '../../contexts/CVContext';

const skillSchema = z.object({
  skills: z.array(z.object({
    groupName: z.string().optional(),
    skills: z.array(z.string()).min(1, 'At least one skill is required'),
    displayLayout: z.enum(['bullet', 'one-line', 'columns-2', 'columns-3', 'badges']).default('bullet'),
    proficiency: z.array(z.object({
      skill: z.string(),
      level: z.enum(['Beginner', 'Intermediate', 'Expert']).default('Intermediate'),
      percentage: z.number().min(0).max(100).optional()
    })).default([])
  })).min(1, 'At least one skill group is required')
});

type SkillsFormData = z.infer<typeof skillSchema>;

const SkillsForm: React.FC = () => {
  const { cvData, updateCV } = useCV();
  const [newSkill, setNewSkill] = useState('');
  const [newGroupName, setNewGroupName] = useState('');

  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<SkillsFormData>({
    resolver: zodResolver(skillSchema),
    defaultValues: {
      skills: cvData.skills.length > 0 ? cvData.skills : [{
        groupName: '',
        skills: [''],
        displayLayout: 'bullet',
        proficiency: []
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'skills'
  });

  const watchedFields = watch('skills');

  const onSubmit = (data: SkillsFormData) => {
    updateCV({ skills: data.skills });
  };

  const handleAddSkillGroup = () => {
    append({
      groupName: newGroupName,
      skills: [''],
      displayLayout: 'bullet',
      proficiency: []
    });
    setNewGroupName('');
  };

  const handleRemoveSkillGroup = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  const handleAddSkill = (groupIndex: number) => {
    if (newSkill.trim()) {
      const currentSkills = watchedFields[groupIndex]?.skills || [];
      const newSkills = [...currentSkills, newSkill.trim()];
      
      const updatedSkills = [...watchedFields];
      updatedSkills[groupIndex] = {
        ...updatedSkills[groupIndex],
        skills: newSkills
      };
      
      updateCV({ skills: updatedSkills });
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (groupIndex: number, skillIndex: number) => {
    const currentSkills = watchedFields[groupIndex]?.skills || [];
    const newSkills = currentSkills.filter((_, index) => index !== skillIndex);
    
    const updatedSkills = [...watchedFields];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      skills: newSkills
    };
    
    updateCV({ skills: updatedSkills });
  };

  const handleSkillChange = (groupIndex: number, skillIndex: number, value: string) => {
    const currentSkills = watchedFields[groupIndex]?.skills || [];
    const newSkills = [...currentSkills];
    newSkills[skillIndex] = value;
    
    const updatedSkills = [...watchedFields];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      skills: newSkills
    };
    
    updateCV({ skills: updatedSkills });
  };

  const handleAddProficiency = (groupIndex: number, skillName: string) => {
    const currentProficiency = watchedFields[groupIndex]?.proficiency || [];
    const newProficiency = [...currentProficiency, {
      skill: skillName,
      level: 'Intermediate' as const,
      percentage: undefined
    }];
    
    const updatedSkills = [...watchedFields];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      proficiency: newProficiency
    };
    
    updateCV({ skills: updatedSkills });
  };

  const handleRemoveProficiency = (groupIndex: number, proficiencyIndex: number) => {
    const currentProficiency = watchedFields[groupIndex]?.proficiency || [];
    const newProficiency = currentProficiency.filter((_, index) => index !== proficiencyIndex);
    
    const updatedSkills = [...watchedFields];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      proficiency: newProficiency
    };
    
    updateCV({ skills: updatedSkills });
  };

  const handleProficiencyChange = (groupIndex: number, proficiencyIndex: number, field: 'level' | 'percentage', value: string | number) => {
    const currentProficiency = watchedFields[groupIndex]?.proficiency || [];
    const newProficiency = [...currentProficiency];
    newProficiency[proficiencyIndex] = {
      ...newProficiency[proficiencyIndex],
      [field]: field === 'percentage' ? Number(value) : value
    };
    
    const updatedSkills = [...watchedFields];
    updatedSkills[groupIndex] = {
      ...updatedSkills[groupIndex],
      proficiency: newProficiency
    };
    
    updateCV({ skills: updatedSkills });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Skills</h3>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            value={newGroupName}
            onChange={(e) => setNewGroupName(e.target.value)}
            placeholder="New group name"
            className="px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
          />
          <button
            type="button"
            onClick={handleAddSkillGroup}
            disabled={!newGroupName.trim()}
            className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Group
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-4">
                <h4 className="text-md font-medium text-foreground">
                  {watchedFields[index]?.groupName || `Skill Group ${index + 1}`}
                </h4>
                <input
                  {...register(`skills.${index}.groupName`)}
                  type="text"
                  placeholder="Group name (optional)"
                  className="px-3 py-1 text-sm border border-input rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
              </div>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveSkillGroup(index)}
                  className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove Group
                </button>
              )}
            </div>

            {/* Display Layout */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Display Layout
              </label>
              <select
                {...register(`skills.${index}.displayLayout`)}
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
              >
                <option value="bullet">Bullet List</option>
                <option value="one-line">One Line (Group: skill1, skill2...)</option>
                <option value="columns-2">2 Columns</option>
                <option value="columns-3">3 Columns</option>
                <option value="badges">Badge Style</option>
              </select>
            </div>

            {/* Skills */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Skills
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    placeholder="Add a skill"
                    className="px-3 py-1 text-sm border border-input rounded bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddSkill(index);
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => handleAddSkill(index)}
                    disabled={!newSkill.trim()}
                    className="px-3 py-1 text-sm text-primary hover:text-primary/80 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    Add
                  </button>
                </div>
              </div>
              
              <div className="space-y-2">
                {watchedFields[index]?.skills?.map((skill, skillIndex) => (
                  <div key={skillIndex} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => handleSkillChange(index, skillIndex, e.target.value)}
                      placeholder="e.g., React, Node.js, MongoDB"
                      className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveSkill(index, skillIndex)}
                      className="px-2 py-2 text-destructive hover:text-destructive/80 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Proficiency Levels */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-sm font-medium text-foreground">
                  Proficiency Levels (Optional)
                </label>
                <button
                  type="button"
                  onClick={() => {
                    const firstSkill = watchedFields[index]?.skills?.[0];
                    if (firstSkill) {
                      handleAddProficiency(index, firstSkill);
                    }
                  }}
                  className="text-sm text-primary hover:text-primary/80 transition-colors"
                >
                  Add Proficiency
                </button>
              </div>
              
              <div className="space-y-2">
                {watchedFields[index]?.proficiency?.map((prof, profIndex) => (
                  <div key={profIndex} className="flex items-center space-x-2 p-2 border border-border rounded bg-muted/50">
                    <select
                      value={prof.skill}
                      onChange={(e) => handleProficiencyChange(index, profIndex, 'level', e.target.value)}
                      className="flex-1 px-2 py-1 text-sm border border-input rounded bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      {watchedFields[index]?.skills?.map((skill) => (
                        <option key={skill} value={skill}>{skill}</option>
                      ))}
                    </select>
                    <select
                      value={prof.level}
                      onChange={(e) => handleProficiencyChange(index, profIndex, 'level', e.target.value)}
                      className="px-2 py-1 text-sm border border-input rounded bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    >
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Expert">Expert</option>
                    </select>
                    <input
                      type="number"
                      value={prof.percentage || ''}
                      onChange={(e) => handleProficiencyChange(index, profIndex, 'percentage', e.target.value)}
                      placeholder="%"
                      min="0"
                      max="100"
                      className="w-16 px-2 py-1 text-sm border border-input rounded bg-background text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveProficiency(index, profIndex)}
                      className="px-2 py-1 text-destructive hover:text-destructive/80 transition-colors"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
              
              <p className="mt-2 text-xs text-muted-foreground">
                Add proficiency levels for skills you want to highlight. Some ATS systems may ignore visual indicators.
              </p>
            </div>
          </div>
        ))}

        {errors.skills && (
          <p className="text-sm text-destructive">
            {errors.skills.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SkillsForm;
