import { useEffect, useState } from "react";
import { useFormContext } from "../../hooks/useFormContext";
import { useValidateFieldset } from "../../hooks/useValidateFieldset";

import { getIntegrations } from "../../utils";

import LogoCheckboxes from "../LogoCheckboxes";
import ErrorBoundary from "../ErrorBoundary";

const INTEGRATION_ID = "pos";

const PointOfSale = () => {
    const {
        formData,
        pointsOfSale,
        setPointsOfSale,
        nextButtonEnabled,
        nextButtonClicked,
    } = useFormContext();

    const [errorMessage, setErrorMessage] = useState("");
    const [loading, setLoading] = useState(true);

    const fieldSetIsValid = formData.business?.posIds?.length > 0;
    useValidateFieldset(fieldSetIsValid);

    useEffect(() => {
        async function getPointsOfSale() {
            const integrations = await getIntegrations(INTEGRATION_ID);

            if (integrations) {
                setLoading(false);

                if (integrations.data) {
                    setPointsOfSale(integrations.data);
                }

                if (integrations.data?.length < 1) {
                    setErrorMessage("No items");
                }

                if (integrations.error) {
                    setErrorMessage(integrations.error);
                }
            }
        }

        getPointsOfSale();
    }, [setPointsOfSale]);

    return (
        <fieldset>
            <legend>Points of Sale</legend>

            <ErrorBoundary loading={loading} errorMessage={errorMessage}>
                <LogoCheckboxes
                    logoCheckboxes={pointsOfSale}
                    integrationId={INTEGRATION_ID}
                />
            </ErrorBoundary>

            {nextButtonClicked && !nextButtonEnabled && (
                <span className='error'>
                    Please select at least one point of sale
                </span>
            )}
        </fieldset>
    );
};

export default PointOfSale;
