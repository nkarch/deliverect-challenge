import FormField from "../components/FormField";
import { useFormContext } from "../formContext";

const BusinessDetails = () => {
    const { formData } = useFormContext();

    return (
        <fieldset>
            <legend>Business Details</legend>

            <FormField
                type='text'
                name='name'
                businessField={true}
                label='Business Name'
                id='businessName'
                value={formData.business.name}
                required
            />
            <FormField
                type='number'
                name='size'
                businessField={true}
                label='Business Size'
                id='businessSize'
                value={formData.business.size ?? undefined}
                min='1'
                required
            />
            <FormField
                type='select'
                name='type'
                businessField={true}
                label='Business Type'
                id='businessType'
                required
                value={formData.business.type ?? undefined}
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
