import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TrackForm from "./Components/Track";
import QRCodePage from "./Components/QRCodePage";

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
      </Routes>
    </div>
  );
}

export default App;
