// src/EncryptDecrypt.jsx
import { useState, useEffect } from 'react';
import CryptoJS from 'crypto-js';
import { auth } from "../firebaseConfig"; 
import { onAuthStateChanged } from "firebase/auth";

const EncryptDecrypt = () => {
  const [message, setMessage] = useState('');
  const [key, setKey] = useState('');
  const [algorithm, setAlgorithm] = useState('AES');
  const [encryptedMessage, setEncryptedMessage] = useState('');
  const [decryptedMessage, setDecryptedMessage] = useState('');
  const [savedMessages, setSavedMessages] = useState([]);
  const [userDetails, setUserDetails] = useState(null);
  const [messageStatus, setMessageStatus] = useState('');

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUserDetails(user);
      if (user) {
        setMessageStatus("Logged in successfully!");
      } else {
        setMessageStatus("Please log in.");
      }
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const storedMessages = JSON.parse(localStorage.getItem('messages')) || [];
    setSavedMessages(storedMessages);
  }, []);

  const encryptMessage = () => {
    if (!message || !key && algorithm === 'AES') {
      setMessageStatus("Message and key are required for encryption.");
      return;
    }

    let encrypted = '';
    switch (algorithm) {
      case 'AES':
        encrypted = CryptoJS.AES.encrypt(message, key).toString();
        break;
      case 'SHA256':
        encrypted = CryptoJS.SHA256(message).toString();
        break;
      case 'MD5':
        encrypted = CryptoJS.MD5(message).toString();
        break;
      default:
        encrypted = '';
    }

    setEncryptedMessage(encrypted);
    saveMessage(encrypted, algorithm);
    setMessage('');
    setKey('');
  };

  const decryptMessage = () => {
    if (!encryptedMessage || !key) {
      setMessageStatus("Encrypted message and key are required for decryption.");
      return;
    }
    
    if (algorithm === 'AES') {
      const bytes = CryptoJS.AES.decrypt(encryptedMessage, key);
      const decrypted = bytes.toString(CryptoJS.enc.Utf8);
      setDecryptedMessage(decrypted || "Decryption failed. Check your key.");
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
    <div className="flex flex-col items-center justify-center   bg-gray-100 p-4">
    
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Digital Rights Management</h1>
      
      <div className="bg-white shadow-lg rounded-lg p-6 mb-4 w-full max-w-md  text-center">
        <h2 className="text-xl font-semibold mb-2">Welcome, {userDetails?.email}</h2>
      {messageStatus && <p className="mt-4 text-red-600">{messageStatus}</p>}
      </div>

      <div className="container mx-auto mt-10 p-5 border rounded shadow-lg bg-white w-full max-w-3xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">Encryption & Decryption</h1>
        <div className='flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 md:space-x-4'> 
          {/* Encryption Section */}
          <div className="mb-8 flex-1">
            <h2 className="text-xl font-semibold mb-2">Encryption</h2>
            <textarea
              className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows="4"
              placeholder="Enter your message to encrypt"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            {algorithm === 'AES' && (
              <input
                type="text"
                className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your encryption key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            )}
            <select
              className="border p-2 w-full mb-4 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              value={algorithm}
              onChange={(e) => setAlgorithm(e.target.value)}
            >
              <option value="AES">AES</option>
              <option value="SHA256">SHA256</option>
              <option value="MD5">MD5</option>
            </select>
            <button 
              className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-300 w-full"
              onClick={encryptMessage}
            >
              Encrypt
            </button>
            <h2 className="text-lg font-semibold mt-4">Encrypted Message:</h2>
            <p className="bg-gray-200 p-2 rounded">{encryptedMessage}</p>
          </div>

          {/* Decryption Section */}
          <div className="mb-8 flex-1">
            <h2 className="text-xl font-semibold mb-2">Decryption</h2>
            <textarea
              className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
              rows="4"
              placeholder="Enter your message to decrypt"
              value={encryptedMessage}
              onChange={(e) => setEncryptedMessage(e.target.value)}
            />
            {algorithm === 'AES' && (
              <input
                type="text"
                className="border p-2 w-full mb-2 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
                placeholder="Enter your decryption key"
                value={key}
                onChange={(e) => setKey(e.target.value)}
              />
            )}
            <button 
              className="bg-yellow-500 text-white py-2 px-4 rounded hover:bg-yellow-600 transition duration-300 w-full"
              onClick={decryptMessage}
            >
              Decrypt
            </button>
            <h2 className="text-lg font-semibold mt-4">Decrypted Message:</h2>
            <p className="bg-gray-200 p-2 rounded">{decryptedMessage}</p>
          </div>
        </div>

        {/* Saved Messages Section */}
        <div>
          <h2 className="text-xl font-semibold mb-2">Saved Messages</h2>
          <ul className="space-y-2">
            {savedMessages.map((msg, index) => (
              <li key={index} className="flex justify-between items-center bg-gray-100 p-2 rounded">
                <span>{msg.message} (Algo: {msg.algorithm})</span>
                <button
                  className="bg-red-500 text-white px-2 rounded hover:bg-red-600"
                  onClick={() => deleteMessage(index)}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EncryptDecrypt;