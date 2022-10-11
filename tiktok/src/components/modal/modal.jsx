import "./modal.styles.scss";

const Modal = ({children, onCloseHandler}) => {
    return (
        <div className="modal">
            <div className="overlay" onClick={onCloseHandler}></div>
            {children}
        </div>
    );
};

export default Modal;
