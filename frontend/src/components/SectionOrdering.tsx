import React, { useState } from 'react';
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { useCV } from '../contexts/CVContext';

interface SortableSectionItemProps {
  id: string;
  title: string;
  icon: string;
  required: boolean;
  isComplete: boolean;
}

const SortableSectionItem: React.FC<SortableSectionItemProps> = ({ 
  id, 
  title, 
  icon, 
  required, 
  isComplete 
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg cursor-move transition-all duration-200 ${
        isDragging ? 'opacity-50 shadow-lg scale-105' : 'hover:shadow-md'
      }`}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-center space-x-3">
        <div className="flex-shrink-0">
          <div className="w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center text-lg">
            {icon}
          </div>
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2">
            <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
              {title}
            </h3>
            {required && (
              <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">
                Required
              </span>
            )}
          </div>
        </div>
        
        <div className="flex-shrink-0">
          {isComplete ? (
            <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
              <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
          ) : (
            <div className="w-5 h-5 border-2 border-gray-300 dark:border-gray-600 rounded-full" />
          )}
        </div>
        
        <div className="flex-shrink-0">
          <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M7 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 2zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 7 14zm6-8a2 2 0 1 1-.001-4.001A2 2 0 0 1 13 6zm0 2a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 8zm0 6a2 2 0 1 1 .001 4.001A2 2 0 0 1 13 14z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

const SectionOrdering: React.FC = () => {
  const { cvData, dispatch } = useCV();
  
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Define all available sections
  const allSections = [
    { id: 'personal', title: 'Personal Information', icon: '👤', required: true },
    { id: 'summary', title: 'Professional Summary', icon: '📝', required: false },
    { id: 'work', title: 'Work Experience', icon: '💼', required: false },
    { id: 'education', title: 'Education', icon: '🎓', required: false },
    { id: 'skills', title: 'Skills', icon: '⚡', required: false },
    { id: 'certifications', title: 'Certifications', icon: '🏆', required: false },
    { id: 'projects', title: 'Projects', icon: '🚀', required: false },
    { id: 'languages', title: 'Languages', icon: '🌍', required: false },
  ];

  // Get current section order or use default
  const currentOrder = cvData.customization.sectionOrder.length > 0 
    ? cvData.customization.sectionOrder 
    : allSections.map(s => s.id);

  // Sort sections according to current order
  const orderedSections = currentOrder
    .map(id => allSections.find(section => section.id === id))
    .filter(Boolean) as typeof allSections;

  const getSectionStatus = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return cvData.personalInfo.fullName && cvData.personalInfo.email;
      case 'summary':
        return !!cvData.summary;
      case 'work':
        return cvData.workExperience.length > 0;
      case 'education':
        return cvData.education.length > 0;
      case 'skills':
        return cvData.skills.length > 0;
      case 'certifications':
        return cvData.certifications.length > 0;
      case 'projects':
        return cvData.projects.length > 0;
      case 'languages':
        return cvData.languages.length > 0;
      default:
        return false;
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (active.id !== over?.id) {
      const oldIndex = orderedSections.findIndex(section => section.id === active.id);
      const newIndex = orderedSections.findIndex(section => section.id === over?.id);

      const newOrder = arrayMove(orderedSections, oldIndex, newIndex).map(section => section.id);
      
      dispatch({ type: 'REORDER_SECTIONS', payload: newOrder });
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2">
          Section Order
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Drag and drop to reorder the sections in your CV. The order will be reflected in both the form and preview.
        </p>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={orderedSections.map(section => section.id)}
          strategy={verticalListSortingStrategy}
        >
          <div className="space-y-3">
            {orderedSections.map((section) => (
              <SortableSectionItem
                key={section.id}
                id={section.id}
                title={section.title}
                icon={section.icon}
                required={section.required}
                isComplete={getSectionStatus(section.id)}
              />
            ))}
          </div>
        </SortableContext>
      </DndContext>

      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700">
        <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
          💡 Tip: Required sections (Personal Information) will always appear first in your CV
        </p>
      </div>
    </div>
  );
};

export default SectionOrdering;
