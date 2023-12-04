import { useState } from "react";
import { useFormContext } from "../hooks/useFormContext";
import Button from "./Button";
import { formDataDefault } from "../types";
import { useNavigate } from "../hooks/useNavigate";

function Navigation() {
    const {
        currentStep,
        maxSteps,
        setFormData,
        nextButtonEnabled,
        setNextButtonClicked,
    } = useFormContext();

    const [clearData, setClearData] = useState(false);

    const navigate = useNavigate();

    function handleStartOverClick() {
        if (clearData) {
            setFormData(formDataDefault);
            localStorage.removeItem("formData");
        }

        navigate(1);
    }

    function handleNextClick() {
        if (nextButtonEnabled) {
            setNextButtonClicked(false);
            navigate(currentStep + 1);
        } else {
            setNextButtonClicked(true);
        }
    }

    return (
        <div className='btns-container'>
            {currentStep > 1 && currentStep < 5 && (
                <Button
                    className='btn-prev'
                    onClick={() => navigate(currentStep - 1)}
                    tabIndex={1}
                >
                    Go Back
                </Button>
            )}

            {currentStep < maxSteps && (
                <Button
                    className='btn-next'
                    disabled={!nextButtonEnabled}
                    onClick={handleNextClick}
                >
                    Next Step
                </Button>
            )}

            {currentStep === maxSteps && (
                <div className='success-nav'>
                    <label>
                        Clear data
                        <input
                            type='checkbox'
                            onChange={() => setClearData(!clearData)}
                        />
                    </label>

                    <Button onClick={handleStartOverClick}>Start Over</Button>
                </div>
            )}
        </div>
    );
}
export default Navigation;
