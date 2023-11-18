import { useState } from "react";
import { useFormContext } from "../formContext";

type inputProps = React.InputHTMLAttributes<"input"> & {
    label: string;
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
    businessField,
}: inputProps) => {
    const [error, setError] = useState(false);
    const { updateFormData } = useFormContext();

    return (
        <div style={{ display: "block" }}>
            <label htmlFor={id}>{label} </label>
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
            ) : type === "textarea" ? (
                <textarea></textarea>
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
                />
            )}
            {error && <span>{errorMsg}</span>}
        </div>
    );
};
export default FormField;
