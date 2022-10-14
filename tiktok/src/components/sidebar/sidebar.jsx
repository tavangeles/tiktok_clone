import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { usePageContext } from "../../hooks/pageContext";
import { userGetSuggestions } from "../../services/users";
import User from "../user/user";
import homeIcon from "../../assets/svgs/home.svg";
import homeActiveIcon from "../../assets/svgs/home-active.svg";
import followingIcon from "../../assets/svgs/following.svg";
import followingActiveIcon from "../../assets/svgs/following-active.svg";
import videoIcon from "../../assets/svgs/video.svg";
import "./sidebar.styles.scss";

const Sidebar = () => {
    const page = usePageContext();
    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [followingAccounts, setFollowingAccounts] = useState([]);
   
    useEffect(() => {
        userGetSuggestions().then((res) => {
            setSuggestedAccounts(res.suggestedAccounts);
            setFollowingAccounts(res.followingAccounts);   
        });
    }, [])

    return (
        <div className="sidebar-container">
            <div className="menu-container">
                <Link className={`menu-link ${page==='Foryou' ? 'link-active' : ''}`} to='/'>
                    <img src={page==="Foryou" ? homeActiveIcon : homeIcon} alt="foryou" />
                    <p>For You</p>
                </Link>
                <Link className={`menu-link ${page==='Following' ? 'link-active' : ''}`} to="/following">
                    <img src={page==="Following" ? followingActiveIcon : followingIcon} alt="following" />
                    <p>Following</p>
                </Link>
                <Link className={`menu-link ${page==='Live' ? 'link-active' : ''}`} to="/live">
                    <img src={page==="Live" ? videoIcon : videoIcon} alt="live" />
                    <p>Live</p>
                </Link>
            </div>
            <div className="menu-user-container">   
                <h3>Suggested accounts</h3>
                {suggestedAccounts.map(account => {
                    return <User key={account.id} user={account}/>
                })}
            </div>
            <div className="menu-user-container">   
                <h3>Following accounts</h3>
                {!followingAccounts.length && <p className="placeholder-text">Accounts you follow will appear here</p>}
                {followingAccounts.map(account => {
                    return <User key={account.id} user={account}/>
                })}
            </div>
        </div>
    );
};

export default Sidebar;
