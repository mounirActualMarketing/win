'use client';

import { useEffect, useState, RefObject, useCallback } from 'react';

interface HubspotFormProps {
  portalId: string;
  formId: string;
  region: string;
  containerRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
}

export function useHubspotForm({
  portalId,
  formId,
  region,
  containerRef,
  isOpen
}: HubspotFormProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load HubSpot script and create form
  useEffect(() => {
    if (!isOpen) return;
    
    // Reset states
    setIsLoaded(false);
    setError(null);
    
    // Make sure container is empty
    if (containerRef.current) {
      containerRef.current.innerHTML = '';
    }
    
    // Create script element
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    
    // When script loads, create the form
    script.onload = () => {
      if (!containerRef.current) return;
      
      // Ensure the container has an ID
      if (!containerRef.current.id) {
        containerRef.current.id = 'hubspotForm';
      }
      
      try {
        // Simple direct call to create form
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#${containerRef.current.id}`,
        });
        
        setIsLoaded(true);
        console.log('HubSpot form created successfully');
      } catch (err) {
        console.error('Error creating HubSpot form:', err);
        setError('Failed to create HubSpot form');
      }
    };
    
    script.onerror = () => {
      console.error('Failed to load HubSpot script');
      setError('Failed to load HubSpot script');
    };
    
    // Append script to document
    document.body.appendChild(script);
    
    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [isOpen, containerRef, portalId, formId, region]);
  
  // Function to reload the form
  const reloadForm = useCallback(() => {
    // Reset error state
    setError(null);
    
    // Try to create form if HubSpot script is loaded
    if (window.hbspt && containerRef.current) {
      try {
        containerRef.current.innerHTML = '';
        
        window.hbspt.forms.create({
          portalId,
          formId,
          region,
          target: `#${containerRef.current.id || 'hubspotForm'}`,
        });
        
        setIsLoaded(true);
        console.log('HubSpot form reloaded successfully');
      } catch (err) {
        console.error('Error reloading HubSpot form:', err);
        setError('Failed to reload HubSpot form');
      }
    } else {
      setError('HubSpot script not loaded');
    }
  }, [containerRef, portalId, formId, region]);

  return {
    isLoaded,
    error,
    reload: reloadForm
  };
} 