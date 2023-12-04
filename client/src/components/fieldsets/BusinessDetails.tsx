import { useFormContext } from "../../hooks/useFormContext";

import FormField from "../FormField";
import { useValidateFieldset } from "../../hooks/useValidateFieldset";

const BusinessDetails = () => {
    const { formData, nextButtonClicked } = useFormContext();

    const { name, size, type } = formData.business;
    const fieldSetIsValid = !!(name && size && type);

    useValidateFieldset(fieldSetIsValid);

    return (
        <fieldset className='text-fields-width'>
            <legend aria-live='assertive'>Business Details</legend>

            <FormField
                type='text'
                name='name'
                businessField={true}
                label='Business Name'
                id='businessName'
                defaultValue={name}
                required
                error={!formData.business.name && nextButtonClicked}
            />

            <FormField
                type='number'
                name='size'
                businessField={true}
                label='Business Size'
                id='businessSize'
                defaultValue={size ?? 0}
                min='1'
                required
                error={
                    (!formData.business.size || formData.business.size == 0) &&
                    nextButtonClicked
                }
                placeholder='Enter a number'
            />

            <FormField
                type='select'
                name='type'
                businessField={true}
                label='Business Type'
                id='businessType'
                required
                defaultValue={type ?? undefined}
                error={!formData.business.type && nextButtonClicked}
            >
                <option disabled value='select'>
                    Select
                </option>
                <option value='smb'>SMB</option>
                <option value='midmarket'>Midmarket</option>
                <option value='enterprise'>Enterprise</option>
            </FormField>
        </fieldset>
    );
};
export default BusinessDetails;
