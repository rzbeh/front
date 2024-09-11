import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";
import "./style.css";
import toast from "react-hot-toast";

export default function DetailsForm({ setStep }) {
  const [details, setDetails] = useState();
  const [searchParams, setSearchParams] = useSearchParams();
  const [calculateResult, setCalculateResult] = useState();

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
      toast.success("Your information submitted successfully!");
      setStep(0);
    } catch (error) {}
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    const currentKm = e.target[0].value;
    try {
      const res = await api.calculateOperation(details?.km, currentKm);
      setCalculateResult(res.data);
    } catch (error) {
      toast.error("An unexpected error accured");
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  return (
    <div className="additional-details">
      <form onSubmit={submitDetails} id="form">
        <h1>Additional Details</h1>
        <label htmlFor="engineId">Engine ID</label>
        <input
          type="number"
          name="engineId"
          placeholder="Engine ID"
          defaultValue={details?.engineId}
          required
        />
        <label htmlFor="km">Kilometers</label>
        <input
          type="number"
          name="km"
          placeholder="KM"
          defaultValue={details?.km}
          required
        />
        <label htmlFor="sellerNumber">Seller Number</label>
        <input
          type="number"
          name="sellerNumber"
          placeholder="Seller number"
          defaultValue={details?.sellernum}
          required
        />
        <button type="submit" className="main-button">
          Submit
        </button>
      </form>
      {details?.km && (
        <form onSubmit={handleCalculate} id="form">
          <input
            type="number"
            name="currentKm"
            placeholder="Current Kilometers"
            required
          />
          {calculateResult && (
            <p className="result-text">{`Kilometers driven: ${
              calculateResult?.kilometersDriven
            } and You ${
              !calculateResult?.isReplacementNeeded ? "don't" : ""
            } need replacement`}</p>
          )}
          <button type="submit" className="main-button">
            Calculate
          </button>
        </form>
      )}
    </div>
  );
}
