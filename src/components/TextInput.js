import React, { useState, useRef, useEffect } from 'react';

function TextInput({ value, onChange, onTextHover, hoveredRange }) {
  const [isHovering, setIsHovering] = useState(false);
  const [hoveredText, setHoveredText] = useState('');
  const textRef = useRef(null);
  const [internalValue, setInternalValue] = useState(value);
  const [isFocused, setIsFocused] = useState(false);

  // Sync internal value with prop
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  const handleInput = (e) => {
    const newValue = e.currentTarget.textContent || '';
    setInternalValue(newValue);
    onChange(newValue);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleMouseMove = (e) => {
    if (!textRef.current || !internalValue) return;
    setIsHovering(true);

    const el = textRef.current;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Get the element under the mouse
    const elementBelow = document.elementFromPoint(e.clientX, e.clientY);
    if (!elementBelow || !el.contains(elementBelow)) {
      setHoveredText('');
      onTextHover(null, null);
      return;
    }

    // Find the text node and character position
    try {
      // Create a temporary selection to find the character position
      const tempRange = document.createRange();
      tempRange.selectNodeContents(el);
      
      let charIndex = 0;
      let found = false;
      
      // Walk through the text nodes to find the character position
      const walker = document.createTreeWalker(
        el,
        NodeFilter.SHOW_TEXT,
        null,
        false
      );
      
      let textNode;
      while ((textNode = walker.nextNode())) {
        const nodeLength = textNode.length;
        const nodeRect = textNode.getBoundingClientRect();
        
        if (y >= nodeRect.top && y <= nodeRect.bottom) {
          // We're in the right text node, now find the character
          for (let i = 0; i < nodeLength; i++) {
            tempRange.setStart(textNode, i);
            tempRange.setEnd(textNode, i + 1);
            const charRect = tempRange.getBoundingClientRect();
            
            if (x >= charRect.left && x <= charRect.right) {
              charIndex = i;
              found = true;
              break;
            }
          }
          break;
        }
        charIndex += nodeLength;
      }

      if (found && charIndex < internalValue.length) {
        // Find word boundaries
        let start = charIndex;
        let end = charIndex;
        
        // Find start of word
        while (start > 0 && /\S/.test(internalValue[start - 1])) {
          start--;
        }
        
        // Find end of word
        while (end < internalValue.length && /\S/.test(internalValue[end])) {
          end++;
        }
        
        if (start !== end) {
          const word = internalValue.substring(start, end);
          setHoveredText(word);
          onTextHover(start, end);
          return;
        }
      }
    } catch (error) {
      console.warn('Error in mouse move handler:', error);
    }

    // Clear hover if no word found
    setHoveredText('');
    onTextHover(null, null);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setHoveredText('');
    onTextHover(null, null);
  };

  // Show placeholder when no text and not focused
  const showPlaceholder = !internalValue && !isFocused;

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-800 mb-3">
        Input Text
      </h3>
      <div className="relative">
        <div
          ref={textRef}
          contentEditable
          onInput={handleInput}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          className="w-full h-48 p-4 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white resize-none overflow-auto contenteditable-input"
          style={{ 
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            outline: 'none'
          }}
        />
        
        {/* Placeholder */}
        {showPlaceholder && (
          <div className="absolute top-4 left-4 text-gray-400 pointer-events-none">
            Enter your text here to see it tokenized...
          </div>
        )}
        
        {/* Hover indicator */}
        {isHovering && hoveredText && (
          <div className="absolute -top-10 left-0 bg-gray-800 text-white px-2 py-1 rounded text-sm pointer-events-none z-10">
            Hovering: "{hoveredText}"
          </div>
        )}
      </div>
      
      {/* Word highlight indicator */}
      {hoveredText && (
        <div className="mt-3 p-3 bg-pastel-yellow rounded-lg border border-yellow-300">
          <div className="text-sm text-yellow-800">
            <strong>Hovered Word:</strong> "{hoveredText}"
          </div>
          <div className="text-xs text-yellow-600 mt-1">
            This word corresponds to the highlighted token in the output
          </div>
        </div>
      )}
      
      {/* Character count */}
      <div className="mt-3 text-sm text-gray-500 text-right">
        {internalValue.length} characters
      </div>
    </div>
  );
}

export default TextInput;
