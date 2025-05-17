import { useState, useEffect } from 'react';
import Header from './components/Header';
import Editor from './components/Editor';
import Terminal from './components/Terminal';
import Footer from './components/Footer';
import { runCode } from './services/codeService';

function App() {
  const [code, setCode] = useState('// Write your code here\nconsole.log("Hello, world!");\n');
  const [terminalOutput, setTerminalOutput] = useState('');
  const [isRunning, setIsRunning] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleRunCode = async () => {
    try {
      setIsRunning(true);
      setTerminalOutput('Running...\n');
      
      const result = await runCode(code);
      setTerminalOutput(result.output);
    } catch (error) {
      setTerminalOutput(`Error: ${error.message || 'Failed to run code'}`);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <Header />
      
      <div className={`flex flex-1 ${isMobile ? 'flex-col' : 'flex-row'} overflow-hidden`}>
        <div className={`${isMobile ? 'h-1/2' : 'w-1/2'} border-r border-gray-700`}>
          <Editor 
            code={code} 
            onChange={setCode} 
            onRunCode={handleRunCode}
            isRunning={isRunning}
          />
        </div>
        <div className={`${isMobile ? 'h-1/2' : 'w-1/2'}`}>
          <Terminal output={terminalOutput} />
        </div>
      </div>
      
      <Footer />
    </div>
  );
}

export default App;