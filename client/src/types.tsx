export type LogoButtonType = {
    id: number;
    name: string;
    imageUrl: string;
};

export type UserType = {
    firstName: string;
    lastName: string;
    email: string;
    business: BusinessType;
};

export type BusinessType = {
    name: string;
    size: number | null;
    type: "SMB" | "Midmarket" | "Enterprise" | null;
    posIds: number[];
    channelIds: number[];
};

export type FormDataType = UserType;

export const formDataDefault: FormDataType = {
    firstName: "",
    lastName: "",
    email: "",
    business: {
        name: "",
        size: null,
        type: null,
        posIds: [],
        channelIds: [],
    },
};
