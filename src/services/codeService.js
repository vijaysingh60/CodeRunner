import axios from 'axios';


const API_URL = "https://coderunner-g0n7.onrender.com";

export async function runCode(code) {
    try {
        const response = await axios.post(`${API_URL}/run`, { code });
        return response.data;
    } catch (error) {
        if (error.response) {
            throw new Error(error.response.data.error || 'Failed to run code');
            }
            throw new Error('Unable to connect to server');
    }
}
