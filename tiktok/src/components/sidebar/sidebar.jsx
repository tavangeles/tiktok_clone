import { useEffect, useState } from "react";
import { userGetSuggestions } from "../../services/users";
import SidebarMenu from "../sidebar-menu/sidebar-menu";
import SidebarUsers from "../sidebar-users/sidebar-users";
import "./sidebar.styles.scss";

const Sidebar = () => {
    const [suggestedAccounts, setSuggestedAccounts] = useState([]);
    const [followingAccounts, setFollowingAccounts] = useState([]);
   
    useEffect(() => {
        userGetSuggestions().then((res) => {
            setSuggestedAccounts(res.suggestedAccounts);
            setFollowingAccounts(res.followingAccounts);
        });
    }, [])

    return (
        <div className="sidebar">
            <SidebarMenu />
            <SidebarUsers title="Suggested Accounts" users={suggestedAccounts} />
            <SidebarUsers title="Following accounts" users={followingAccounts} />
        </div>
    );
};

export default Sidebar;
