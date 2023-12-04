import { useFormContext } from "./useFormContext";

export function useNavigate() {
    const { currentStep, setCurrentStep, maxSteps, setPanelClass } =
        useFormContext();

    return (newStep: number) => {
        const direction =
            (currentStep === maxSteps && newStep === 1) || newStep > currentStep
                ? "next"
                : "prev";

        setPanelClass("panel-" + direction); // ex: panel-next

        setTimeout(() => {
            setCurrentStep(newStep);
            localStorage.setItem("formStep", currentStep.toString());
        }, 400);

        setTimeout(() => {
            setPanelClass("");
        }, 800);
    };
}
