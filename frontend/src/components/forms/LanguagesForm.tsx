import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCV } from '../../contexts/CVContext';

const languageSchema = z.object({
  languages: z.array(z.object({
    language: z.string().min(1, 'Language name is required'),
    proficiency: z.enum(['Native', 'Fluent', 'Intermediate', 'Basic']).default('Intermediate')
  })).min(1, 'At least one language is required')
});

type LanguagesFormData = z.infer<typeof languageSchema>;

const LanguagesForm: React.FC = () => {
  const { cvData, updateCV } = useCV();
  const { register, control, handleSubmit, formState: { errors } } = useForm<LanguagesFormData>({
    resolver: zodResolver(languageSchema),
    defaultValues: {
      languages: cvData.languages.length > 0 ? cvData.languages : [{
        language: '',
        proficiency: 'Intermediate'
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'languages'
  });

  const onSubmit = (data: LanguagesFormData) => {
    updateCV({ languages: data.languages });
  };

  const handleAddLanguage = () => {
    append({
      language: '',
      proficiency: 'Intermediate'
    });
  };

  const handleRemoveLanguage = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Languages</h3>
        <button
          type="button"
          onClick={handleAddLanguage}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Language
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-foreground">
                Language {index + 1}
              </h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveLanguage(index)}
                  className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Language Name */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Language *
                </label>
                <input
                  {...register(`languages.${index}.language`)}
                  type="text"
                  placeholder="e.g., English, Spanish, French"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.languages?.[index]?.language && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.languages[index]?.language?.message}
                  </p>
                )}
              </div>

              {/* Proficiency Level */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Proficiency Level
                </label>
                <select
                  {...register(`languages.${index}.proficiency`)}
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                >
                  <option value="Native">Native</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Basic">Basic</option>
                </select>
              </div>
            </div>

            {/* Proficiency Descriptions */}
            <div className="mt-4 p-3 bg-muted/50 rounded-md">
              <h5 className="text-sm font-medium text-foreground mb-2">Proficiency Levels:</h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <strong>Native:</strong> First language, complete fluency
                </div>
                <div>
                  <strong>Fluent:</strong> Near-native level, can work professionally
                </div>
                <div>
                  <strong>Intermediate:</strong> Can hold conversations, some limitations
                </div>
                <div>
                  <strong>Basic:</strong> Elementary level, simple conversations
                </div>
              </div>
            </div>
          </div>
        ))}

        {errors.languages && (
          <p className="text-sm text-destructive">
            {errors.languages.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default LanguagesForm;
