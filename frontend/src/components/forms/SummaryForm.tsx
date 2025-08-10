import React from 'react';
import { useForm } from 'react-hook-form';
import { useCV } from '../../contexts/CVContext';

interface SummaryFormData {
  summary: string;
}

const SummaryForm: React.FC = () => {
  const { cvData, dispatch } = useCV();
  const maxLength = 500;

  const {
    register,
    watch,
    formState: { isDirty },
  } = useForm<SummaryFormData>({
    defaultValues: {
      summary: cvData.summary || '',
    },
  });

  const watchedSummary = watch('summary');

  // Update CV data when form changes (debounced)
  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      dispatch({
        type: 'UPDATE_SUMMARY',
        payload: watchedSummary,
      });
    }, 300); // 300ms debounce

    return () => clearTimeout(timeoutId);
  }, [watchedSummary, dispatch]);

  const characterCount = watchedSummary.length;
  const isOverLimit = characterCount > maxLength;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          Professional Summary
        </h2>
        <div className="flex items-center space-x-2">
          {cvData.summary && (
            <div className="flex items-center text-green-600 dark:text-green-400">
              <svg className="w-5 h-5 mr-1" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">Added</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Write a brief, impactful summary of your experience
          </label>
          <textarea
            {...register('summary')}
            rows={6}
            maxLength={maxLength}
            className={`input-field resize-none ${
              isOverLimit ? 'border-red-500 focus:ring-red-500' : ''
            }`}
            placeholder="Experienced software engineer with 5+ years developing scalable web applications using React, Node.js, and cloud technologies. Passionate about clean code, user experience, and mentoring junior developers. Led teams of 3-5 developers to deliver projects on time and within budget."
          />
          
          <div className="flex items-center justify-between mt-2">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              This summary will appear at the top of your CV to give recruiters a quick overview of your background.
            </p>
            <div className={`text-sm font-medium ${
              isOverLimit ? 'text-red-600 dark:text-red-400' : 'text-gray-500 dark:text-gray-400'
            }`}>
              {characterCount}/{maxLength}
            </div>
          </div>
          
          {isOverLimit && (
            <p className="mt-1 text-sm text-red-600 dark:text-red-400">
              Summary is too long. Please keep it under {maxLength} characters.
            </p>
          )}
        </div>

        {/* Tips */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h4 className="text-sm font-medium text-blue-800 dark:text-blue-200 mb-2">
            💡 Writing Tips
          </h4>
          <ul className="text-sm text-blue-700 dark:text-blue-300 space-y-1">
            <li>• Start with your years of experience and key skills</li>
            <li>• Mention your biggest achievements or impact</li>
            <li>• Include your career goals or what you're looking for</li>
            <li>• Use strong action verbs (developed, led, implemented)</li>
            <li>• Keep it concise and scannable for recruiters</li>
          </ul>
        </div>

        {/* Live Preview */}
        {watchedSummary && (
          <div className="border-t border-gray-200 dark:border-gray-700 pt-4">
            <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Preview
            </h4>
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4">
              <p className="text-gray-900 dark:text-gray-100 leading-relaxed">
                {watchedSummary}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryForm;
