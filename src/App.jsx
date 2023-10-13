import React, { useState } from "react";
import profile1 from './Asset/Ica.png';
import profile2 from './Asset/Leha.png';
import profile3 from './Asset/Azka.png';
import "./App.css";
import CryptoJS from "crypto-js";


function App() {
  // Define and initialize state variables
  const [text, setText] = useState(""); // User input text
  const [secretPass, setSecretPass] = useState("");
  const [mode, setMode] = useState("ECB"); // Default mode: Electronic Codebook (ECB)
  const [screen, setScreen] = useState("encrypt"); // Screen mode: encrypt or decrypt
  const [encryptedData, setEncryptedData] = useState(""); // Encrypted data
  const [decryptedData, setDecryptedData] = useState(""); // Decrypted data
  const [errorMessage, setErrorMessage] = useState(""); // Error message if any

  // Encrypt user input text
  const encryptData = () => {
    if (!secretPass) {
      setErrorMessage("Please enter a secret key.");
      return;
    }

    try {
      let data = "";
      if (mode === "ECB") {
        data = CryptoJS.DES.encrypt(JSON.stringify(text), secretPass).toString();
      } else if (mode === "CBC") {
        data = CryptoJS.DES.encrypt(JSON.stringify(text), secretPass, { mode: CryptoJS.mode.CBC }).toString();
      }
      setEncryptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Encryption failed. Please check your input.");
    }
  };

  // Decrypt user input text
  const decryptData = () => {
    if (!secretPass) {
      setErrorMessage("Please enter a secret key.");
      return;
    }

    try {
      let bytes = null;
      if (mode === "ECB") {
        bytes = CryptoJS.DES.decrypt(text, secretPass);
      } else if (mode === "CBC") {
        bytes = CryptoJS.DES.decrypt(text, secretPass, { mode: CryptoJS.mode.CBC });
      }

      const data = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      setDecryptedData(data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage("Decryption failed. Please check your input.");
    }
  };

  // Switch between encrypt and decrypt screens
  const switchScreen = (type) => {
    // Clear all data and error message when switching screens
    setText("");
    setEncryptedData("");
    setDecryptedData("");
    setErrorMessage("");
    setSecretPass("");
    setScreen(type);
  };

  // Handle button click (Encrypt or Decrypt)
  const handleClick = () => {
    if (!text) {
      setErrorMessage("Please enter some text.");
      return;
    }

    if (screen === "encrypt") {
      encryptData();
    } else {
      decryptData();
    }
  };

  return (
    <div>
      <header>
        
      </header>
      <div className="jumbotron">
        <h1>DES Encryption & Decryption Apps</h1>
      </div>

      <div className="container">
        <div>
          {/* Buttons to switch between Encrypt and Decrypt screens */}
          <button
            className={`btn btn-left ${screen === "encrypt" ? "active" : ""}`}
            onClick={() => switchScreen("encrypt")}
          >
            Encrypt
          </button>
          <button
            className={`btn btn-right ${screen === "decrypt" ? "active" : ""}`}
            onClick={() => switchScreen("decrypt")}
          >
            Decrypt
          </button>
        </div>

        <div className="card">
          {/* Textarea for user input */}
          <label>{screen === "encrypt" ? "Plain Text" : "Encrypted Text"}</label>
          <textarea
            value={text}
            onChange={({ target }) => setText(target.value)}
            name="text"
            type="text"
            placeholder={
              screen === "encrypt" ? "Enter Plain Text" : "Enter Encrypted Text"
            }
          />
          <label>Secret Key</label>
          <input
            type="text"
            value={secretPass}
            onChange={({ target }) => setSecretPass(target.value)}
            placeholder="Enter Secret Key"
          />

          {/* Mode selection for ECB and CBC */}
          <div className="mode-selection">
            <span>Mode:</span>
            <label>
              <input
                type="radio"
                value="ECB"
                checked={mode === "ECB"}
                onChange={() => setMode("ECB")}
              />
              ECB
            </label>
            <label>
              <input
                type="radio"
                value="CBC"
                checked={mode === "CBC"}
                onChange={() => setMode("CBC")}
              />
              CBC
            </label>
          </div>

          {/* Display error message if there's an error */}
          {errorMessage && <div className="error">{errorMessage}</div>}

          {/* Encrypt or Decrypt button */}
          <button
            className={`btn submit-btn ${
              screen === "encrypt" ? "encrypt-btn" : "decrypt-btn"
            }`}
            onClick={handleClick}
          >
            {screen === "encrypt" ? "Encrypt" : "Decrypt"}
          </button>
        </div>

        {/* Display encrypted or decrypted data if available */}
        {encryptedData || decryptedData ? (
          <div className="content">
            <label>
              {screen === "encrypt" ? "ENCRYPTED" : "Decrypted"} DATA
            </label>
            <p>{screen === "encrypt" ? encryptedData : decryptedData}</p>
          </div>
        ) : null}
      </div>
      
      <footer>
      <h2>OUR TEAM</h2>
  <div className="developer-info">
    <div className="developer">
      <img src={profile1} alt="Developer 1" width="100" height="100" />
      <div className="developer-details">
        <p>Annisa Dwi Irvianda</p>
        <p>1120093000009</p>
      </div>
    </div>
    <div className="developer">
      <img src={profile2} alt="Developer 2" width="150" height="150" />
      <div className="developer-details">
        <p>Mar'atus Sholihah</p>
        <p>11200930000011</p>
      </div>
    </div>
    <div className="developer">
      <img src={profile3} alt="Developer 3" width="150" height="150" />
      <div className="developer-details">
        <p>Azka Septia Rahman</p>
        <p>11200930000013</p>
      </div>
    </div>
  </div>
  <p id="footer">IT Security & Risk Management 7A - Group 5</p>
</footer>

  </div>
  );
}

export default App;
