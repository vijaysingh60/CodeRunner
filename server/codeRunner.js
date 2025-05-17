import { exec } from 'child_process';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const tempDir = path.join(__dirname, 'temp');


try {
  await fs.mkdir(tempDir, { recursive: true });
} catch (error) {
  console.error('Failed to create temp directory:', error);
}


export async function execCode(code) {

  const fileId = Date.now().toString();
  const filename = `code_${fileId}.js`;
  const filepath = path.join(tempDir, filename);
  
  try {
  
    await fs.writeFile(filepath, code);
    
  
    const output = await executeFile(filepath);
    
   
    await fs.unlink(filepath);
    
    return output;
  } catch (error) {
    
    try {
      await fs.unlink(filepath);
    } catch (unlinkError) {
      
    }
    
    throw error;
  }
}

function executeFile(filepath) {
  return new Promise((resolve, reject) => {
    // Set a timeout of 5 seconds
    const timeout = 5000;
    
    // In a production environment, this would use Docker for isolation
    // For this demo, we're using Node directly with timeout
    const process = exec(`node "${filepath}"`, { timeout }, (error, stdout, stderr) => {
      if (error) {
        // If this is a timeout error
        if (error.signal === 'SIGTERM') {
          reject(new Error('Execution timed out (5 seconds)'));
        } else {
          reject(new Error(stderr || error.message));
        }
        return;
      }
      
      // Return combined output
      resolve(stdout + (stderr ? `\nErrors:\n${stderr}` : ''));
    });
  });
}
// function executeFile(filepath) {
//     return new Promise((resolve, reject) => {
//       const dockerCommand = `docker run --rm -v "${filepath}:/code.js:ro" node:20-alpine node /code.js`;
  
//       exec(dockerCommand, { timeout: 50000 }, (error, stdout, stderr) => {
//         if (error) {
         
//           if (error.signal === 'SIGTERM') {
//             reject(new Error('Execution timed out (5 seconds)'));
//           } else {
//             reject(new Error(stderr || error.message));
//           }
//           return;
//         }
  
//         resolve(stdout + (stderr ? `\nErrors:\n${stderr}` : ''));
//       });
//     });
//   }
  