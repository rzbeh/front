import { useState } from "react";
import PhoneIdForm from "./PhoneIdForm";
import "./style.css";
import DetailsForm from "./DetailsForm";

const TrackForm = () => {
  const [step, setStep] = useState(0);

  return (
    <div
      className={`container ${step === 1 && "details-container"}`}
      id="container"
    >
      <div className="form-container">
        {step === 0 && <PhoneIdForm setStep={setStep} />}
        {step === 1 && <DetailsForm setStep={setStep} />}
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>سلام</h1>
            <p>
              جهت تایید اصالت کالا و فعال سازی گارانتی مراحل ثبت محصول را تا
              انتها انجام دهید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackForm;
