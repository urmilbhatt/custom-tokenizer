import React from 'react';

function Header() {
  return (
    <header className="bg-white/80 backdrop-blur-sm shadow-lg border-b border-gray-200">
      <div className="container mx-auto px-4 py-6">
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
            Custom Tokenizer
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Interactive text tokenization with real-time encoding/decoding. 
            Hover over text or tokens to see the corresponding highlights.
          </p>
        </div>
      </div>
    </header>
  );
}

export default Header;
