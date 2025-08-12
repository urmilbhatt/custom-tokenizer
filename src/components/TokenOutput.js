import React from 'react';

function TokenOutput({ tokens, onTokenHover, hoveredIndex }) {
  const getPastelColor = (index) => {
    const colors = [
      'bg-pastel-blue',
      'bg-pastel-green',
      'bg-pastel-purple',
      'bg-pastel-pink',
      'bg-pastel-yellow',
      'bg-pastel-orange',
      'bg-pastel-red',
      'bg-pastel-indigo'
    ];
    return colors[index % colors.length];
  };

  const handleTokenHover = (index) => {
    onTokenHover(index);
  };

  const handleTokenLeave = () => {
    onTokenHover(null);
  };

  if (tokens.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Tokenized Output
        </h3>
        <div className="bg-gray-50 rounded-md p-8 text-center">
          <p className="text-gray-500 text-lg">
            Enter text in the input field to see tokens here...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200 token-output-container">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Tokenized Output ({tokens.length} tokens)
      </h3>
      
      {/* Token IDs Display */}
      <div className="bg-gray-50 rounded-md p-4 max-h-48 overflow-y-auto mb-4">
        <div className="flex flex-wrap gap-2">
          {tokens.map((token, index) => (
            <div
              key={`${token.id}-${index}`}
              className={`
                ${getPastelColor(index)} 
                ${hoveredIndex === index ? 'ring-2 ring-blue-500 scale-105' : ''}
                px-3 py-2 rounded-lg border border-gray-200 cursor-pointer transition-all duration-200 token-highlight
                hover:shadow-md hover:scale-105
              `}
              onMouseEnter={() => handleTokenHover(index)}
              onMouseLeave={handleTokenLeave}
              title={`Token ${index + 1}: "${token.text}" (ID: ${token.id})`}
            >
              <div className="text-sm font-mono text-gray-800 font-bold">
                {token.id}
              </div>
              <div className="text-xs text-gray-600 mt-1">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Actual Text Display */}
      <div className="bg-gray-50 rounded-md p-4 mb-4">
        <h4 className="text-sm font-semibold text-gray-700 mb-2">Actual Text:</h4>
        <div className="text-sm text-gray-800 font-mono bg-white p-3 rounded border">
          {tokens.map((token, index) => (
            <span
              key={`text-${index}`}
              className={`
                ${hoveredIndex === index ? 'bg-pastel-yellow px-1 rounded' : ''}
                transition-all duration-200
              `}
              onMouseEnter={() => handleTokenHover(index)}
              onMouseLeave={handleTokenLeave}
            >
              {token.text}
            </span>
          ))}
        </div>
      </div>
      
      {/* Fixed Position Token Details - Always present to prevent layout shifts */}
      <div className={`transition-all duration-200 ${hoveredIndex !== null ? 'opacity-100' : 'opacity-0'}`}>
        {hoveredIndex !== null && tokens[hoveredIndex] ? (
          <div className="p-3 bg-blue-50 rounded-md border border-blue-200">
            <div className="text-sm text-blue-800">
              <strong>Token {hoveredIndex + 1}:</strong> "{tokens[hoveredIndex].text}"
            </div>
            <div className="text-xs text-blue-600 mt-1">
              ID: {tokens[hoveredIndex].id} | Length: {tokens[hoveredIndex].text.length}
            </div>
          </div>
        ) : (
          <div className="p-3 bg-gray-50 rounded-md border border-gray-200 min-h-[60px] flex items-center justify-center">
            <span className="text-gray-400 text-sm">Hover over a token to see details</span>
          </div>
        )}
      </div>
    </div>
  );
}

export default TokenOutput;
