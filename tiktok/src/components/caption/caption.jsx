import "./caption.styles.scss";

const Caption = ({ children }) => {
    return (
        <pre className="caption">{children}</pre>
    );
};

export default Caption;