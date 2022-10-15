import "./button.styles.scss";

export const BUTTON_TYPE_CLASSES = {
    primary: "btn-primary",
    secondary: "btn-secondary",
    inverted: "btn-inverted",
    active: "btn-active",
};

const Button = ({children, buttonType, ...otherProps }) => {
    return (
        <button className={`btn ${BUTTON_TYPE_CLASSES[buttonType]}`} {...otherProps}>
            {children}
        </button>
    );
};

export default Button;