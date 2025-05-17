import { useEffect, useRef } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { vscodeDark } from '@uiw/codemirror-theme-vscode';

function Editor({ code, onChange, onRunCode, isRunning }) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (editorRef.current?.view) {
      editorRef.current.view.focus();
    }
  }, []);

  return (
    <div className="flex flex-col h-full">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-800 border-b border-gray-700">
        <div className="text-sm text-gray-300">main.js</div>
        <button
          className={`run-button px-4 py-1.5 rounded-md font-medium transition-all duration-200 focus:outline-none ${
            isRunning
              ? 'bg-gray-700 text-gray-300 cursor-not-allowed'
              : 'bg-accent text-white hover:bg-accent/90'
          }`}
          onClick={onRunCode}
          disabled={isRunning}
        >
          {isRunning ? (
            <span className="flex items-center">
              Running...
            </span>
          ) : (
            'Run ▶'
          )}
        </button>
      </div>
      <div className="flex-1 overflow-auto">
        <CodeMirror
          ref={editorRef}
          value={code}
          height="100%"
          theme={vscodeDark}
          extensions={[javascript({ jsx: true })]}
          onChange={onChange}
          basicSetup={{
            lineNumbers: true,
            highlightActiveLineGutter: true,
            highlightActiveLine: true,
            foldGutter: true,
            autocompletion: true,
            bracketMatching: true,
            closeBrackets: true,
          }}
        />
      </div>
    </div>
  );
}

export default Editor;