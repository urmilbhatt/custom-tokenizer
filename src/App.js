import React, { useState, useEffect } from 'react';
import { Tiktoken } from "js-tiktoken/lite";
import o200k_base from "js-tiktoken/ranks/o200k_base";
import Tokenizer from './components/Tokenizer';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [encoder, setEncoder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the tokenizer
    const initTokenizer = async () => {
      try {
        // Using cl100k_base encoding which is commonly used
        const enc = new Tiktoken(o200k_base);
        setEncoder(enc);
      } catch (error) {
        console.error('Failed to initialize tokenizer:', error);
      } finally {
        setIsLoading(false);
      }
    };

    initTokenizer();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-pastel-blue to-pastel-purple flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-700">Initializing Tokenizer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-green to-pastel-purple">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tokenizer encoder={encoder} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
