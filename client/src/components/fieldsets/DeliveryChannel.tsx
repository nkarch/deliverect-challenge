import { useState, useEffect } from "react";
import { useFormContext } from "../../hooks/useFormContext";
import { useValidateFieldset } from "../../hooks/useValidateFieldset";

import { getIntegrations } from "../../utils";

import LogoCheckboxes from "../LogoCheckboxes";
import ErrorBoundary from "../ErrorBoundary";

const INTEGRATION_ID = "channel";

const DeliveryChannel = () => {
    const {
        formData,
        deliveryChannels,
        setDeliveryChannels,
        nextButtonEnabled,
        nextButtonClicked,
    } = useFormContext();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const fieldSetIsValid = formData.business?.channelIds?.length > 0;
    useValidateFieldset(fieldSetIsValid);

    useEffect(() => {
        async function getDeliveryChannels() {
            const integrations = await getIntegrations(INTEGRATION_ID);

            if (integrations) {
                setLoading(false);

                if (integrations.data) {
                    setDeliveryChannels(integrations.data);
                }

                if (integrations.data?.length < 1) {
                    setErrorMessage("No items");
                }

                if (integrations.error) {
                    setErrorMessage(integrations.error);
                }
            }
        }

        getDeliveryChannels();
    }, [setDeliveryChannels]);

    return (
        <fieldset>
            <legend>Delivery Channels</legend>

            <ErrorBoundary loading={loading} errorMessage={errorMessage}>
                <LogoCheckboxes
                    logoCheckboxes={deliveryChannels}
                    integrationId={INTEGRATION_ID}
                />
            </ErrorBoundary>

            {nextButtonClicked && !nextButtonEnabled && (
                <span className='error'>
                    Please select at least one delivery channel
                </span>
            )}
        </fieldset>
    );
};

export default DeliveryChannel;
