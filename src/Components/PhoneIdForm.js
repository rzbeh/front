import React from "react";
import api from "../API/api";
import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";

export default function PhoneIdForm({ setStep }) {
  const [searchParams, setSearchParams] = useSearchParams();

  const checkSerial = async (e) => {
    e.preventDefault();
    const phoneNumber = e.target[0].value;
    const serial = e.target[1].value;
    try {
      await api.checkSerial(serial, phoneNumber);
      setSearchParams({ phoneNumber: phoneNumber, serial: serial });
      setStep(1);
    } catch (error) {
      if (error.status === 404) {
        toast.error("Invalid combination of phone number and ID");
      } else {
        toast.error("An Unexpected error accured");
      }
    }
  };

  return (
    <form onSubmit={checkSerial} id="form">
      <h1>Track</h1>
      <input
        type="text"
        name="phone"
        placeholder="Phone"
        defaultValue={searchParams.get("phoneNumber")}
        required
      />
      <input
        type="number"
        name="id"
        placeholder="ID"
        defaultValue={searchParams.get("serial")}
        required
      />
      <button type="submit" className="main-button">Submit</button>
    </form>
  );
}
