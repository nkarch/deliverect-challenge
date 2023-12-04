import { useFormContext } from "./hooks/useFormContext";

type LayoutProps = {
    children: React.ReactNode;
    className?: string;
};

const Layout = ({ children }: LayoutProps) => {
    const { panelClass } = useFormContext();

    return (
        <div className='container'>
            <div className='panel-wrapper'>
                <div className={`panel-border ${panelClass}`}>
                    <div className='panel'>{children}</div>
                </div>
            </div>
        </div>
    );
};
export default Layout;
