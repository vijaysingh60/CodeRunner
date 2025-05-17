import { useState, useEffect } from 'react';

function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`py-3 px-6 flex items-center justify-between transition-all duration-300 ${
        isScrolled ? 'bg-gray-900 shadow-md' : 'bg-gray-900'
      }`}
    >
      <div className="flex items-center">
        <span className="text-xl font-bold text-white mr-2">
          Vijay CodeRunner
        </span>
        <span className="hidden sm:block bg-blue-600 text-xs px-2 py-1 rounded text-white">BETA</span>
      </div>
      
      <div className="flex space-x-3">
        <select 
          className="bg-gray-800 border border-gray-700 rounded px-2 py-1 text-sm text-white focus:outline-none focus:ring-1 focus:ring-primary"
          defaultValue="javascript"
        >
          <option value="javascript">JavaScript</option>
          <option disabled value="python">Python (Coming Soon)</option>
          <option disabled value="java">Java (Coming Soon)</option>
        </select>
      </div>
    </header>
  );
}

export default Header;