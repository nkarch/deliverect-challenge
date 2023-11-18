import { LogoButtonType } from "../types";
import { useFormContext } from "../formContext";

type LogoCheckboxesProps = {
    data: LogoButtonType[];
    loading: boolean;
    errorMessage: string;
    idPrefix: string;
    updateCheckboxes: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

const LogoCheckboxes = ({
    data,
    loading,
    errorMessage,
    idPrefix,
    updateCheckboxes,
}: LogoCheckboxesProps) => {
    const { formData } = useFormContext();

    let dataGroup: number[];

    if (idPrefix === "pos") {
        dataGroup = formData.business.posIds;
    } else if (idPrefix === "channel") {
        dataGroup = formData.business.channelIds;
    }

    return (
        <>
            {loading ? (
                "loading"
            ) : data.length ? (
                data.map((item) => {
                    const checked = dataGroup.indexOf(item.id) > -1;

                    return (
                        <div key={item.id}>
                            <input
                                data-business-field='true'
                                type='checkbox'
                                name={`${idPrefix}-${item.id}`}
                                id={`${idPrefix}-${item.id}`}
                                onChange={updateCheckboxes}
                                checked={checked}
                            />
                            <label htmlFor={`${idPrefix}- ${item.id}`}>{item.name}</label>
                        </div>
                    );
                })
            ) : errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                "no items"
            )}
        </>
    );
};
export default LogoCheckboxes;
