import React, { useState } from "react";
import api from "../API/api";
import Spinner from "./Spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ForgetSerial() {
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const isValidPhoneNumber = (phoneNumber) => {
    const numberPattern =
      /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
    return numberPattern.test(phoneNumber);
  };

  const sendSerial = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    const phoneNumber = e.target[0].value;
    try {
      const res = await api.sendSerial(phoneNumber);
      // setMessage(res.data);
      toast.success(
        "لطفا با وارد کردن شناسه از وضعیت آخرین گارانتی مطلع بشید",
        { duration: 5000 }
      );
      navigate("/");
    } catch (error) {
      setError(error?.response?.data);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="container" id="container">
      <div className="form-container">
        <form onSubmit={sendSerial} className="forget-serial">
          <h1>بازیابی شناسه</h1>
          <input
            type="text"
            name="phone"
            placeholder="شماره همراه"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className={
              !isValidPhoneNumber(phoneNumber) &&
              phoneNumber !== "" &&
              "invalid-input"
            }
            required
          />
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
