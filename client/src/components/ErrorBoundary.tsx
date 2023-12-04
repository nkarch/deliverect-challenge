type ErrorBoundaryProps = {
    children: React.ReactNode;
    loading: boolean;
    errorMessage: string;
};

function ErrorBoundary({
    children,
    loading,
    errorMessage,
}: ErrorBoundaryProps) {
    return loading ? (
        <p>Loading items...</p>
    ) : errorMessage ? (
        <p>{errorMessage}</p>
    ) : (
        <>{children}</>
    );
}
export default ErrorBoundary;
