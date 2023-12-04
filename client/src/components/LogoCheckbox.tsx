import { IntegrationIdType, IntegrationType } from "../types";

function LogoCheckbox({
    item,
    integrationId,
    defaultChecked,
}: {
    item: IntegrationType;
    integrationId: IntegrationIdType;
    defaultChecked: boolean;
}) {
    return (
        <div className='logo-checkbox'>
            <label>
                <input
                    data-business-field='true'
                    type='checkbox'
                    name={`${integrationId}Ids`}
                    id={`${integrationId}${item.id}`}
                    value={item.id}
                    defaultChecked={defaultChecked}
                    aria-labelledby={`${integrationId}-${item.id}-img`}
                />

                <div className='img-wrapper'>
                    <img
                        src={item.imageUrl}
                        alt={item.name}
                        id={`${integrationId}-${item.id}-img`}
                        aria-hidden
                    />
                </div>
            </label>
        </div>
    );
}
export default LogoCheckbox;
