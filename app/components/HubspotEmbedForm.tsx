'use client';

import { useEffect } from 'react';

type HubspotFormError = Error | { 
  message: string; 
  [key: string]: unknown 
};

export default function HubspotEmbedForm() {
  useEffect(() => {
    // Create global hbspt object if it doesn't exist
    if (typeof window !== 'undefined') {
      window.hbspt = window.hbspt || {};
      window.hbspt.forms = window.hbspt.forms || {};
      window.hbspt.forms.create = window.hbspt.forms.create || function () { 
        console.error('HubSpot forms create function not properly loaded');
      };
    }
    
    // Load HubSpot script
    const script = document.createElement('script');
    script.src = "//js.hsforms.net/forms/embed/v2.js";
    script.charset = "utf-8";
    script.type = "text/javascript";
    
    script.onload = () => {
      console.log('HubSpot script loaded, attempting to create form');
      if (window.hbspt && window.hbspt.forms) {
        try {
          window.hbspt.forms.create({
            region: "na1",
            portalId: "2550768",
            formId: "5dbc2ee1-5e21-4e90-b721-ed3804904a1c",
            target: "#directHubspotForm",
            onFormError: (err: HubspotFormError) => {
              console.error('HubSpot form error:', err);
              // Error is handled at the container level
            }
          });
        } catch (e) {
          console.error('Error creating HubSpot form:', e);
        }
      }
    };
    
    document.head.appendChild(script);
    
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
    };
  }, []);
  
  return (
    <div className="hubspot-form-container">
      <div id="directHubspotForm" className="min-h-[300px]">
        <div className="flex items-center justify-center p-4">
          <div className="animate-pulse flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 mb-4 text-[#0B2E52]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg text-[#0B2E52]">جاري تحميل النموذج...</span>
          </div>
        </div>
      </div>
    </div>
  );
} 