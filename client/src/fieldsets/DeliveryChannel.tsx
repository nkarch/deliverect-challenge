import { useState, useEffect } from "react";

import { LogoButtonType } from "../types";
import LogoCheckboxes from "../components/LogoCheckboxes";
import { useFormContext } from "../formContext";
import Button from "../components/Button";

const apiUrl = import.meta.env.VITE_API_URL;

const DeliveryChannel = () => {
    const { formData, updateFormData, prevStep, nextStep } = useFormContext();

    const [posList, setPosList] = useState<LogoButtonType[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const [nextBtnClicked, setNexBtnClicked] = useState(false);

    const submitBtnEnabled = formData.business?.channelIds.length;

    const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (!submitBtnEnabled) {
            e.preventDefault();
            setNexBtnClicked(true);
        } else {
            nextStep();
        }
    };

    const handleUpdateFormData = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNexBtnClicked(false);
        updateFormData(e);
    };

    useEffect(() => {
        async function getPosList() {
            try {
                const res = await fetch(apiUrl + "/channel");

                setLoading(false);

                if (res.ok) {
                    const data = await res.json();
                    setPosList(data);
                } else {
                    throw "Could not retreive delivery chanels";
                }
            } catch (err) {
                setErrorMessage("Error: " + err);
            }
        }

        getPosList();
    }, []);

    return (
        <fieldset style={{ display: "grid" }}>
            <legend>Delivery Channels</legend>

            <LogoCheckboxes
                data={posList}
                loading={loading}
                errorMessage={errorMessage}
                idPrefix='channel'
                updateCheckboxes={(e) => handleUpdateFormData(e)}
            />

            {nextBtnClicked && !submitBtnEnabled && (
                <span className='error'>Please select at least one delivery channel</span>
            )}

            <div className='btns-container'>
                <Button className='btn-prev' onClick={prevStep} tabIndex={1}>
                    Go Back
                </Button>

                <Button
                    type='submit'
                    className='btn-next'
                    disabled={!submitBtnEnabled}
                    onClick={(e) => handleSubmit(e)}
                >
                    Submit
                </Button>
            </div>
        </fieldset>
    );
};
export default DeliveryChannel;
