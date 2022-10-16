import { useNavigate } from "react-router-dom";
import User from "../user/user";
import "./sidebar-users.styles.scss";

const SidebarUsers = ({ title, users }) => {
    return (
        users.length > 0 && <div className="sidebar-users">
            <h3>{title}</h3>
            {users.map(account => {
                return <User key={account.id} user={account} pictureDiameter="32px"/>
            })}
        </div>
    );
};

export default SidebarUsers;