import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TrackForm from "./Components/Track";
import QRCodePage from "./Components/QRCodePage";
import ForgetSerial from "./Components/ForgetSerial";
import PdfPage from "./Components/pdfPage";

function App() {
  return (
    <div>
      <Toaster position="bottom-left" reverseOrder={false} />
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <TrackForm />
            </main>
          }
        />
        <Route path="/qrcode" element={<QRCodePage />} />
        <Route path="/forget-serial" element={<ForgetSerial />} />
        <Route path="/pdf" element={<PdfPage />} />
      </Routes>
    </div>
  );
}

export default App;
