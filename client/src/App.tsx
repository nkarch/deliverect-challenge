import { useState } from "react";
import { FormEvent } from "react";

import { FormDataType, formDataDefault } from "./types";
import { FormContext } from "./formContext";

import Button from "./components/Button";

import AccountDetails from "./fieldsets/AccountDetails";
import BusinessDetails from "./fieldsets/BusinessDetails";
import PointOfSale from "./fieldsets/PointOfSale";
import DeliveryChannel from "./fieldsets/DeliveryChannel";

import "./App.css";

const apiUrl = import.meta.env.VITE_API_URL;

function App() {
    const localFormDataString = localStorage.getItem("formData");
    const localFormData = localFormDataString ? JSON.parse(localFormDataString) : formDataDefault;

    const [formData, setFormData] = useState<FormDataType>(localFormData);

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
            console.log(res.status);
        } catch (err) {}
    }

    return (
        <>
            <FormContext.Provider value={{ formData, updateFormData }}>
                <form onSubmit={handleSubmit}>
                    <AccountDetails />
                    <BusinessDetails />
                    <PointOfSale />
                    <DeliveryChannel />
                    <Button type='submit'>Submit</Button>
                </form>
            </FormContext.Provider>

            <div
                style={{
                    position: "fixed",
                    top: "20px",
                    right: "20px",
                    padding: "10px",
                    background: "#eee",
                }}
            >
                <pre>{`${JSON.stringify(formData, null, 2)}`}</pre>
            </div>
        </>
    );
}

export default App;
