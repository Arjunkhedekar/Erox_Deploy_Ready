import axios from 'axios';

const sendRequestToBackend = async (orderId, user, filenames, metadata) => {
  try {
    // Validate inputs
    if (!orderId || !user || !Array.isArray(filenames) || filenames.length === 0) {
      throw new Error('Invalid request: orderId, user, and filenames are required.');
    }

    // Define the request body
    const requestBody = {
      orderId,
      user,
      filenames,
      metadata, // Optional, make sure metadata has the correct structure
    };

    // Send POST request
    const response = await axios.post('http://localhost:3000/printNow', requestBody);
    console.log('Response from backend:', response.data);
    alert(`Success: ${response.data.message}`);
  } catch (error) {
    console.error('Error sending request to backend:', error);
    alert('Failed to send request to backend. Please try again.');
  }
};

export default sendRequestToBackend;
