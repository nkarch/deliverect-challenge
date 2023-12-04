import { useValidateFieldset } from "../../hooks/useValidateFieldset";
import { useFormContext } from "../../hooks/useFormContext";

import FormField from "../FormField";

const isEmail = (email: string) => {
    const validEmailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    return validEmailPattern.test(email);
};

const AccountDetails = () => {
    const { formData, nextButtonClicked } = useFormContext();

    const { firstName, lastName, email } = formData;

    const fieldSetIsValid = !!(firstName && lastName && isEmail(email));

    useValidateFieldset(fieldSetIsValid);

    return (
        <>
            <h1 id='form-title'>Signup Wizard Thing</h1>
            <p>Tell us about you and your business:</p>

            <fieldset className='text-fields-width'>
                <legend>User Details</legend>

                <FormField
                    type='text'
                    label='First Name'
                    name='firstName'
                    id='firstName'
                    defaultValue={firstName}
                    required
                    error={!firstName && nextButtonClicked}
                />

                <FormField
                    type='text'
                    label='Last Name'
                    name='lastName'
                    id='lastName'
                    defaultValue={lastName}
                    required
                    error={!lastName && nextButtonClicked}
                />

                <FormField
                    type='email'
                    label='Email Address'
                    name='email'
                    id='email'
                    defaultValue={email}
                    required
                    error={
                        nextButtonClicked &&
                        ((email && !isEmail(email)) || !email)
                    }
                    errorMsg={
                        !isEmail(email)
                            ? "Please enter a valid email address"
                            : undefined
                    }
                />
            </fieldset>
        </>
    );
};
export default AccountDetails;
