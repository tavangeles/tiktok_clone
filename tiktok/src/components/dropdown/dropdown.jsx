import "./dropdown.styles.scss";

const Dropdown = ({children}) => {
    return (
        <div className="dropdown">
            {children}
        </div>
    );
};

export default Dropdown;