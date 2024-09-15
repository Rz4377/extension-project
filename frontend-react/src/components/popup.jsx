// src/components/Popup.jsx
import React, { useState, useEffect } from 'react';

function Popup() {
  const [keywords, setKeywords] = useState([]);
  const [newKeyword, setNewKeyword] = useState('');

  useEffect(() => {
    chrome.storage.sync.get(['blockedKeywords'], function(data) {
      setKeywords(data.blockedKeywords || []);
    });
  }, []);

  const addKeyword = () => {
    if (newKeyword.trim() !== '') {
      const updatedKeywords = [...keywords, newKeyword];
      setKeywords(updatedKeywords);
      chrome.storage.sync.set({ blockedKeywords: updatedKeywords });
      setNewKeyword('');
    }
  };

  const removeKeyword = (index) => {
    const updatedKeywords = keywords.filter((_, i) => i !== index);
    setKeywords(updatedKeywords);
    chrome.storage.sync.set({ blockedKeywords: updatedKeywords });
  };

  return (
    <div>
      <h1>Blocked Keywords</h1>
      <ul>
        {keywords.map((keyword, index) => (
          <li key={index}>
            {keyword}
            <button onClick={() => removeKeyword(index)}>Remove</button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={newKeyword}
        onChange={(e) => setNewKeyword(e.target.value)}
      />
      <button onClick={addKeyword}>Add</button>
    </div>
  );
}

export default Popup;
