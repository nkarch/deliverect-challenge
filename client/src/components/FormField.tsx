import { useState } from "react";
import { useFormContext } from "../formContext";

type inputProps = React.InputHTMLAttributes<"input"> & {
    label: string;
    error?: boolean;
    errorMsg?: string;
    businessField?: boolean;
};

const DEFAULT_ERROR_MSG = "Please complete this required field.";

const FormField = ({
    children,
    type,
    id,
    name,
    value,
    min,
    required,
    errorMsg = DEFAULT_ERROR_MSG,
    label,
    error,
    businessField,
    placeholder,
}: inputProps) => {
    // const [error, setError] = useState(false);
    const { updateFormData } = useFormContext();

    return (
        <div className={`form-field form-field-${type}`}>
            <label htmlFor={id}>
                {label}
                {required && <span className='field-required'>*</span>}{" "}
            </label>
            {type === "select" ? (
                <select
                    data-business-field={businessField}
                    id={id}
                    name={name}
                    onChange={(e) => updateFormData(e)}
                    defaultValue={value || "select"}
                >
                    {children}
                </select>
            ) : (
                <input
                    name={name}
                    data-business-field={businessField}
                    type={type}
                    id={id}
                    onChange={(e) => updateFormData(e)}
                    value={value}
                    min={min}
                    required={required}
                    size={1}
                    placeholder={placeholder}
                />
            )}
            {error && <span className='error'>{errorMsg}</span>}
        </div>
    );
};
export default FormField;
