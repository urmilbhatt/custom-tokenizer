import React from 'react';

function Footer() {
  return (
    <footer className="bg-white/80 backdrop-blur-sm border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center text-gray-600">
          <p className="mb-2">
            Custom Tokenizer - Built with React, Tailwind CSS, and js-tiktoken
          </p>
          <p className="text-sm">
            Interactive text tokenization with real-time encoding/decoding capabilities
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
