import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install axios: npm install axios

const DeepSeekForm = () => {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [apiKey, setApiKey] = useState(''); // Store your API key here or in environment variables

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    setIsLoading(true);
    setError(null);

    try {
      // Replace with the actual API endpoint from the GitHub code you downloaded
      const apiUrl = 'https://api.deepseek.com/v1/chat/completions'; // Example endpoint
      
      const result = await axios.post(apiUrl, {
        model: "deepseek-chat", // Replace with the correct model name
        messages: [
          {
            role: "user",
            content: input
          }
        ],
        temperature: 0.7
      }, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        }
      });

      // Adjust this based on the actual API response structure
      setResponse(result.data.choices[0].message.content);
    } catch (err) {
      setError(err.response?.data?.error?.message || 'Failed to fetch response');
      console.error('API Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="deepseek-container">
      <h1>DeepSeek AI Chat</h1>
      <p>Enter your prompt below to interact with the DeepSeek AI model</p>
      
      <form onSubmit={handleSubmit} className="deepseek-form">
        <div className="form-group">
          <label htmlFor="apiKey">API Key:</label>
          <input
            type="password"
            id="apiKey"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
            placeholder="Enter your API key"
            className="form-control"
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="userInput">Your Message:</label>
          <textarea
            id="userInput"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message here..."
            className="form-control"
            rows="5"
          />
        </div>
        
        <button 
          type="submit" 
          className="submit-btn"
          disabled={isLoading || !input.trim() || !apiKey.trim()}
        >
          {isLoading ? 'Sending...' : 'Send'}
        </button>
      </form>

      {error && (
        <div className="error-message">
          <p>Error: {error}</p>
        </div>
      )}

      {response && (
        <div className="response-container">
          <h2>AI Response:</h2>
          <div className="response-content">
            {response}
          </div>
        </div>
      )}

      <style jsx>{`
        .deepseek-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
          font-family: Arial, sans-serif;
        }
        
        .deepseek-form {
          background: #f5f5f5;
          padding: 20px;
          border-radius: 8px;
          margin-bottom: 20px;
        }
        
        .form-group {
          margin-bottom: 15px;
        }
        
        label {
          display: block;
          margin-bottom: 5px;
          font-weight: bold;
        }
        
        .form-control {
          width: 100%;
          padding: 10px;
          border: 1px solid #ddd;
          border-radius: 4px;
          font-size: 16px;
        }
        
        textarea.form-control {
          min-height: 100px;
          resize: vertical;
        }
        
        .submit-btn {
          background-color: #4CAF50;
          color: white;
          padding: 10px 20px;
          border: none;
          border-radius: 4px;
          cursor: pointer;
          font-size: 16px;
        }
        
        .submit-btn:hover {
          background-color: #45a049;
        }
        
        .submit-btn:disabled {
          background-color: #cccccc;
          cursor: not-allowed;
        }
        
        .error-message {
          color: #d32f2f;
          background-color: #fde0e0;
          padding: 10px;
          border-radius: 4px;
          margin-bottom: 20px;
        }
        
        .response-container {
          background: #e8f5e9;
          padding: 20px;
          border-radius: 8px;
        }
        
        .response-content {
          white-space: pre-wrap;
          line-height: 1.6;
        }
      `}</style>
    </div>
  );
};

export default DeepSeekForm;