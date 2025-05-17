import express from 'express';
import cors from 'cors';
import { execCode } from './codeRunner.js';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.post('/run', async (req, res) => {
  try {
    const { code } = req.body;
    
    if (!code) {
      return res.status(400).json({ error: 'No code provided' });
    }
    
    const result = await execCode(code);
    
    return res.json({ output: result });
  } catch (error) {
    console.error('Error executing code:', error);
    return res.status(500).json({ error: error.message || 'Failed to execute code' });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});