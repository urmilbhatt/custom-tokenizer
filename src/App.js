import React, { useState, useEffect } from 'react';
import CustomTokenizer from './utils/CustomTokenizer';
import Tokenizer from './components/Tokenizer';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  const [tokenizer, setTokenizer] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initialize the custom tokenizer
    const initTokenizer = async () => {
      try {
        const customTokenizer = new CustomTokenizer();
        
        // Initialize special tokens
        customTokenizer.initializeSpecialTokens();
        
        // Initialize basic ASCII vocabulary for better coverage
        customTokenizer.initializeBasicVocab();
        
        // Train on some sample text to build initial vocabulary
        const sampleTexts = [
          "Hello world! This is a sample text for the custom tokenizer.",
          "The quick brown fox jumps over the lazy dog.",
          "Machine learning and natural language processing are fascinating fields.",
          "Tokenization is the process of breaking text into smaller units called tokens.",
          "Our custom tokenizer learns vocabulary from the text it processes."
        ];
        
        customTokenizer.train(sampleTexts);
        
        setTokenizer(customTokenizer);
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
          <p className="text-lg text-gray-700">Initializing Custom Tokenizer...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pastel-blue via-pastel-green to-pastel-purple">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <Tokenizer tokenizer={tokenizer} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
