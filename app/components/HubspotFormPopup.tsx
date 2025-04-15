'use client';

import { useEffect, useRef, useState } from 'react';
import HubspotInlineForm from './HubspotInlineForm';

export default function HubspotFormPopup({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [isVisible, setIsVisible] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  
  // Handle escape key for closing the modal and visibility animations
  useEffect(() => {
    const handleEscapeKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
      
      // Simple timeout for animation
      setTimeout(() => {
        setIsVisible(true);
      }, 10);
    } else {
      setIsVisible(false);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);

  // Close when clicking outside the modal
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  // Handle the close button click
  const handleCloseClick = () => {
    onClose();
  };

  // Render nothing if popup shouldn't be open
  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 bg-black z-50 flex items-center justify-center p-4 transition-opacity duration-300 ${isVisible ? 'bg-opacity-60' : 'bg-opacity-0'}`}
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        ref={modalRef}
        className={`bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto relative transition-transform duration-300 ${isVisible ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}`}
        style={{ boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button 
          onClick={handleCloseClick}
          className="absolute top-4 right-4 bg-gray-200 rounded-full p-2 text-gray-700 hover:bg-gray-300 transition-colors"
          aria-label="Close"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>

        <div className="p-6 pt-10 text-center">
          <h2 
            id="modal-title"
            style={{ 
              direction: 'rtl',
              fontFamily: 'var(--font-montserrat-arabic)',
              fontWeight: 600,
              color: '#0B2E52'
            }}
            className="text-3xl mb-6"
          >
            سجّل الآن واحصل على العروض الحصرية!
          </h2>
          
          {/* Use the inline form component */}
          {isVisible && <HubspotInlineForm />}
        </div>
      </div>
    </div>
  );
} 