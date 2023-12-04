import { useFormContext } from "./hooks/useFormContext";
import { useHandleFormOnChange } from "./hooks/useHandleFormOnChange";

import Navigation from "./components/Navigation";
import AccountDetails from "./components/fieldsets/AccountDetails";
import BusinessDetails from "./components/fieldsets/BusinessDetails";
import PointOfSale from "./components/fieldsets/PointOfSale";
import DeliveryChannel from "./components/fieldsets/DeliveryChannel";
import Complete from "./components/fieldsets/Complete";

function Form() {
    const { currentStep } = useFormContext();

    return (
        <form aria-labelledby='form-title' onChange={useHandleFormOnChange()}>
            {currentStep === 1 && <AccountDetails />}
            {currentStep === 2 && <BusinessDetails />}
            {currentStep === 3 && <PointOfSale />}
            {currentStep === 4 && <DeliveryChannel />}
            {currentStep === 5 && <Complete />}

            <Navigation />
        </form>
    );
}

export default Form;
