import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";
import QRCode from "react-qr-code";

const carTypeMap = {
  "پژو 405 موتور(XU-7)": "Peugeot 405 XU-7",
  "پژو 206 تیپ 2 موتور(TU3)": "Peugeot 206 TU3",
  "پراید تیبا ساینا اطلس شاهین موتور(M 15 M-13)":
    "Pride Tiba Saina Atlas Shahin M15 M-13",
  "پژو 206 تیپ 5 207 اچ سی کراس موتور(TU5)": "Peugeot 206 TU5",
  "رنو ساندرو، ال 90، مگان 1600 موتور(K4M)": "Renault Sandero, L90, Megan K4M",
  "دنا، سورن، سمند موتور(EF7)": "Dena, Suren, Samand EF7",
  "تسمه تایم زانتیا، پارس ELX موتور(XU10)": "Timing Belt Xantia, Pars ELX XU10",
  "تسمه تایم ریو موتور(B5 DOHC)": "Timing Belt Rio B5 DOHC",
};

const typeMap = {
  "تسمه تایم(114X17 5215XS)": "Timing Belt 114X17 5215XS",
  "تسمه تایم(104X17 5575XS)": "Timing Belt 104X17 5575XS",
  "تسمه تایم(107X22 5274XS)": "Timing Belt 107X22 5274XS",
  "تسمه تایم(137X25,4 5581XS)": "Timing Belt 137X25.4 5581XS",
  "تسمه تایم(132X27 5671XS)": "Timing Belt 132X27 5671XS",
  "تسمه تایم(127X25 5419XS)": "Timing Belt 127X25 5419XS",
  "تسمه تایم(136X25,4 5468XS)": "Timing Belt 136X25.4 5468XS",
  "تسمه تایم(137X22 5567XS)": "Timing Belt 137X22 5567XS",
  "کیت تسمه تایم(K025581XS)": "Timing Belt Kit K025581XS",
  "کیت تسمه تایم(K035671XS)": "Timing Belt Kit K035671XS",
  "کیت تسمه تایم(K015419XS)": "Timing Belt Kit K015419XS",
};

export default function QRCodePage() {
  const [searchParams] = useSearchParams();
  const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [haveError, setHaveError] = useState(false);

  const fetchDetails = async () => {
    setLoading(true);
    const serial = searchParams.get("serial");
    try {
      const res = await api.qrStatus(serial);
      setDetails(res.data);
    } catch (error) {
      setHaveError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDetails();
  }, [searchParams]);

  return (
    <div className="qr-container">
      <div className="qr-code-page">
        <div className="qr-details">
          <img src="/logo2.png" alt="logo" className="logo2" />
          {haveError ? (
            <p className="error-header">An Error Occurred!</p>
          ) : (
            <>
              {loading ? (
                <p>Loading...</p>
              ) : (
                <>
                  <QRCode
                    style={{
                      height: "auto",
                      maxWidth: "200px",
                      width: "200px",
                    }}
                    value={window.location.href}
                    viewBox={`0 0 256 256`}
                  />
                  <h1>Product Details:</h1>
                  <div className="qr-grid">
                    <div>
                      <p>
                        <b>Car Type:</b>{" "}
                        {carTypeMap[details?.carType] || details?.carType}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Model Number:</b> {details?.codes}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Type:</b> {typeMap[details?.type] || details?.type}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>Status:</b> {details?.msg}
                      </p>
                    </div>
                  </div>
                </>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
