import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useCV } from '../../contexts/CVContext';

const certificationSchema = z.object({
  certifications: z.array(z.object({
    title: z.string().min(1, 'Certification title is required'),
    issuer: z.string().min(1, 'Issuer is required'),
    startDate: z.string().min(1, 'Start date is required'),
    endDate: z.string().optional(),
    isCurrent: z.boolean().default(false),
    description: z.string().optional(),
    certificateLink: z.string().url().optional().or(z.literal(''))
  })).min(1, 'At least one certification is required')
});

type CertificationsFormData = z.infer<typeof certificationSchema>;

const CertificationsForm: React.FC = () => {
  const { cvData, updateCV } = useCV();
  const { register, control, handleSubmit, watch, formState: { errors } } = useForm<CertificationsFormData>({
    resolver: zodResolver(certificationSchema),
    defaultValues: {
      certifications: cvData.certifications.length > 0 ? cvData.certifications : [{
        title: '',
        issuer: '',
        startDate: '',
        endDate: '',
        isCurrent: false,
        description: '',
        certificateLink: ''
      }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'certifications'
  });

  const watchedFields = watch('certifications');

  const onSubmit = (data: CertificationsFormData) => {
    updateCV({ certifications: data.certifications });
  };

  const handleAddCertification = () => {
    append({
      title: '',
      issuer: '',
      startDate: '',
      endDate: '',
      isCurrent: false,
      description: '',
      certificateLink: ''
    });
  };

  const handleRemoveCertification = (index: number) => {
    if (fields.length > 1) {
      remove(index);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Certifications</h3>
        <button
          type="button"
          onClick={handleAddCertification}
          className="px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90 transition-colors"
        >
          Add Certification
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {fields.map((field, index) => (
          <div key={field.id} className="p-6 border border-border rounded-lg bg-card">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-md font-medium text-foreground">
                Certification {index + 1}
              </h4>
              {fields.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveCertification(index)}
                  className="text-sm text-destructive hover:text-destructive/80 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Certification Title *
                </label>
                <input
                  {...register(`certifications.${index}.title`)}
                  type="text"
                  placeholder="e.g., AWS Certified Solutions Architect"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.certifications?.[index]?.title && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.certifications[index]?.title?.message}
                  </p>
                )}
              </div>

              {/* Issuer */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Issuing Organization *
                </label>
                <input
                  {...register(`certifications.${index}.issuer`)}
                  type="text"
                  placeholder="e.g., Amazon Web Services"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.certifications?.[index]?.issuer && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.certifications[index]?.issuer?.message}
                  </p>
                )}
              </div>

              {/* Start Date */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Start Date *
                </label>
                <input
                  {...register(`certifications.${index}.startDate`)}
                  type="month"
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.certifications?.[index]?.startDate && (
                  <p className="mt-1 text-sm text-destructive">
                    {errors.certifications[index]?.startDate?.message}
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
                    {...register(`certifications.${index}.endDate`)}
                    type="month"
                    disabled={watch(`certifications.${index}.isCurrent`)}
                    className="flex-1 px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  />
                  <label className="flex items-center space-x-2 text-sm text-foreground">
                    <input
                      {...register(`certifications.${index}.isCurrent`)}
                      type="checkbox"
                      className="rounded border-input text-primary focus:ring-ring"
                    />
                    <span>Current</span>
                  </label>
                </div>
              </div>

              {/* Certificate Link */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Certificate Link (Optional)
                </label>
                <input
                  {...register(`certifications.${index}.certificateLink`)}
                  type="url"
                  placeholder="https://verify.credly.com/..."
                  className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
                />
                {errors.certifications?.[index]?.certificateLink && (
                  <p className="mt-1 text-sm text-destructive">
                    Please enter a valid URL
                  </p>
                )}
              </div>
            </div>

            {/* Description */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-2">
                Description (Optional)
              </label>
              <textarea
                {...register(`certifications.${index}.description`)}
                rows={3}
                placeholder="Describe what this certification covers, skills validated, or any notable achievements..."
                className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent resize-vertical"
              />
              <p className="mt-2 text-xs text-muted-foreground">
                Include relevant details about the certification scope and your expertise level
              </p>
            </div>
          </div>
        ))}

        {errors.certifications && (
          <p className="text-sm text-destructive">
            {errors.certifications.message}
          </p>
        )}
      </form>
    </div>
  );
};

export default CertificationsForm;
