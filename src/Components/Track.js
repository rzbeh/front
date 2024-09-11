import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './style.css';

const TrackForm = () => {
  const [serial, setSerial] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [showAdditionalFields, setShowAdditionalFields] = useState(false);
  const [userInfo, setUserInfo] = useState({
    engineId: '',
    km: '',
    sellerNum: ''
  });
  const [presentKm, setPresentKm] = useState('');
  const [operationResult, setOperationResult] = useState('');
  const [message, setMessage] = useState('');

  // Handles initial form submission
  const handleInitialSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7076/api/Serial/check-serial', {
        serial,
        phoneNumber
      });

      if (response.status === 200) {
        setShowAdditionalFields(true);
        setMessage('Serial and phone number are valid. Please enter additional details.');
        // Fetch user info after a successful initial submission
        fetchUserInfo();
      } else {
        setMessage(response.data);
      }
    } catch (error) {
      console.error('Error submitting initial form:', error);
      setMessage('An error occurred while processing your request.');
    }
  };

  // Fetches user info from the server
  const fetchUserInfo = async () => {
    try {
      const response = await axios.get(`https://localhost:7076/api/Serial/getUserInfo/${serial}`);

      if (response.status === 200) {
        setUserInfo({
          engineId: response.data.engineId || '',
          km: response.data.km || '',
          sellerNum: response.data.sellernum || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
      setMessage('An error occurred while fetching user information.');
    }
  };

  // Handles submission of additional fields
  const handleAdditionalFieldsSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`https://localhost:7076/api/Serial/submitUserInfo/${serial}`, userInfo);

      if (response.status === 200) {
        setMessage('User information updated successfully.');
      } else {
        setMessage('Failed to update user information.');
      }
    } catch (error) {
      console.error('Error submitting additional information:', error);
      setMessage('An error occurred while submitting your information.');
    }
  };

  // Handles calculation of operation level
  const handleCalculateOperation = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post('https://localhost:7076/api/Serial/calculateOperation', {
        previousKm: userInfo.km,
        currentKm: presentKm
      });

      if (response.status === 200) {
        setOperationResult(`Kilometers Driven: ${response.data.kilometersDriven}, Replacement Needed: ${response.data.isReplacementNeeded}`);
      } else {
        setOperationResult('Failed to calculate operation status.');
      }
    } catch (error) {
      console.error('Error calculating operation:', error);
      setOperationResult('An error occurred while calculating operation status.');
    }
  };

  // Handles the "Next" button click
  const handleNextClick = () => {
    // Perform next steps here, e.g., navigate to another page or show additional info
    alert('Next button clicked!');
  };

  return (
    <div className="container" id="container">
      <div className={`form-container ${showAdditionalFields ? 'additional' : 'initial'}`}>
        {message && <p className="message">{message}</p>}
        {!showAdditionalFields ? (
          <form onSubmit={handleInitialSubmit}>
            <h1>Track</h1>
            <input
              type="text"
              name="serial"
              placeholder="Serial Number"
              value={serial}
              onChange={(e) => setSerial(e.target.value)}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <button type="submit">Submit</button>
          </form>
        ) : (
          <form onSubmit={handleAdditionalFieldsSubmit}>
            <h1>Additional Details</h1>
            <label htmlFor="engineId">Engine ID:</label>
            <input
              type="text"
              id="engineId"
              name="engineId"
              placeholder="Engine ID"
              value={userInfo.engineId}
              onChange={(e) => setUserInfo({ ...userInfo, engineId: e.target.value })}
              required
            />
            <label htmlFor="km">Kilometers:</label>
            <input
              type="number"
              id="km"
              name="km"
              placeholder="Kilometers"
              value={userInfo.km}
              onChange={(e) => setUserInfo({ ...userInfo, km: e.target.value })}
              required
            />
            <label htmlFor="sellerNum">Seller Number:</label>
            <input
              type="text"
              id="sellerNum"
              name="sellerNum"
              placeholder="Seller Number"
              value={userInfo.sellerNum}
              onChange={(e) => setUserInfo({ ...userInfo, sellerNum: e.target.value })}
              required
            />
            <button type="submit">Submit Additional Information</button>
            {userInfo.km && (
              <div>
                <h2 style={{ display: 'flex', alignItems: 'center' }}>
                  Calculate Operation Level
                  <button
                    type="button"
                    style={{ marginLeft: '10px' }}
                    onClick={handleNextClick}
                  >
                    Next
                  </button>
                </h2>
                <form onSubmit={handleCalculateOperation}>
                  <label htmlFor="presentKm">Present Kilometers:</label>
                  <input
                    type="number"
                    id="presentKm"
                    name="presentKm"
                    placeholder="Present Kilometers"
                    value={presentKm}
                    onChange={(e) => setPresentKm(e.target.value)}
                    required
                  />
                  <button type="submit">Calculate</button>
                </form>
                {operationResult && <p className="operation-result">{operationResult}</p>}
              </div>
            )}
          </form>
        )}
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Register with your product details to use all of the site features</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackForm;
