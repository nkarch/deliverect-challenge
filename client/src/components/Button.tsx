type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: string;
    children: string;
    className: string;
};

const Button = ({
    className,
    variant = "primary",
    type = "button",
    onClick,
    children,
    disabled,
}: ButtonProps) => {
    return (
        <button
            aria-disabled={disabled}
            className={`btn btn-${variant} ${className}`}
            onClick={onClick}
            type={type}
        >
            <span>{children}</span>
        </button>
    );
};
export default Button;
