import React, { useState } from 'react';

function VocabularyDisplay({ tokenizer }) {
  const [showVocabulary, setShowVocabulary] = useState(false);

  if (!tokenizer) return null;

  const vocabSize = tokenizer.getVocabSize();
  const vocabulary = tokenizer.getVocabulary();
  const specialTokens = tokenizer.specialTokens;

  const sortedVocab = Object.entries(vocabulary).sort((a, b) => parseInt(a[0]) - parseInt(b[0]));

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Vocabulary ({vocabSize} tokens)
        </h3>
        <button
          onClick={() => setShowVocabulary(!showVocabulary)}
          className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm"
        >
          {showVocabulary ? 'Hide' : 'Show'} Vocabulary
        </button>
      </div>

      {showVocabulary && (
        <div className="space-y-4">
          {/* Special Tokens */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Special Tokens:</h4>
            <div className="flex flex-wrap gap-2">
              {Array.from(specialTokens.entries()).map(([token, id]) => (
                <div key={id} className="bg-pastel-purple px-2 py-1 rounded text-xs">
                  <span className="font-semibold">{id}:</span> {token}
                </div>
              ))}
            </div>
          </div>

          {/* Regular Vocabulary */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-2">Learned Tokens:</h4>
            <div className="bg-gray-50 rounded-md p-3 max-h-48 overflow-y-auto">
              <div className="grid grid-cols-2 gap-2 text-xs">
                {sortedVocab.map(([id, token]) => {
                  const isSpecial = specialTokens.has(token);
                  return (
                    <div
                      key={id}
                      className={`px-2 py-1 rounded ${
                        isSpecial ? 'bg-pastel-purple' : 'bg-pastel-blue'
                      }`}
                    >
                      <span className="font-semibold">{id}:</span> {token}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Export/Import Options */}
          <div className="flex gap-2">
            <button
              onClick={() => {
                const vocabData = tokenizer.saveVocabulary();
                const blob = new Blob([JSON.stringify(vocabData, null, 2)], {
                  type: 'application/json'
                });
                const url = URL.createObjectURL(blob);
                const a = document.createElement('a');
                a.href = url;
                a.download = 'custom-tokenizer-vocabulary.json';
                a.click();
                URL.revokeObjectURL(url);
              }}
              className="px-3 py-1 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
            >
              Export Vocabulary
            </button>
            <input
              type="file"
              accept=".json"
              onChange={(e) => {
                const file = e.target.files[0];
                if (file) {
                  const reader = new FileReader();
                  reader.onload = (event) => {
                    try {
                      const vocabData = JSON.parse(event.target.result);
                      tokenizer.loadVocabulary(vocabData);
                      // Force re-render
                      window.location.reload();
                    } catch (error) {
                      console.error('Failed to load vocabulary:', error);
                      alert('Failed to load vocabulary file');
                    }
                  };
                  reader.readAsText(file);
                }
              }}
              className="hidden"
              id="vocab-import"
            />
            <label
              htmlFor="vocab-import"
              className="px-3 py-1 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors text-sm cursor-pointer"
            >
              Import Vocabulary
            </label>
          </div>
        </div>
      )}
    </div>
  );
}

export default VocabularyDisplay;
