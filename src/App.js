import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import TrackForm from "./Components/Track";

function App() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={
            <main>
              <Toaster position="bottom-left" reverseOrder={false} />
              <TrackForm />
            </main>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
