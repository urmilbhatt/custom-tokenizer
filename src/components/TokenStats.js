import React from 'react';

function TokenStats({ tokens }) {
  const getStats = () => {
    if (tokens.length === 0) {
      return {
        totalTokens: 0,
        uniqueTokens: 0,
        avgTokenLength: 0,
        shortestToken: null,
        longestToken: null
      };
    }

    const uniqueTokens = new Set(tokens.map(t => t.text));
    const totalLength = tokens.reduce((sum, t) => sum + t.text.length, 0);
    const avgTokenLength = totalLength / tokens.length;
    
    const shortestToken = tokens.reduce((shortest, current) => 
      current.text.length < shortest.text.length ? current : shortest
    );
    
    const longestToken = tokens.reduce((longest, current) => 
      current.text.length > longest.text.length ? current : longest
    );

    return {
      totalTokens: tokens.length,
      uniqueTokens: uniqueTokens.size,
      avgTokenLength: avgTokenLength.toFixed(1),
      shortestToken,
      longestToken
    };
  };

  const stats = getStats();

  if (tokens.length === 0) {
    return (
      <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-800 mb-3">
          Token Statistics
        </h3>
        <div className="bg-gray-50 rounded-md p-8 text-center">
          <p className="text-gray-500 text-lg">
            No tokens to analyze yet...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Token Statistics
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {/* Basic Stats */}
        <div className="space-y-3">
          <div className="bg-pastel-blue p-3 rounded-lg">
            <div className="text-2xl font-bold text-blue-800">{stats.totalTokens}</div>
            <div className="text-sm text-blue-600">Total Tokens</div>
          </div>
          
          <div className="bg-pastel-green p-3 rounded-lg">
            <div className="text-2xl font-bold text-green-800">{stats.uniqueTokens}</div>
            <div className="text-sm text-green-600">Unique Tokens</div>
          </div>
          
          <div className="bg-pastel-purple p-3 rounded-lg">
            <div className="text-2xl font-bold text-purple-800">{stats.avgTokenLength}</div>
            <div className="text-sm text-purple-600">Avg Length</div>
          </div>
        </div>

        {/* Token Details */}
        <div className="space-y-3">
          <div className="bg-pastel-yellow p-3 rounded-lg">
            <div className="text-sm font-semibold text-yellow-800 mb-1">Shortest Token</div>
            <div className="text-xs text-yellow-700 font-mono">
              "{stats.shortestToken?.text}" ({stats.shortestToken?.text.length} chars)
            </div>
          </div>
          
          <div className="bg-pastel-orange p-3 rounded-lg">
            <div className="text-sm font-semibold text-orange-800 mb-1">Longest Token</div>
            <div className="text-xs text-orange-700 font-mono">
              "{stats.longestToken?.text}" ({stats.longestToken?.text.length} chars)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TokenStats;
