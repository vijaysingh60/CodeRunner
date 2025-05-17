import { useEffect, useRef } from 'react';
import { Terminal as XTerm } from 'xterm';
import { FitAddon } from 'xterm-addon-fit';
import 'xterm/css/xterm.css';

function Terminal({ output }) {
  const terminalRef = useRef(null);
  const xtermRef = useRef(null);
  const fitAddonRef = useRef(null);

  useEffect(() => {
    if (!xtermRef.current && terminalRef.current) {

      xtermRef.current = new XTerm({
        cursorBlink: true,
        theme: {
          background: '#1E1E1E',
          foreground: '#FFFFFF',
          cursor: '#FFFFFF',
          selection: 'rgba(255, 255, 255, 0.3)',
        },
        fontFamily: 'Menlo, Monaco, "Courier New", monospace',
        fontSize: 14,
        lineHeight: 1.5,
      });

      fitAddonRef.current = new FitAddon();
      xtermRef.current.loadAddon(fitAddonRef.current);
      

      xtermRef.current.open(terminalRef.current);
      
      setTimeout(() => {
        if (fitAddonRef.current) {
          fitAddonRef.current.fit();
        }
      }, 0);
      

      xtermRef.current.writeln('Welcome to CodeRunner Terminal');
      xtermRef.current.writeln('Run your code to see output here');
      xtermRef.current.writeln('');
    }


    const handleResize = () => {
      if (fitAddonRef.current) {
        fitAddonRef.current.fit();
      }
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (xtermRef.current && output) {
     
        xtermRef.current.clear();
        
        //indentation problem
        const lines = output.replace(/\r\n/g, '\n').split('\n');
        lines.forEach((line) => {
            xtermRef.current.writeln(line);
        });

    }
  }, [output]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="text-sm text-gray-300">Terminal</div>
      </div>
      <div 
        ref={terminalRef} 
        className="flex-1 bg-terminal-bg text-terminal-text overflow-hidden animate-fade-in"
      />
    </div>
  );
}

export default Terminal;