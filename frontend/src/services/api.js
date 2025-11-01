import axios from 'axios';

export const sendSMS = async (numbers, message) => {
  try {
    const response = await axios.post('http://localhost:5000/api/sms/send', {
      numbers,
      message,
    });
    return response.data;
  } catch (error) {
    console.error("❌ SMS Error:", error);
    throw error;
  }
};
