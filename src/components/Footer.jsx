function Footer() {
  return (
    <footer className="py-3 px-4 border-t border-gray-800 bg-gray-900 text-center text-sm text-gray-400">
      <p>
        Built with React & Node.js &bull; CodeRunner &copy; {new Date().getFullYear()}
      </p>
    </footer>
  );
}

export default Footer;