import { useEffect } from "react";
import { useFormContext } from "./useFormContext";

export function useValidateFieldset(formIsValid: boolean) {
    const { setNextButtonClicked, setNextButtonEnabled } = useFormContext();

    useEffect(() => {
        if (formIsValid) {
            setNextButtonClicked(false);
        }

        setNextButtonEnabled(formIsValid);
    }, [formIsValid, setNextButtonEnabled, setNextButtonClicked]);
}
