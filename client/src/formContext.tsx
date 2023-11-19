import { createContext } from "react";
import { formDataDefault } from "./types";
import { useContext } from "react";

export const FormContext = createContext({
    prevStep: () => {},
    nextStep: () => {},
    formData: formDataDefault,
    updateFormData: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {},
});

export const useFormContext = () => useContext(FormContext);