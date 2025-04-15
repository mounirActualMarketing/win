'use client';

import { useEffect, useRef } from 'react';

interface SimpleHubspotFormProps {
  portalId: string;
  formId: string;
  region: string;
}

type HubspotFormError = Error | { 
  message: string; 
  [key: string]: unknown 
};

export default function SimpleHubspotForm({ portalId, formId, region }: SimpleHubspotFormProps) {
  const formContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Clean up the container
    if (formContainerRef.current) {
      formContainerRef.current.innerHTML = '';
    }

    // Create and append HubSpot script
    const script = document.createElement('script');
    script.src = '//js.hsforms.net/forms/embed/v2.js';
    script.charset = 'utf-8';
    script.type = 'text/javascript';
    script.async = true;
    script.onload = () => {
      if (formContainerRef.current && window.hbspt) {
        try {
          console.log('Creating HubSpot form:', { portalId, formId, region });
          window.hbspt.forms.create({
            portalId,
            formId,
            region,
            target: '#hubspotDirectForm',
            onFormError: (err: HubspotFormError) => {
              console.error('HubSpot form error:', err);
              // Error handling is done at the container level
            }
          });
        } catch (err) {
          console.error('Error creating HubSpot form:', err);
        }
      }
    };

    document.body.appendChild(script);

    return () => {
      // Clean up script on unmount
      if (script && script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, [portalId, formId, region]);

  return (
    <div 
      id="hubspotDirectForm" 
      ref={formContainerRef} 
      className="w-full min-h-[300px]"
    >
      <div className="flex items-center justify-center p-4 text-center">
        <div className="animate-pulse flex flex-col items-center">
          <svg className="animate-spin h-10 w-10 mb-4 text-[#0B2E52]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <span className="text-lg text-[#0B2E52]">جاري تحميل النموذج...</span>
        </div>
      </div>
    </div>
  );
} 