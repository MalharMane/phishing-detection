import axios from 'axios';

// URL-safe Base64 encode function
const base64urlEncode = (url) => {
  return btoa(url).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};

export const checkWebsite = async (url) => {
  const encodedUrl = base64urlEncode(url);
  try {
    const response = await axios.get(
      `https://www.virustotal.com/api/v3/urls/${encodedUrl}`,
      {
        headers: {
          'x-apikey': process.env.REACT_APP_VIRUSTOTAL_API_KEY,
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error checking website:", error);
    throw error;
  }
};
