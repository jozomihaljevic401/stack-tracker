export const API_CONFIG = {
  googleCloud: {
    visionApiEndpoint: 'https://vision.googleapis.com/v1/images:annotate',
    visionApiKey: import.meta.env.VITE_GOOGLE_CLOUD_VISION_API_KEY,
  },
  gemini: {
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent',
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_API_KEY,
  },
};