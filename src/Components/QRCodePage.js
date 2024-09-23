import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";
import QRCode from "react-qr-code";

export default function QRCodePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [details, setDetails] = useState();
  const [loading, setLoading] = useState(false);
  const [haveError, setHaveError] = useState(false);

  const details = {
    carType: "BMW",
    codes: 123445,
    type: "CART",
    msg: "test message",
  };

  const fetchDetails = async () => {
    setLoading(true);
    const serial = searchParams.get("serial");
    try {
      const res = await api.qrStatus(serial);
      // setDetails(res.data);
    } catch (error) {
      setHaveError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // fetchDetails();
  }, []);

  return (
    <div className="qr-container">
      <div className="qr-code-page">
        <div className="qr-details">
          <img src="/logo2.png" alt="logo" className="logo2" />
          {haveError ? (
            <p className="error-header">!خطایی رخ داد</p>
          ) : (
            <>
              <QRCode
                style={{ height: "auto", maxWidth: "200px", width: "200px" }}
                value={window.location.href}
                viewBox={`0 0 256 256`}
              />
              {loading ? (
                <p>...درحال بارگذاری</p>
              ) : (
                <>
                  <h1>جزئیات محصول</h1>
                  <div className="qr-grid">
                    <div>
                      <p>
                        <b>نوع خودرو:</b> {details?.carType}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>شماره مدل:</b> {details?.codes}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b>نوع کالا:</b> {details?.type}
                      </p>
                    </div>
                    <div>
                      <p>
                        <b> وضغیت کالا:</b> {details?.msg}
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
