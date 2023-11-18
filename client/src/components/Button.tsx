type ButtonProps = React.ButtonHTMLAttributes<"button">;

const Button = ({ type = "button", children }: ButtonProps) => {
    return <button type={type}>{children}</button>;
};
export default Button;
