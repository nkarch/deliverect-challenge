import { BusinessType, FormDataType } from "../types";
import { setBusinessEntry } from "../utils";
import { useFormContext } from "./useFormContext";

type ValueType = string | BusinessType | number[];

export function useHandleFormOnChange() {
    const { setFormData, formData } = useFormContext();

    return (e: React.FormEvent<HTMLFormElement>) => {
        const target = e.target as HTMLInputElement | HTMLSelectElement;
        let key = target.name;
        let value: ValueType = target.value;

        if (target.type === "checkbox") {
            const integrationIds =
                formData.business[target.name as keyof BusinessType];
            if (Array.isArray(integrationIds)) {
                const id = +value;
                // Overwrite value (single ID) as array of integration IDs
                value =
                    integrationIds.indexOf(id) > -1
                        ? integrationIds.filter((findId) => findId !== id)
                        : [...integrationIds, +value];
            }
        }

        if (target.dataset.businessField) {
            // Nest 'business' fields under formData.business
            // Overwrite value as business object with key: value
            value = setBusinessEntry({
                business: formData.business,
                key,
                value,
            });
            key = "business";
        }
        setFormData({
            ...formData,
            [key]: value,
        } as FormDataType);
    };
}
