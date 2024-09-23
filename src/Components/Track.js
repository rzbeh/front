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
        {step === 1 && <DetailsForm />}
      </div>
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-right">
            <h1>!سلام</h1>
            <p>
              اطلاعات محصول خود را وارد کنید تا بتوانید از همه‌ی قابلیت‌های سایت
              استفاده کنید
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackForm;
