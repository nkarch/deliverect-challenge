import { useEffect } from "react";
import { useState } from "react";

import { LogoButtonType } from "../types";
import LogoCheckboxes from "../components/LogoCheckboxes";
import { useFormContext } from "../formContext";

const apiUrl = import.meta.env.VITE_API_URL;

const DeliveryChannel = () => {
    const [posList, setPosList] = useState<LogoButtonType[]>([]);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");
    const { updateFormData } = useFormContext();

    useEffect(() => {
        async function getPosList() {
            try {
                const res = await fetch(apiUrl + "/channel");

                setLoading(false);

                if (res.status !== 200) {
                    throw "It's not 200";
                } else {
                    const data = await res.json();
                    setPosList(data);
                }
            } catch (err) {
                setErrorMessage("Error " + err);
            }
        }

        getPosList();
    }, []);

    return (
        <fieldset>
            <legend>Delivery Channel</legend>

            <LogoCheckboxes
                data={posList}
                loading={loading}
                errorMessage={errorMessage}
                idPrefix='channel'
                updateCheckboxes={(e) => updateFormData(e)}
            />
        </fieldset>
    );
};
export default DeliveryChannel;
