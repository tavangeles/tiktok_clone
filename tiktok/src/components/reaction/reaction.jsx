import "./reaction.styles.scss";

const Reaction = ({ name, isActive, icon, activeIcon, reactionCount, onClickHandler }) => {
    return (
        <div className="reaction" onClick={onClickHandler}>
            <div>
                <img src={!isActive ? icon : activeIcon} alt={name} />
            </div>
            <p>{reactionCount}</p>
        </div>
          
    );
};

export default Reaction;