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
        <div className='logo-grid logo-checkboxes'>
            {loading ? (
                "loading"
            ) : data.length ? (
                data.map((item) => {
                    const checked = dataGroup.indexOf(item.id) > -1;

                    return (
                        <div key={item.id} className='logo-grid-item'>
                            <div className='logo-checkbox' key={item.id}>
                                <label>
                                    <input
                                        data-business-field='true'
                                        type='checkbox'
                                        name={`${idPrefix}-${item.id}`}
                                        id={`${idPrefix}-${item.id}`}
                                        onChange={updateCheckboxes}
                                        checked={checked}
                                        aria-labelledby={`${idPrefix}-${item.id}-img`}
                                    />
                                    <div className='img-wrapper'>
                                        <img
                                            src={item.imageUrl}
                                            alt={item.name}
                                            id={`${idPrefix}-${item.id}-img`}
                                            aria-hidden
                                        />
                                    </div>
                                </label>
                            </div>
                        </div>
                    );
                })
            ) : errorMessage ? (
                <p>{errorMessage}</p>
            ) : (
                "no items"
            )}
        </div>
    );
};
export default LogoCheckboxes;
