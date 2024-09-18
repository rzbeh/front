import React, { useState } from "react";
import api from "../API/api";
import Spinner from "./Spinner";

export default function ForgetSerial() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const sendSerial = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const phoneNumber = e.target[0].value;
    try {
      const res = await api.sendSerial(phoneNumber);
      setMessage(res.data);
    } catch (error) {
      setError(error.response.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container" id="container">
      <div className="form-container">
        <form onSubmit={sendSerial} className="forget-serial">
          <h1>بازیابی شناسه</h1>
          <input type="text" name="phone" placeholder="شماره همراه" required />
          {error !== "" && (
            <div className="error-box">
              <p className="error-message">{error}</p>
            </div>
          )}
          {message !== "" && (
            <div className="message-box">
              <p className="success-message">{message}</p>
            </div>
          )}
          <button
            type="submit"
            className="main-button loader-button"
            disabled={loading}
          >
            {loading && <Spinner />}
            ثبت
          </button>
        </form>
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <p>شماره همراه خود را وارد کنید تا شناسه برای شما ارسال شود</p>
          </div>
        </div>
      </div>
    </div>
  );
}
