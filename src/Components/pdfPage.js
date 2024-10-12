import React, { useEffect, useState } from "react";
import "./style.css";
import QRCode from "react-qr-code";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";

export default function PdfPage() {
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [searchParams] = useSearchParams();

  const serial = searchParams.get("serial");

  const convertToPdf = () => {
    if (window.print) {
      window.print();
    }
  };

  const fetchDetails = async () => {
    const serial = searchParams.get("serial");
    setLoading(true);
    try {
      const res = await api.getDetails(serial);
      setDetails(res.data);
    } catch (error) {
      console.error("An Unexpected error accured");
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, []);

  if (error) {
    return (
      <div className="pdf-page">
        <h1 className="header">خطایی رخ داد</h1>
      </div>
    );
  }

  return (
    <div className="pdf-page">
      {loading ? (
        <>
          <p>لطفا چند لحظه منتظر بمانید...</p>
        </>
      ) : (
        <>
          <h1 className="header">از اینکه محصول خود را ثبت کردید متشکریم</h1>

          <div className="section">
            <span className="label">شماره سریال:</span>
            <span>{details?.serial}</span>
          </div>

          <div className="section">
            <span className="label">تاریخ ثبت نام:</span>
            <span>{details?.time}</span>
          </div>

          <div className="section">
            <span className="label">نوع خودرو:</span>
            <span>{details?.carType}</span>
          </div>

          <div className="section">
            <span className="label">شماره موتور:</span>
            <span>{details?.engineId}</span>
          </div>

          <div className="section">
            <span className="label">کیلومتر اولیه:</span>
            <span>{details?.km}</span>
          </div>

          <div className="section support">
            <span className="label">پشتیبانی:</span>
            <span>02144598476 - 09120708177</span>
          </div>

          <QRCode
            style={{
              height: "auto",
              maxWidth: "100px",
              width: "100px",
            }}
            value={`${window.location.hostname}/qrcode?serial=${serial}`}
            viewBox={`0 0 256 256`}
          />

          <div
            className="logo-container"
            style={{ justifyContent: "space-evenly", width: "100%" }}
          >
            <img src="/logo3.jpg" alt="Tazaki Logo" className="logo" />
            <img src="/logo2.PNG" alt="Gates Logo" className="logo" />
            <img src="/logo1.jpg" alt="SENP Logo" className="logo" />
          </div>
          <button className="main-button print-button" onClick={convertToPdf}>
            دانلود
          </button>
        </>
      )}
    </div>
  );
}
