import { useFormContext } from "./useFormContext";
import { DirectionType } from "../types";

export function useUpdatePanel({
    direction,
}: {
    direction: DirectionType;
}): void {
    const { currentStep, setCurrentStep, maxSteps, setPanelClass } =
        useFormContext();

    const step =
        direction === "prev" && currentStep > 1
            ? currentStep - 1
            : direction === "next" && currentStep < maxSteps
            ? currentStep + 1
            : currentStep;

    setPanelClass("panel-" + direction); // panel-next || panel-prev

    setTimeout(() => {
        setCurrentStep(() => step);
        localStorage.setItem("formStep", step.toString());
    }, 400);

    setTimeout(() => {
        setPanelClass("");
    }, 800);
}
