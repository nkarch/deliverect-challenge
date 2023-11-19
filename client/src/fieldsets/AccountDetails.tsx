import { useState } from "react";
import Button from "../components/Button";
import FormField from "../components/FormField";
import { useFormContext } from "../formContext";

const AccountDetails = () => {
    const { formData, nextStep } = useFormContext();
    const [nextBtnClicked, setNexBtnClicked] = useState(false);

    const isEmail = (email: string) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
    const nextBtnEnabled = formData.firstName && formData.lastName && isEmail(formData.email);

    const handleNextClick = () => {
        if (nextBtnEnabled) {
            nextStep();
        } else {
            setNexBtnClicked(true);
        }
    };

    return (
        <>
            <h1>Signup Wizard Thing</h1>
            <fieldset className='text-fields-width'>
                <legend>User Details</legend>

                <FormField
                    type='text'
                    label='First Name'
                    name='firstName'
                    id='firstName'
                    value={formData.firstName}
                    required
                    error={!formData.firstName && nextBtnClicked}
                />
                <FormField
                    type='text'
                    label='Last Name'
                    name='lastName'
                    id='lastName'
                    value={formData.lastName}
                    required
                    error={!formData.lastName && nextBtnClicked}
                />
                <FormField
                    type='email'
                    label='Email Address'
                    name='email'
                    id='email'
                    value={formData.email}
                    required
                    error={(!isEmail(formData.email) || !formData.email) && nextBtnClicked}
                    errorMsg={
                        formData.email && !isEmail(formData.email)
                            ? "Please enter a valid email address"
                            : undefined
                    }
                />
                <div className='btns-container'>
                    <Button
                        onClick={handleNextClick}
                        disabled={!nextBtnEnabled}
                        className='btn-next'
                    >
                        Next Step
                    </Button>
                </div>
            </fieldset>
        </>
    );
};
export default AccountDetails;
