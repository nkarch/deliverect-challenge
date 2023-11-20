import { useState, useEffect } from "react";

import { LogoButtonType } from "../types";
import LogoCheckboxes from "../components/LogoCheckboxes";
import { useFormContext } from "../formContext";
import Button from "../components/Button";

const apiUrl = import.meta.env.VITE_API_URL;

const PointOfSale = () => {
    const { formData, updateFormData, prevStep, nextStep } = useFormContext();

    const [posList, setPosList] = useState<LogoButtonType[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextBtnClicked, setNexBtnClicked] = useState(false);

    const nextBtnEnabled = formData.business?.posIds?.length > 0;

    const handleNextClick = () => {
        if (nextBtnEnabled) {
            nextStep();
        } else {
            setNexBtnClicked(true);
        }
    };

    const handleUpdateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNexBtnClicked(false);
        updateFormData(e);
    };

    useEffect(() => {
        async function getPosList() {
            try {
                const res = await fetch(apiUrl + "/pos");

                setLoading(false);

                if (res.ok) {
                    const data = await res.json();
                    setPosList(data);
                } else {
                    throw "Could not retreive points of sale";
                }
            } catch (err) {
                setErrorMessage("Error: " + err);
            }
        }

        getPosList();
    }, []);

    return (
        <fieldset style={{ display: "grid" }}>
            <legend>Points of Sale</legend>

            <LogoCheckboxes
                data={posList}
                loading={loading}
                errorMessage={errorMessage}
                idPrefix='pos'
                updateCheckboxes={(e) => handleUpdateFormData(e)}
            />

            {nextBtnClicked && !nextBtnEnabled && (
                <span className='error'>Please select at least one point of sale</span>
            )}

            <div className='btns-container'>
                <Button className='btn-prev' onClick={prevStep} tabIndex={1}>
                    Go Back
                </Button>

                <Button className='btn-next' disabled={!nextBtnEnabled} onClick={handleNextClick}>
                    Next Step
                </Button>
            </div>
        </fieldset>
    );
};
export default PointOfSale;
