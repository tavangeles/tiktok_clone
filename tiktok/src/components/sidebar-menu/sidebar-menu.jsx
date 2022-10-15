import SidebarMenuItem from "../sidebar-menu-item/sidebar-menu-item";
import homeIcon from "../../assets/svgs/home.svg";
import homeActiveIcon from "../../assets/svgs/home-active.svg";
import followingIcon from "../../assets/svgs/following.svg";
import followingActiveIcon from "../../assets/svgs/following-active.svg";
import videoIcon from "../../assets/svgs/video.svg";
import "./sidebar-menu.styles.scss";

const SidebarMenu = () => {
    return (
        <div className="sidebar-menu">
            <SidebarMenuItem page="For You" link="/" icon={homeIcon} iconActive={homeActiveIcon} />
            <SidebarMenuItem page="Following" link="following" icon={followingIcon} iconActive={followingActiveIcon} />
            <SidebarMenuItem page="Live" link="live" icon={videoIcon} iconActive={videoIcon} />
        </div>
    );
};

export default SidebarMenu;
