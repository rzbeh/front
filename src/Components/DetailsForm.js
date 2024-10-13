import { usePDF } from "@react-pdf/renderer";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Modal from "react-modal";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";
import PdfPage from "./pdfPage";
import "./style.css";

export default function DetailsForm({ setStep }) {
  const [details, setDetails] = useState();
  const [searchParams] = useSearchParams();
  const [calculateResult, setCalculateResult] = useState();
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [expireError, setExpireError] = useState(false);
  const [kilometerSubmitted, setKilometerSubmitted] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [engineId, setEngineId] = useState();
  const [loading, setLoading] = useState(false);
  const [sellerNum, setSellerNum] = useState(details?.sellernum);

  const [{ url }, update] = usePDF({
    document: details && !loading ? <PdfPage details={details} /> : null,
  });

  useEffect(() => {
    details && !loading && update(<PdfPage details={details} />);
  }, [details]);

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: 100,
    },
  };

  const isValidEngineId = (engineId) => {
    if (engineId.toString().length < 11) {
      return false;
    }
    return true;
  };

  const fetchDetails = async () => {
    setLoading(true);
    const serial = searchParams.get("serial");
    try {
      const res = await api.getDetails(serial);
      setDetails(res.data);
      setSellerNum(res.data?.sellernum);
    } catch (error) {
      console.error("An Unexpected error accured");
    } finally {
      setLoading(false);
    }
  };

  const submitDetails = async (e) => {
    e.preventDefault();
    const engineId = e.target[0].value || null;
    if (!isValidEngineId(engineId)) {
      toast.error("شناسه موتور وارد شده معتبر نیست");
      return;
    }
    const km = e.target[1].value || null;
    const serial = searchParams.get("serial");
    try {
      await api.submitDetails(serial, km, sellerNum, engineId);
      setKilometerSubmitted(true);
      setError("");
      setMessage("اطلاعات شما با موفقیت ثبت شد");
      fetchDetails();
      setModalIsOpen(true);
    } catch (error) {
      setMessage("");
      setError("خطایی در ثبت اطلاعات رخ داد");
    }
  };

  const handleCalculate = async (e) => {
    e.preventDefault();
    setExpireError(false);
    const currentKm = e.target[0].value;
    if (currentKm - details?.km > 60000) {
      setExpireError(true);
      return;
    }
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
      <Modal isOpen={modalIsOpen} style={customStyles}>
        <div className="modal-container">
          <p>اطلاعات با موفقیت ثبت شد و گارانتی شما شروع شد</p>

          <div className="modal-buttons">
            {url ? (
              <a
                href={url}
                className="main-button"
                download="product-details.pdf"
              >
                دانلود
              </a>
            ) : (
              <p className="main-button">PDF درحال ساخت</p>
            )}
            <button
              className="main-button"
              onClick={() => {
                setModalIsOpen(false);
                setStep(0);
              }}
            >
              باشه
            </button>
          </div>
        </div>
      </Modal>
      <form
        onSubmit={(!details?.km || !details?.sellernum) && submitDetails}
        id="form"
        className="details-form"
      >
        <h1>اطلاعات تکمیلی</h1>
        <div className="form-grid">
          <div>
            <label htmlFor="engineId">شناسه موتور</label>
            <input
              type="number"
              name="engineId"
              placeholder="شناسه موتور"
              value={engineId}
              onChange={(e) => setEngineId(e.target.value)}
              className={
                engineId && !isValidEngineId(engineId) && "invalid-input"
              }
              required
              disabled={kilometerSubmitted || details?.engineId}
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
              disabled={kilometerSubmitted || details?.km}
              required
            />
          </div>

          <div>
            <label htmlFor="sellerNumber">شماره فروشنده</label>
            <input
              type="number"
              name="sellerNumber"
              placeholder="شماره فروشنده"
              disabled={kilometerSubmitted || details?.sellernum}
              value={sellerNum}
              onChange={(e) => setSellerNum(e.target.value)}
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
        {(!details?.km || !details?.sellernum) && (
          <button type="submit" className="main-button">
            ثبت
          </button>
        )}
        {message !== "" && error === "" && (
          <p className="submit-message">{message}</p>
        )}
        {message === "" && error !== "" && (
          <p className="error-message">{error}</p>
        )}
      </form>
      {details?.km && (
        <form onSubmit={handleCalculate} id="form" className="current-km">
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
          {expireError && (
            <p className="error-message">مدت گارانتی مشمول شما به اتمام رسید</p>
          )}
          <button type="submit" className="main-button">
            محاسبه
          </button>
        </form>
      )}
    </div>
  );
}
