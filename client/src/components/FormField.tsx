import { ChangeEventHandler } from "react";

type inputProps = React.InputHTMLAttributes<HTMLInputElement> & {
    label: string;
    error?: boolean;
    errorMsg?: string;
    businessField?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement | HTMLSelectElement>;
    name: string;
};

const DEFAULT_ERROR_MSG = "Please complete this required field.";

const FormField = ({
    children,
    type,
    id,
    name,
    defaultValue,
    min,
    required,
    errorMsg = DEFAULT_ERROR_MSG,
    label,
    error,
    businessField,
    placeholder,
}: inputProps) => {
    return (
        <div className={`form-field form-field-${type}`}>
            <label htmlFor={id}>
                {label}
                {required && (
                    <span aria-hidden className='field-required'>
                        *
                    </span>
                )}{" "}
            </label>
            {type === "select" ? (
                <select
                    data-business-field={businessField}
                    id={id}
                    name={name}
                    defaultValue={defaultValue || "select"}
                >
                    {children}
                </select>
            ) : (
                <input
                    name={name}
                    data-business-field={businessField}
                    type={type}
                    id={id}
                    defaultValue={defaultValue}
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
