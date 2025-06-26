// Google Analytics utility functions
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export const GA_MEASUREMENT_ID = 'G-DKBHZ3L07D';

// Track page views
export const pageview = (url: string) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', GA_MEASUREMENT_ID, {
      page_location: url,
    });
  }
};

// Track events
export const trackEvent = (
  action: string,
  category: string,
  label?: string,
  value?: number
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track conversions (form submissions, demo requests, etc.)
export const trackConversion = (
  conversionName: string,
  value?: number,
  currency = 'USD'
) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'conversion', {
      send_to: GA_MEASUREMENT_ID,
      event_category: 'engagement',
      event_label: conversionName,
      value: value,
      currency: currency,
    });
  }
};

// Track demo requests
export const trackDemoRequest = (demoType: string) => {
  trackEvent('demo_request', 'lead_generation', demoType);
  trackConversion('demo_request');
};

// Track pricing interactions
export const trackPricingView = (plan: string) => {
  trackEvent('pricing_view', 'engagement', plan);
};

// Track button clicks
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', 'engagement', `${buttonName}_${location}`);
};

// Track form submissions
export const trackFormSubmission = (formType: string) => {
  trackEvent('form_submit', 'lead_generation', formType);
  trackConversion('form_submission');
};

// Track feature clicks
export const trackFeatureClick = (featureName: string) => {
  trackEvent('feature_click', 'engagement', featureName);
};

// Track scroll depth
export const trackScrollDepth = (percentage: number) => {
  trackEvent('scroll_depth', 'engagement', `${percentage}%`);
};

// Track time on page
export const trackTimeOnPage = (seconds: number) => {
  trackEvent('time_on_page', 'engagement', 'duration', seconds);
}; 