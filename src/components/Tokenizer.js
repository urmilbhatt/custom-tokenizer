import React, { useState, useEffect, useCallback } from 'react';
import TextInput from './TextInput';
import TokenOutput from './TokenOutput';
import TokenStats from './TokenStats';

function Tokenizer({ encoder }) {
  const [inputText, setInputText] = useState('');
  const [tokens, setTokens] = useState([]);
  const [decodedText, setDecodedText] = useState('');
  const [hoveredTokenIndex, setHoveredTokenIndex] = useState(null);
  const [hoveredTextRange, setHoveredTextRange] = useState(null);

  const encodeText = (text) => {
    if (!encoder || !text.trim()) {
      setTokens([]);
      return;
    }

    try {
      const encoded = encoder.encode(text);
      const tokenDetails = encoded.map((tokenId, index) => {
        const tokenText = encoder.decode([tokenId]);
        return {
          id: tokenId,
          text: tokenText,
          index: index
        };
      });
      setTokens(tokenDetails);
    } catch (error) {
      console.error('Encoding error:', error);
      setTokens([]);
    }
  };

  const decodeTokens = useCallback((tokenList) => {
    if (!encoder || tokenList.length === 0) {
      setDecodedText('');
      return;
    }

    try {
      const tokenIds = tokenList.map(token => token.id);
      const decoded = encoder.decode(tokenIds);
      setDecodedText(decoded);
    } catch (error) {
      console.error('Decoding error:', error);
      setDecodedText('');
    }
  }, [encoder]);

  const handleTextChange = (text) => {
    setInputText(text);
    encodeText(text);
  };

  const handleTokenHover = (tokenIndex) => {
    setHoveredTokenIndex(tokenIndex);
    
    // Calculate the text range for this token
    if (tokenIndex !== null && tokens[tokenIndex]) {
      let startPos = 0;
      for (let i = 0; i < tokenIndex; i++) {
        startPos += tokens[i].text.length;
      }
      const endPos = startPos + tokens[tokenIndex].text.length;
      setHoveredTextRange({ start: startPos, end: endPos });
    } else {
      setHoveredTextRange(null);
    }
  };

  const handleTextHover = (start, end) => {
    setHoveredTextRange({ start, end });
    
    // Find the corresponding token
    let currentPos = 0;
    let tokenIndex = null;
    
    for (let i = 0; i < tokens.length; i++) {
      const tokenEnd = currentPos + tokens[i].text.length;
      if (start >= currentPos && end <= tokenEnd) {
        tokenIndex = i;
        break;
      }
      currentPos = tokenEnd;
    }
    
    setHoveredTokenIndex(tokenIndex);
  };

  // Update decoded text when tokens change
  useEffect(() => {
    decodeTokens(tokens);
  }, [tokens, encoder, decodeTokens]);

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <TextInput
            value={inputText}
            onChange={handleTextChange}
            onTextHover={handleTextHover}
            hoveredRange={hoveredTextRange}
          />
          <TokenStats tokens={tokens} />
        </div>

        <div className="space-y-6">
          <TokenOutput
            tokens={tokens}
            onTokenHover={handleTokenHover}
            hoveredIndex={hoveredTokenIndex}
          />
          <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Decoded Text
            </h3>
            <div className="bg-gray-50 rounded-md p-4 min-h-[100px]">
              <p className="text-gray-700 whitespace-pre-wrap">
                {decodedText || 'Enter text above to see decoded output...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tokenizer;
