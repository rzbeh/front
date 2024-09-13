import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../API/api";

export default function QRCodePage() {
  const [searchParams, setSearchParams] = useSearchParams();
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
  }, []);

  return (
    <div className="qr-container">
      <div className="qr-code-page">
        <div className="qr-details">
          {haveError ? (
            <p className="error-header">!خطایی رخ داد</p>
          ) : (
            <>
              {loading ? (
                <p>...درحال بارگذاری</p>
              ) : (
                <>
                  <h1>جزئیات محصول</h1>
                  <div className="qr-grid">
                    <div>
                      <p>
                        <b>شناسه موتور:</b> {details?.engineId}
                      </p>
                    </div>

                    <div>
                      <p>
                        <b>کیلومتر:</b> {details?.km}
                      </p>
                    </div>

                    <div>
                      <p>
                        <b>شماره فروشنده:</b> {details?.sellernum}
                      </p>
                    </div>

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
                        <b>نوع کالا:</b> {details?.msg}
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
