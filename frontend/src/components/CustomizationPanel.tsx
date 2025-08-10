import React, { useState } from 'react';
import { useCV } from '../contexts/CVContext';

interface ColorOption {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  preview: string;
}

const colorOptions: ColorOption[] = [
  {
    id: 'phoenix',
    name: 'Phoenix Orange',
    primary: '#F25C1C',
    secondary: '#F47A2E',
    preview: '🟠'
  },
  {
    id: 'blue',
    name: 'Professional Blue',
    primary: '#2563EB',
    secondary: '#3B82F6',
    preview: '🔵'
  },
  {
    id: 'green',
    name: 'Success Green',
    primary: '#059669',
    secondary: '#10B981',
    preview: '🟢'
  },
  {
    id: 'purple',
    name: 'Creative Purple',
    primary: '#7C3AED',
    secondary: '#8B5CF6',
    preview: '🟣'
  },
  {
    id: 'gray',
    name: 'Monochrome',
    primary: '#374151',
    secondary: '#6B7280',
    preview: '⚫'
  },
  {
    id: 'red',
    name: 'Bold Red',
    primary: '#DC2626',
    secondary: '#EF4444',
    preview: '🔴'
  }
];

interface IconOption {
  id: string;
  name: string;
  preview: string;
  style: string;
}

const iconOptions: IconOption[] = [
  { id: 'minimal', name: 'Minimal', preview: '○', style: 'Simple geometric shapes' },
  { id: 'professional', name: 'Professional', preview: '●', style: 'Clean filled circles' },
  { id: 'creative', name: 'Creative', preview: '◆', style: 'Diamond shapes' },
  { id: 'modern', name: 'Modern', preview: '■', style: 'Square blocks' },
  { id: 'elegant', preview: '◇', name: 'Elegant', style: 'Outlined diamonds' },
  { id: 'tech', name: 'Tech', preview: '⚡', style: 'Technology symbols' }
];

const CustomizationPanel: React.FC = () => {
  const { cvData, dispatch } = useCV();
  const [activeTab, setActiveTab] = useState<'colors' | 'icons' | 'layout'>('colors');

  const handleColorChange = (colorId: string) => {
    const color = colorOptions.find(c => c.id === colorId);
    if (color) {
      dispatch({
        type: 'UPDATE_CUSTOMIZATION',
        payload: {
          primaryColor: color.primary,
          secondaryColor: color.secondary
        }
      });
    }
  };

  const handleIconChange = (iconId: string) => {
    dispatch({
      type: 'UPDATE_CUSTOMIZATION',
      payload: { iconStyle: iconId }
    });
  };

  const handleLayoutChange = (layoutId: string) => {
    dispatch({
      type: 'UPDATE_CUSTOMIZATION',
      payload: { layout: layoutId }
    });
  };

  const tabs = [
    { id: 'colors', name: 'Colors', icon: '🎨' },
    { id: 'icons', name: 'Icons', icon: '✨' },
    { id: 'layout', name: 'Layout', icon: '📐' }
  ] as const;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Customize Your CV
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Personalize the appearance of your CV with colors, icons, and layout options.
        </p>
      </div>

      {/* Tab Navigation */}
      <div className="mb-6">
        <div className="flex space-x-1 bg-gray-100 dark:bg-gray-700 rounded-lg p-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-gray-600 text-gray-900 dark:text-gray-100 shadow-sm'
                  : 'text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Colors Tab */}
      {activeTab === 'colors' && (
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-4">
            Choose Your Color Scheme
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {colorOptions.map((color) => (
              <div
                key={color.id}
                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  cvData.customization.primaryColor === color.primary
                    ? 'border-phoenix-500 bg-phoenix-50 dark:bg-phoenix-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => handleColorChange(color.id)}
              >
                <div className="text-center">
                  <div className="text-2xl mb-2">{color.preview}</div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {color.name}
                  </h4>
                  <div className="flex justify-center space-x-1 mt-2">
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.primary }}
                    />
                    <div 
                      className="w-4 h-4 rounded-full border border-gray-300"
                      style={{ backgroundColor: color.secondary }}
                    />
                  </div>
                </div>
                {cvData.customization.primaryColor === color.primary && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-phoenix-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Icons Tab */}
      {activeTab === 'icons' && (
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-4">
            Choose Your Icon Style
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {iconOptions.map((icon) => (
              <div
                key={icon.id}
                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 ${
                  cvData.customization.iconStyle === icon.id
                    ? 'border-phoenix-500 bg-phoenix-50 dark:bg-phoenix-900/20'
                    : 'border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => handleIconChange(icon.id)}
              >
                <div className="text-center">
                  <div className="text-3xl mb-2">{icon.preview}</div>
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                    {icon.name}
                  </h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {icon.style}
                  </p>
                </div>
                {cvData.customization.iconStyle === icon.id && (
                  <div className="absolute top-2 right-2">
                    <div className="w-5 h-5 bg-phoenix-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Layout Tab */}
      {activeTab === 'layout' && (
        <div>
          <h3 className="text-md font-medium text-gray-900 dark:text-gray-100 mb-4">
            Choose Your Layout Style
          </h3>
          <div className="space-y-4">
            {/* Spacing Options */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Section Spacing
              </h4>
              <div className="flex space-x-3">
                {['compact', 'standard', 'spacious'].map((spacing) => (
                  <button
                    key={spacing}
                    onClick={() => handleLayoutChange(spacing)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cvData.customization.spacing === spacing
                        ? 'bg-phoenix-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {spacing.charAt(0).toUpperCase() + spacing.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Typography Options */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Typography
              </h4>
              <div className="flex space-x-3">
                {['inter', 'roboto', 'open-sans'].map((font) => (
                  <button
                    key={font}
                    onClick={() => handleLayoutChange(font)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cvData.customization.fontFamily === font
                        ? 'bg-phoenix-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                    style={{ fontFamily: font === 'inter' ? 'Inter' : font === 'roboto' ? 'Roboto' : 'Open Sans' }}
                  >
                    {font.charAt(0).toUpperCase() + font.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {/* Border Style */}
            <div>
              <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                Border Style
              </h4>
              <div className="flex space-x-3">
                {['none', 'subtle', 'prominent'].map((border) => (
                  <button
                    key={border}
                    onClick={() => handleLayoutChange(border)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      cvData.customization.borderStyle === border
                        ? 'bg-phoenix-600 text-white'
                        : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
                    }`}
                  >
                    {border.charAt(0).toUpperCase() + border.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Preview Note */}
      <div className="mt-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
        <p className="text-xs text-gray-600 dark:text-gray-400 text-center">
          💡 Changes are applied in real-time to your CV preview
        </p>
      </div>
    </div>
  );
};

export default CustomizationPanel;
