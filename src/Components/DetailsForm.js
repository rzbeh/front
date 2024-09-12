import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";
import "./style.css";
import toast from "react-hot-toast";

export default function DetailsForm({ setStep }) {
  const [details, setDetails] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [calculateResult, setCalculateResult] = useState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const fetchDetails = async () => {
    const serial = searchParams.get("serial");
    try {
      const res = await api.getDetails(serial);
      setDetails(res.data);
    } catch (error) {
      console.error("An Unexpected error accured");
    }
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    const engineId = e.target[0].value;
    const km = e.target[1].value;
    const sellerNumber = e.target[2].value;
    const serial = searchParams.get("serial");
    try {
      await api.submitDetails(serial, km, sellerNumber, engineId);
      setError("");
      setMessage("اطلاعات شما با موفقیت ثبت شد");
    } catch (error) {
      setMessage("");
      setError("خطایی در ثبت اطلاعات رخ داد");
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    const currentKm = e.target[0].value;
    try {
      const res = await api.calculateOperation(details?.km, currentKm);
      setCalculateResult(res.data);
    } catch (error) {
      toast.error("یک خطای غیر منتظره رخ داد! دوباره تلاش کنید");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="additional-details">
      <form onSubmit={submitDetails} id="form" className="details-form">
        <h1>اطلاعات تکمیلی</h1>
        <div className="form-grid">
          <div>
            <label htmlFor="engineId">شناسه موتور</label>
            <input
              type="number"
              name="engineId"
              placeholder="شناسه موتور"
              defaultValue={details?.engineId}
            />
          </div>

          <div>
            <label htmlFor="km">کیلومتر</label>
            <input
              type="number"
              name="km"
              placeholder="کیلومتر"
              defaultValue={details?.km}
            />
          </div>

          <div>
            <label htmlFor="sellerNumber">شماره فروشنده</label>
            <input
              type="number"
              name="sellerNumber"
              placeholder="شماره فروشنده"
              defaultValue={details?.sellernum}
            />
          </div>

          <div>
            <label htmlFor="carType">نوع خودرو</label>
            <input
              type="text"
              name="carType"
              placeholder="نوع خودرو"
              defaultValue={details?.carType}
              disabled
            />
          </div>

          <div>
            <label htmlFor="code">شماره مدل</label>
            <input
              type="text"
              name="code"
              placeholder="شماره مدل"
              defaultValue={details?.codes}
              disabled
            />
          </div>

          <div>
            <label htmlFor="type">نوع کالا</label>
            <input
              type="text"
              name="type"
              placeholder="نوع کالا"
              defaultValue={details?.type}
              disabled
            />
          </div>
        </div>
        <button type="submit" className="main-button">
          ثبت
        </button>
        {message !== "" && error === "" && (
          <p className="submit-message">{message}</p>
        )}
        {message === "" && error !== "" && (
          <p className="error-message">{error}</p>
        )}
      </form>
      {details?.km && (
        <form onSubmit={handleCalculate} id="form">
          <input
            type="number"
            name="currentKm"
            placeholder="کیلومتر کنونی"
            required
          />
          {calculateResult && (
            <p className="result-text">{`شما ${
              calculateResult?.kilometersDriven
            } کیلومتر سپری کرده‌اید و نیاز به تعویض ${
              calculateResult?.isReplacementNeeded ? "دارید" : "ندارید"
            }`}</p>
          )}
          <button type="submit" className="main-button">
            محاسبه
          </button>
        </form>
      )}
    </div>
  );
}

// شماره مدل
// code
// خوردرو نوع
// carType
// نوع کالا
// type
