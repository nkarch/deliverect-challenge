import { BusinessType, IntegrationIdType } from "./types";

type setBusinessEntryProps = {
    business: BusinessType;
    key: string;
    value: string | number[];
};

export function setBusinessEntry({
    business,
    key,
    value,
}: setBusinessEntryProps): BusinessType {
    return { ...business, [key]: value };
}

export async function getIntegrations(endpoint: IntegrationIdType) {
    const apiUrl = import.meta.env.VITE_API_URL;

    try {
        const res = await fetch(`${apiUrl}/${endpoint}`);

        if (res.ok) {
            const data = await res.json();
            return { data, error: null };
        } else {
            throw "Could not retreive data";
        }
    } catch (err) {
        return { data: null, error: "Error: " + err };
    }
}
