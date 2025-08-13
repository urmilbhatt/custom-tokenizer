class CustomTokenizer {
  constructor() {
    this.vocab = new Map();
    this.reverseVocab = new Map();
    this.nextTokenId = 0;
    this.specialTokens = new Map();
    this.minFrequency = 1; // Lower threshold for better coverage
    this.maxTokenLength = 20; // Increased for better word handling
  }

  // Add special tokens
  addSpecialToken(token, id = null) {
    const tokenId = id !== null ? id : this.nextTokenId++;
    this.specialTokens.set(token, tokenId);
    this.vocab.set(tokenId, token);
    this.reverseVocab.set(token, tokenId);
    return tokenId;
  }

  // Initialize with common special tokens
  initializeSpecialTokens() {
    this.addSpecialToken('<PAD>', 0);
    this.addSpecialToken('<UNK>', 1);
    this.addSpecialToken('<START>', 2);
    this.addSpecialToken('<END>', 3);
    this.addSpecialToken('<SEP>', 4);
  }

  // Learn vocabulary from text
  learnFromText(text) {
    if (!text || typeof text !== 'string') return;

    // Split text into words and subwords
    const words = this.tokenizeText(text);
    const wordFreq = new Map();

    // Count word frequencies
    for (const word of words) {
      wordFreq.set(word, (wordFreq.get(word) || 0) + 1);
    }

    // Add words to vocabulary if they meet frequency threshold
    for (const [word, freq] of wordFreq) {
      if (freq >= this.minFrequency && !this.reverseVocab.has(word)) {
        const tokenId = this.nextTokenId++;
        this.vocab.set(tokenId, word);
        this.reverseVocab.set(word, tokenId);
      }
    }

    // Learn subword patterns
    this.learnSubwords(text);
  }

  // Tokenize text into words and subwords
  tokenizeText(text) {
    // Split by whitespace and punctuation, but preserve the original text structure
    const tokens = text
      .split(/(\s+|[^\w\s])/g)
      .filter(token => token.length > 0);

    const result = new Set();
    
    for (const token of tokens) {
      // Add the original token as-is
      result.add(token);
      
      // Add subwords for longer tokens
      if (token.length > 1 && /^\w+$/.test(token)) {
        for (let i = 1; i <= Math.min(token.length, this.maxTokenLength); i++) {
          result.add(token.substring(0, i));
        }
      }
    }

    return Array.from(result);
  }

  // Learn subword patterns using Byte Pair Encoding (BPE) inspired approach
  learnSubwords(text) {
    const words = text.toLowerCase().split(/\s+/);
    const bigrams = new Map();

    // Count bigram frequencies
    for (const word of words) {
      if (word.length < 2) continue;
      
      for (let i = 0; i < word.length - 1; i++) {
        const bigram = word.substring(i, i + 2);
        bigrams.set(bigram, (bigrams.get(bigram) || 0) + 1);
      }
    }

    // Add frequent bigrams to vocabulary
    for (const [bigram, freq] of bigrams) {
      if (freq >= this.minFrequency && !this.reverseVocab.has(bigram)) {
        const tokenId = this.nextTokenId++;
        this.vocab.set(tokenId, bigram);
        this.reverseVocab.set(bigram, tokenId);
      }
    }
  }

  // Encode text to token IDs - Improved version
  encode(text) {
    if (!text || typeof text !== 'string') return [];

    // First, learn from this text
    this.learnFromText(text);
    
    // Split text into tokens while preserving structure
    const tokens = text.split(/(\s+|[^\w\s])/g).filter(token => token.length > 0);
    const encoded = [];

    for (const token of tokens) {
      if (this.reverseVocab.has(token)) {
        encoded.push(this.reverseVocab.get(token));
      } else {
        // For unknown tokens, try to break them down
        const subTokens = this.encodeUnknownToken(token);
        encoded.push(...subTokens);
      }
    }

    return encoded;
  }

  // Handle unknown tokens by breaking them down
  encodeUnknownToken(token) {
    if (token.length === 0) return [];
    
    // If it's whitespace or punctuation, add it to vocab and encode
    if (/^\s+$/.test(token) || /^[^\w\s]$/.test(token)) {
      if (!this.reverseVocab.has(token)) {
        const tokenId = this.nextTokenId++;
        this.vocab.set(tokenId, token);
        this.reverseVocab.set(token, tokenId);
      }
      return [this.reverseVocab.get(token)];
    }

    // For words, try to break them down into known subwords
    const subTokens = [];
    let remaining = token;
    
    while (remaining.length > 0) {
      let found = false;
      
      // Try to find the longest matching subword
      for (let len = Math.min(remaining.length, this.maxTokenLength); len > 0; len--) {
        const subword = remaining.substring(0, len);
        if (this.reverseVocab.has(subword)) {
          subTokens.push(this.reverseVocab.get(subword));
          remaining = remaining.substring(len);
          found = true;
          break;
        }
      }
      
      // If no subword found, add the remaining as a new token
      if (!found) {
        const tokenId = this.nextTokenId++;
        this.vocab.set(tokenId, remaining);
        this.reverseVocab.set(remaining, tokenId);
        subTokens.push(tokenId);
        break;
      }
    }
    
    return subTokens;
  }

  // Decode token IDs back to text - Fixed version
  decode(tokenIds) {
    if (!Array.isArray(tokenIds)) return '';

    return tokenIds
      .map(id => this.vocab.get(id) || '<UNK>')
      .join(''); // Join without spaces to preserve original text structure
  }

  // Get vocabulary size
  getVocabSize() {
    return this.vocab.size;
  }

  // Get vocabulary as object
  getVocabulary() {
    const vocab = {};
    for (const [id, token] of this.vocab) {
      vocab[id] = token;
    }
    return vocab;
  }

  // Save vocabulary to JSON
  saveVocabulary() {
    return {
      vocab: this.getVocabulary(),
      specialTokens: Object.fromEntries(this.specialTokens),
      nextTokenId: this.nextTokenId
    };
  }

  // Load vocabulary from JSON
  loadVocabulary(data) {
    if (data.vocab) {
      this.vocab = new Map(Object.entries(data.vocab));
      this.reverseVocab = new Map();
      for (const [id, token] of this.vocab) {
        this.reverseVocab.set(token, parseInt(id));
      }
    }
    
    if (data.specialTokens) {
      this.specialTokens = new Map(Object.entries(data.specialTokens));
    }
    
    if (data.nextTokenId) {
      this.nextTokenId = data.nextTokenId;
    }
  }

  // Train on a corpus of text
  train(corpus) {
    if (Array.isArray(corpus)) {
      for (const text of corpus) {
        this.learnFromText(text);
      }
    } else if (typeof corpus === 'string') {
      this.learnFromText(corpus);
    }
  }

  // Get token details for a given text
  getTokenDetails(text) {
    const encoded = this.encode(text);
    return encoded.map((tokenId, index) => {
      const tokenText = this.vocab.get(tokenId) || '<UNK>';
      return {
        id: tokenId,
        text: tokenText,
        index: index
      };
    });
  }

  // Initialize with basic ASCII characters for better coverage
  initializeBasicVocab() {
    // Add basic ASCII characters
    for (let i = 32; i <= 126; i++) {
      const char = String.fromCharCode(i);
      if (!this.reverseVocab.has(char)) {
        const tokenId = this.nextTokenId++;
        this.vocab.set(tokenId, char);
        this.reverseVocab.set(char, tokenId);
      }
    }
  }
}

export default CustomTokenizer;
