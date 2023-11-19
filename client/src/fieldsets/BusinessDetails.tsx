import { useState } from "react";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { useFormContext } from "../formContext";

const BusinessDetails = () => {
    const { formData, prevStep, nextStep } = useFormContext();
    const [nextBtnClicked, setNexBtnClicked] = useState(false);

    const nextBtnEnabled =
        formData.business?.name &&
        formData.business?.size &&
        formData.business?.size > 0 &&
        formData.business?.type;

    const handleNextClick = () => {
        if (nextBtnEnabled) {
            nextStep();
        } else {
            setNexBtnClicked(true);
        }
    };

    return (
        <fieldset className='text-fields-width'>
            <legend>Business Details</legend>

            <FormField
                type='text'
                name='name'
                businessField={true}
                label='Business Name'
                id='businessName'
                value={formData.business.name}
                required
                error={!formData.business.name && nextBtnClicked}
            />
            <FormField
                type='number'
                name='size'
                businessField={true}
                label='Business Size'
                id='businessSize'
                value={formData.business.size ?? 0}
                min='1'
                required
                error={(!formData.business.size || formData.business.size == 0) && nextBtnClicked}
                placeholder='Enter a number'
            />
            <FormField
                type='select'
                name='type'
                businessField={true}
                label='Business Type'
                id='businessType'
                required
                value={formData.business.type ?? undefined}
                error={!formData.business.type && nextBtnClicked}
            >
                <option disabled value='select'>
                    Select
                </option>
                <option value='smb'>SMB</option>
                <option value='midmarket'>Midmarket</option>
                <option value='enterprise'>Enterprise</option>
            </FormField>

            <div className='btns-container'>
                <Button className='btn-prev' onClick={prevStep}>
                    Go Back
                </Button>

                <Button className='btn-next' disabled={!nextBtnEnabled} onClick={handleNextClick}>
                    Next Step
                </Button>
            </div>
        </fieldset>
    );
};
export default BusinessDetails;
