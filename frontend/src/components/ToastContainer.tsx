import React, { useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import Toast, { ToastType } from './Toast';

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
}

interface ToastContainerProps {
  toasts: ToastData[];
  onRemoveToast: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onRemoveToast }) => {
  const handleClose = useCallback((id: string) => {
    onRemoveToast(id);
  }, [onRemoveToast]);

  // Create portal to render toasts at the top level
  const toastContainer = (
    <div
      className="fixed top-4 right-4 z-50 space-y-4 max-w-sm w-full"
      role="region"
      aria-label="Notifications"
      aria-live="polite"
      aria-atomic="false"
    >
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          id={toast.id}
          type={toast.type}
          title={toast.title}
          message={toast.message}
          duration={toast.duration}
          onClose={handleClose}
        />
      ))}
    </div>
  );

  // Use portal to render toasts at the document body level
  return createPortal(toastContainer, document.body);
};

export default ToastContainer;
