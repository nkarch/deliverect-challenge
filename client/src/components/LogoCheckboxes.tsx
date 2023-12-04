import { IntegrationIdType, LogoButtonType } from "../types";
import { useFormContext } from "../hooks/useFormContext";
import LogoCheckbox from "./LogoCheckbox";

type LogoCheckboxesProps = {
    logoCheckboxes: LogoButtonType[];
    integrationId: IntegrationIdType;
};

const LogoCheckboxes = ({
    logoCheckboxes,
    integrationId,
}: LogoCheckboxesProps) => {
    const { formData } = useFormContext();

    const ids: number[] = formData.business[`${integrationId}Ids`] ?? [];

    return (
        <div className='logo-grid logo-checkboxes'>
            {logoCheckboxes.map((item) => {
                const defaultChecked = ids.indexOf(item.id) > -1;

                return (
                    <div key={item.id} className='logo-grid-item'>
                        <LogoCheckbox
                            item={item}
                            defaultChecked={defaultChecked}
                            integrationId={integrationId}
                        />
                    </div>
                );
            })}
        </div>
    );
};
export default LogoCheckboxes;
