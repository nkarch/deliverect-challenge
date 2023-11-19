import { useState } from "react";
import { FormEvent } from "react";

import { FormDataType, formDataDefault } from "./types";
import { FormContext } from "./formContext";

import AccountDetails from "./fieldsets/AccountDetails";
import BusinessDetails from "./fieldsets/BusinessDetails";
import PointOfSale from "./fieldsets/PointOfSale";
import DeliveryChannel from "./fieldsets/DeliveryChannel";

import "./App.scss";
import { useRef } from "react";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
    const localFormDataString = localStorage.getItem("formData");
    const localFormStep = localStorage.getItem("formStep") || 1;
    const localFormData = localFormDataString ? JSON.parse(localFormDataString) : formDataDefault;

    const [formData, setFormData] = useState<FormDataType>(localFormData);
    const [currentStep, setCurrentStep] = useState(+localFormStep);

    const [panelClass, setPanelClass] = useState("");

    function updateFormData(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target.dataset?.businessField
            ? updateBusinessField(event)
            : event.target;

        const newFormData = {
            ...formData,
            [name]: value,
        };

        setFormData(newFormData);

        localStorage.setItem("formData", JSON.stringify(newFormData));
    }

    function updateBusinessField(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        // Nest 'business' fields under formData.business
        const name = event.target.name;
        const value = event.target.value;
        const checked = (event.target as HTMLInputElement).checked;

        let businessEntry: {} = { [name]: value };

        if (name.indexOf("pos") === 0 || name.indexOf("channel") === 0) {
            businessEntry = updateBusinessGroups(name, checked);
        }

        return { name: "business", value: { ...formData.business, ...businessEntry } };
    }

    function updateBusinessGroups(name: string, checked: boolean) {
        // Add/Remove PoS/Channel IDs from their respective arrays
        let businessGroup = {};

        if (name.indexOf("pos") === 0) {
            const posIds = formData.business.posIds;
            const posId = +name.replace("pos-", "");

            if (checked) {
                businessGroup = { posIds: [...posIds, posId] };
            } else {
                businessGroup = { posIds: posIds.filter((id) => id !== posId) };
            }
        } else if (name.indexOf("channel") === 0) {
            const channelIds = formData.business.channelIds;
            const channelId = +name.replace("channel-", "");

            if (checked) {
                businessGroup = { channelIds: [...channelIds, channelId] };
            } else {
                businessGroup = { channelIds: channelIds.filter((id) => id !== channelId) };
            }
        }

        return businessGroup;
    }

    async function handleSubmit(event: FormEvent) {
        event.preventDefault();

        try {
            const res = await fetch(`${apiUrl}/account`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (res.ok) {
                localStorage.removeItem("formData");
                localStorage.removeItem("formStep");
            } else {
                throw "Could not submit";
            }
        } catch (err) {
            console.log("Error: " + err);
        }
    }

    function prevStep() {
        setPanelClass("panel-prev");

        setTimeout(() => {
            setCurrentStep((step) => step - 1);
            localStorage.setItem("formStep", (+localFormStep - 1).toString());
        }, 400);

        setTimeout(() => {
            setPanelClass("");
        }, 800);
    }

    function nextStep() {
        setPanelClass("panel-next");
        setTimeout(() => {
            setCurrentStep((step) => step + 1);

            if (currentStep === 4) {
                localStorage.removeItem("formStep");
            } else {
                localStorage.setItem("formStep", (+localFormStep + 1).toString());
            }
        }, 400);

        setTimeout(() => {
            setPanelClass("");
        }, 800);
    }

    return (
        <>
            <FormContext.Provider value={{ prevStep, nextStep, formData, updateFormData }}>
                <div className='container'>
                    <div className='panel-wrapper'>
                        <div className={`panel-border ${panelClass}`}>
                            <div className='panel'>
                                <form onSubmit={handleSubmit} aria-labelledby='form-title'>
                                    {currentStep === 1 && (
                                        <>
                                            <h1 id='form-title'>Signup Wizard Thing</h1>
                                            <p>Tell us about you and your business:</p>
                                            <AccountDetails />
                                        </>
                                    )}

                                    {currentStep === 2 && <BusinessDetails />}
                                    {currentStep === 3 && <PointOfSale />}
                                    {currentStep === 4 && <DeliveryChannel />}

                                    {currentStep === 5 && (
                                        <div className='complete'>
                                            <p aria-live='polite'>
                                                <span className='success'>Success!</span> You're all
                                                done!
                                            </p>
                                        </div>
                                    )}
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </FormContext.Provider>
        </>
    );
}

export default App;
