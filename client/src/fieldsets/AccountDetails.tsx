import FormField from "../components/FormField";
import { useFormContext } from "../formContext";

const AccountDetails = () => {
    const { formData } = useFormContext();

    return (
        <fieldset>
            <legend>Account Details</legend>

            <FormField
                type='text'
                label='First Name'
                name='firstName'
                id='firstName'
                value={formData.firstName}
                required
            />
            <FormField
                type='text'
                label='Last Name'
                name='lastName'
                id='lastName'
                value={formData.lastName}
                required
            />
            <FormField
                type='email'
                label='Email Address'
                name='email'
                id='email'
                value={formData.email}
                required
            />
        </fieldset>
    );
};
export default AccountDetails;
