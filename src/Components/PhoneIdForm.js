import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../API/api";
import toast from "react-hot-toast";

export default function PhoneIdForm({ setStep }) {
  const [error, setError] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [phoneNumber, setPhoneNumber] = useState("");

  const isValidPhoneNumber = (phoneNumber) => {
    const numberPattern =
      /^(?:(?:(?:\\+?|00)(98))|(0))?((?:90|91|92|93|99)[0-9]{8})$/;
    return numberPattern.test(phoneNumber);
  };

  const navigate = useNavigate();

  const checkSerial = async (e) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phoneNumber)) {
      toast.error("شماره همراه وارد شده معتبر نیست");
    }
    const serial = e.target[1].value;
    try {
      await api.checkSerial(serial, phoneNumber);
      toast.success("شناسه با موفقیت برای شما ثبت شد", {
        duration: 3000,
      });
      setSearchParams({ phoneNumber: phoneNumber, serial: serial });
      setStep(1);
    } catch (error) {
      setError(error.response.data);
    }
  };

  return (
    <form onSubmit={checkSerial} id="form" className="sign-in">
      <img src="/logo1.jpg" className="logo1" alt="logo" />
      <h1>پیگیری یا فعال سازی</h1>
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
        defaultValue={searchParams.get("phoneNumber")}
        required
      />
      <input
        type="number"
        name="id"
        placeholder="شناسه"
        defaultValue={searchParams.get("serial")}
        required
      />
      {error !== "" && (
        <div className="error-box">
          <p className="error-message">{error}</p>
        </div>
      )}
      <p className="forget-serial-text">
        شناسه خود را فراموش کرده‌اید؟
        <p className="link" onClick={() => navigate("/forget-serial")}>
          بازیابی شناسه
        </p>
      </p>
      <button type="submit" className="main-button">
        ثبت
      </button>
      <div className="logo-container">
        <img src="/logo2.png" alt="logo" />
        <img src="/logo3.jpg" alt="logo" />
      </div>
    </form>
  );
}
