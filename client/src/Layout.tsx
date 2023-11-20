type LayoutProps = {
    children: React.ReactNode;
    className?: string;
    panelClass?: string;
};

const Layout = ({ children, panelClass }: LayoutProps) => {
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
