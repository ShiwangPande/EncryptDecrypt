// src/EncryptDecrypt.jsx
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';

const EncryptDecrypt = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('AES');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setSavedMessages(storedMessages);
  }, []);

  const encryptMessage = () => {
    let encrypted = '';
    if (algorithm === 'AES') {
      encrypted = CryptoJS.AES.encrypt(message, key).toString();
    } else if (algorithm === 'SHA256') {
      encrypted = CryptoJS.SHA256(message).toString();
    } else if (algorithm === 'MD5') {
      encrypted = CryptoJS.MD5(message).toString();
    }

    setEncryptedMessage(encrypted);
    saveMessage(encrypted, algorithm);
    setMessage('');
    setKey('');
  };

  const decryptMessage = () => {
    if (algorithm === 'AES') {
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedMessage(decrypted);
    } else {
      setDecryptedMessage("Decryption is not applicable for SHA256 or MD5.");
    }
  };

  const saveMessage = (encryptedMessage, algo) => {
    const newMessage = { message: encryptedMessage, algorithm: algo };
    const updatedMessages = [...savedMessages, newMessage];
    setSavedMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  const deleteMessage = (index) => {
    const updatedMessages = savedMessages.filter((_, i) => i !== index);
    setSavedMessages(updatedMessages);
    localStorage.setItem('messages', JSON.stringify(updatedMessages));
  };

  return (
    <div className="container mx-auto mt-10 p-5 border rounded shadow-lg bg-white">
      <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Encrypt & Decrypt</h1>

      <div className='flex flex-row justify-between'> 
        {/* Encryption Section */}
        <div className="mb-8 flex-1 mr-4">
          <h2 className="text-xl font-semibold mb-2">Encryption</h2>
          <div className="flex items-center mb-2">
            <textarea
              className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows="4"
              placeholder="Enter your message to encrypt"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>
          <input
            type="text"
            className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your encryption key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <select
            className="border p-2 w-full mb-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={algorithm}
            onChange={(e) => setAlgorithm(e.target.value)}
          >
            <option value="AES">AES</option>
            <option value="SHA256">SHA256</option>
            <option value="MD5">MD5</option>
          </select>
          <button
            className="bg-blue-500 text-white p-2 rounded-md mr-2 w-full hover:bg-blue-600 transition duration-200"
            onClick={encryptMessage}
          >
            <svg className="inline w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9-4 9 4-9 4-9-4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7M7 7l3 3m0 0l3-3m-3 3v11" /></svg>
            Encrypt Message
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Encrypted Result:</h3>
            <p className="border p-2 bg-gray-50 rounded-md">{encryptedMessage || "No result yet"}</p>
          </div>
        </div>

        {/* Decryption Section */}
        <div className="flex-1 ml-4">
          <h2 className="text-xl font-semibold mb-2">Decryption</h2>
          <textarea
            className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            rows="4"
            placeholder="Enter your encrypted message to decrypt"
            value={encryptedMessage}
            onChange={(e) => setEncryptedMessage(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            placeholder="Enter your decryption key"
            value={key}
            onChange={(e) => setKey(e.target.value)}
          />
          <button
            className="bg-green-500 text-white p-2 rounded-md w-full hover:bg-green-600 transition duration-200"
            onClick={decryptMessage}
          >
            <svg className="inline w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7l9-4 9 4-9 4-9-4z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V7M7 7l3 3m0 0l3-3m-3 3v11" /></svg>
            Decrypt Message
          </button>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">Decrypted Result:</h3>
            <p className="border p-2 bg-gray-50 rounded-md">{decryptedMessage || "No result yet"}</p>
          </div>
        </div>
      </div>

      {/* Saved Messages Section */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">Saved Messages:</h2>
        {savedMessages.length > 0 ? (
          <ul className="list-disc pl-5">
            {savedMessages.map((msg, index) => (
              <li key={index} className="flex justify-between items-center mb-2">
                <span className="flex-1">{msg.message} (Algo: {msg.algorithm})</span>
                <button
                  className="text-red-500 ml-4 hover:underline"
                  onClick={() => deleteMessage(index)}
                >
                  <svg className="inline w-5 h-5 mr-1" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                  Delete
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600">No saved messages.</p>
        )}
      </div>
    </div>
  );
};

export default EncryptDecrypt;
