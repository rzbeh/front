import { useState } from "react";
import PhoneIdForm from "./PhoneIdForm";
import "./style.css";
import DetailsForm from "./DetailsForm";
import { useSearchParams } from "react-router-dom";

const TrackForm = () => {
  const [step, setStep] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();

  return (
    <div className="container" id="container">
      <div className="form-container sign-in">
        {step === 0 && <PhoneIdForm setStep={setStep} />}
        {step === 1 && <DetailsForm setStep={setStep} />}
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>
              Register with your product details to use all of the site features
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackForm;
