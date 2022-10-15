import { usePageContext } from "../../hooks/pageContext";
import Caption from "../caption/caption";
import User from "../user/user";
import Button from "../button/button";
import "./post-details.styles.scss";

const PostDetails = ({ imageUrl, username, name, caption, isFollowing, onFollowHandler }) => {
    const page = usePageContext();
    
    return (
        <div className="post-details">         
            <User user={{ imageUrl, username, name }} pictureDiameter="56px">
                <Caption>{caption}</Caption>
            </User>
            {
                page !== "Following" &&
                <Button buttonType={isFollowing ? "secondary" : "inverted"} onClick={onFollowHandler}>{isFollowing ? "Following" : "Follow"}</Button>}
        </div>
    );
};

export default PostDetails;