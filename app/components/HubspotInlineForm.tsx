'use client';

import Script from 'next/script';
import { useEffect, useRef, useState } from 'react';

export default function HubspotInlineForm() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Check if HubSpot script loaded successfully
    const timer = setTimeout(() => {
      if (typeof window !== 'undefined' && !window.hbspt) {
        setError('HubSpot script failed to load. Please refresh the page and try again.');
      }
    }, 5000); // Check after 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleScriptLoad = () => {
    console.log('HubSpot script loaded, attempting to create form');
    
    try {
      if (window.hbspt && containerRef.current) {
        window.hbspt.forms.create({
          region: "na1",
          portalId: "2550768",
          formId: "5dbc2ee1-5e21-4e90-b721-ed3804904a1c",
          target: "#hubspot-form-container",
          onFormError: (error) => {
            console.error('HubSpot form error:', error);
            if (error instanceof Error) {
              setError(error.message);
            } else if (typeof error === 'object' && error.message) {
              setError(error.message);
            } else {
              setError('An unknown error occurred with the form');
            }
          }
        });
        console.log('HubSpot form creation requested');
      } else {
        console.warn('HubSpot or container not available yet');
      }
    } catch (err) {
      console.error('Error creating HubSpot form:', err);
      setError('Error creating form. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScriptError = () => {
    console.error('Failed to load HubSpot script');
    setError('Failed to load the form script. Please try again later.');
    setIsLoading(false);
  };

  return (
    <div className="w-full min-h-[300px]">
      {isLoading && (
        <div className="flex items-center justify-center p-4">
          <div className="animate-pulse flex flex-col items-center">
            <svg className="animate-spin h-10 w-10 mb-4 text-[#0B2E52]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span className="text-lg text-[#0B2E52]">جاري تحميل النموذج...</span>
          </div>
        </div>
      )}

      {error && (
        <div className="text-red-600 p-6 rounded bg-red-50 flex flex-col items-center">
          <p className="text-lg mb-2 font-medium">حدث خطأ أثناء تحميل النموذج</p>
          <p className="text-sm">{error}</p>
          <button 
            onClick={() => window.location.reload()}
            className="mt-4 bg-[#0B2E52] text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-[#0A2540] transition-colors"
            style={{ fontFamily: 'var(--font-montserrat-arabic)' }}
          >
            إعادة المحاولة
          </button>
        </div>
      )}

      <div id="hubspot-form-container" ref={containerRef} className="min-h-[300px]">
        {/* HubSpot form will be loaded here */}
      </div>

      {/* Directly embed HubSpot form using Next.js Script component */}
      <Script
        id="hubspot-forms-script"
        src="//js.hsforms.net/forms/embed/v2.js"
        onLoad={handleScriptLoad}
        onError={handleScriptError}
        strategy="afterInteractive"
      />
    </div>
  );
} 