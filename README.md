# Custom Tokenizer

An interactive web application that demonstrates text tokenization using a **custom-built tokenizer**. Built with React and Tailwind CSS, this application provides real-time encoding/decoding of text with interactive highlighting features and learns vocabulary from the text it processes.

## 🎥 Demo Video

![Image](/assets/custom-tokenizer-demo-image.png)

## Features

- **Real-time Tokenization**: Input text is automatically tokenized as you type
- **Interactive Highlighting**: Hover over text or tokens to see corresponding highlights
- **Token ID Display**: View token IDs in colorful boxes for easy identification
- **Actual Text Display**: See the actual text below the token IDs
- **Essential Statistics**: Key token metrics without clutter
- **Beautiful UI**: Modern, responsive design with pastel color schemes
- **Custom Tokenizer**: Built from scratch without external dependencies
- **Vocabulary Learning**: Automatically learns and builds vocabulary from input text
- **Export/Import**: Save and load learned vocabulary
- **Token Visualization**: Color-coded tokens with hover effects

## Technologies Used

- **React 18** - Modern React with hooks
- **Tailwind CSS** - Utility-first CSS framework
- **Custom Tokenizer** - Built from scratch using JavaScript
- **PostCSS** - CSS processing
- **Autoprefixer** - CSS vendor prefixing

## How the Custom Tokenizer Works

### **Vocabulary Learning**

- **Special Tokens**: Built-in tokens like `<PAD>`, `<UNK>`, `<START>`, `<END>`, `<SEP>`
- **Word Learning**: Automatically learns new words from input text
- **Subword Patterns**: Identifies common character patterns and bigrams
- **Frequency Threshold**: Only includes tokens that appear frequently enough

### **Tokenization Process**

1. **Text Preprocessing**: Converts to lowercase, handles punctuation
2. **Word Splitting**: Breaks text into words and subwords
3. **Pattern Recognition**: Identifies common character combinations
4. **Vocabulary Building**: Adds new tokens to the growing vocabulary
5. **Encoding**: Converts text to token IDs
6. **Decoding**: Converts token IDs back to text

### **Features**

- **Adaptive Learning**: Improves vocabulary as more text is processed
- **Subword Support**: Handles both complete words and partial patterns
- **Configurable Parameters**: Adjustable frequency thresholds and token lengths
- **Persistent Storage**: Export/import vocabulary for reuse

## Installation

1. **Clone the repository**:

   ```bash
   git clone <repository-url>
   cd custom-tokenizer
   ```

2. **Install dependencies**:

   ```bash
   npm install
   ```

3. **Start the development server**:

   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## Usage

### Basic Tokenization

1. Type or paste text in the left input panel
2. Watch as the text is automatically tokenized in real-time
3. View tokenized output on the right side

### Interactive Features

- **Hover over text**: See which tokens correspond to specific text segments
- **Hover over tokens**: See the corresponding text highlighted in the input
- **Token details**: View token ID, length, and position information
- **Word highlighting**: Hovered words are highlighted in a yellow box below the input

### Token Display

- **Token IDs**: Large, bold numbers in colored boxes for easy identification
- **Actual Text**: Clean, readable text display below the tokens
- **Statistics**: Essential metrics including total tokens, unique tokens, and length information
- **Vocabulary**: View and manage the learned vocabulary

## Project Structure

```
src/
├── components/
│   ├── App.js              # Main application component
│   ├── Header.js           # Application header
│   ├── Tokenizer.js        # Main tokenizer logic
│   ├── TextInput.js        # Text input with highlighting
│   ├── TokenOutput.js      # Token visualization
│   ├── TokenStats.js       # Essential statistics display
│   ├── VocabularyDisplay.js # Vocabulary management
│   └── Footer.js           # Application footer
├── utils/
│   └── CustomTokenizer.js  # Custom tokenizer implementation
├── index.js                # React entry point
└── index.css               # Global styles and Tailwind imports
```

## Building for Production

To create a production build:

```bash
npm run build
```

This will create an optimized build in the `build/` directory.

## Dependencies

- **react**: ^18.2.0
- **react-dom**: ^18.2.0
- **react-scripts**: 5.0.1
- **tailwindcss**: ^3.3.0
- **autoprefixer**: ^10.4.14
- **postcss**: ^8.4.24

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request
