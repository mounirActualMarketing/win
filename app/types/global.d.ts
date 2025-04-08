interface Window {
  hbspt: {
    forms: {
      create: (options: {
        portalId: string;
        formId: string;
        region: string;
        target?: string;
        onFormReady?: () => void;
        onFormSubmit?: () => void;
        onFormError?: (error: any) => void;
      }) => void;
    };
  };
} 