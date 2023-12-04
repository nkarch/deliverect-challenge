import {
    createContext,
    useEffect,
    useState,
    Dispatch,
    ReactNode,
    SetStateAction,
} from "react";

import { FormDataType, formDataDefault, IntegrationType } from "./types";

const MAX_STEPS = 5;

type FormContextProps = {
    maxSteps: number;
    currentStep: number;
    setCurrentStep: Dispatch<SetStateAction<number>>;
    formData: FormDataType;
    setFormData: Dispatch<SetStateAction<FormDataType>>;
    panelClass: string;
    setPanelClass: Dispatch<SetStateAction<string>>;
    pointsOfSale: IntegrationType[];
    setPointsOfSale: Dispatch<SetStateAction<never[]>>;
    deliveryChannels: IntegrationType[];
    setDeliveryChannels: Dispatch<SetStateAction<never[]>>;
    nextButtonEnabled: boolean;
    setNextButtonEnabled: Dispatch<SetStateAction<boolean>>;
    nextButtonClicked: boolean;
    setNextButtonClicked: Dispatch<SetStateAction<boolean>>;
};

type FormProviderProps = {
    children: ReactNode;
};

const LOCAL_STORAGE = {
    formData: "formData",
    formStep: "formStep",
};

const initialCurrentStep = +(localStorage.getItem("formStep") || 1);
const localFormData: string = localStorage.getItem("formData") ?? "";
const initialFormData = localFormData
    ? JSON.parse(localFormData)
    : formDataDefault;

const initialState = {
    maxSteps: MAX_STEPS,
    currentStep: initialCurrentStep,
    setCurrentStep: () => {},
    formData: initialFormData,
    setFormData: () => {},
    panelClass: "",
    setPanelClass: () => {},
    pointsOfSale: [],
    setPointsOfSale: () => {},
    deliveryChannels: [],
    setDeliveryChannels: () => {},
    nextButtonEnabled: false,
    setNextButtonEnabled: () => {},
    nextButtonClicked: false,
    setNextButtonClicked: () => {},
};

const FormContext = createContext<FormContextProps>(initialState);

const FormProvider = ({ children }: FormProviderProps) => {
    const [currentStep, setCurrentStep] = useState<number>(initialCurrentStep);
    const [formData, setFormData] = useState<FormDataType>(initialFormData);
    const [panelClass, setPanelClass] = useState("");
    const [pointsOfSale, setPointsOfSale] = useState([]);
    const [deliveryChannels, setDeliveryChannels] = useState([]);
    const [nextButtonEnabled, setNextButtonEnabled] = useState(false);
    const [nextButtonClicked, setNextButtonClicked] = useState(false);

    useEffect(() => {
        if (!currentStep) return;
        localStorage.setItem(LOCAL_STORAGE.formStep, currentStep.toString());
    }, [currentStep]);

    useEffect(() => {
        if (!formData) return;
        localStorage.setItem(LOCAL_STORAGE.formData, JSON.stringify(formData));
    }, [formData]);

    const contextValue: FormContextProps = {
        maxSteps: MAX_STEPS,
        currentStep,
        setCurrentStep,
        formData,
        setFormData,
        panelClass,
        setPanelClass,
        pointsOfSale,
        setPointsOfSale,
        deliveryChannels,
        setDeliveryChannels,
        nextButtonEnabled,
        setNextButtonEnabled,
        nextButtonClicked,
        setNextButtonClicked,
    };

    return (
        <FormContext.Provider value={contextValue}>
            {children}
        </FormContext.Provider>
    );
};

export { FormProvider, FormContext };
