import { usePageContext } from "../../hooks/pageContext";
import { Link } from "react-router-dom";
import "./sidebar-menu-item.styles.scss";

const SidebarMenuItem = ({ page, link, icon, iconActive }) => {
    const currentPage = usePageContext();
    return (
        <Link className={`sidebar-menu-item ${currentPage===page ? "link-active" : ""}`} to={link}>
            <img src={currentPage===page ?  iconActive: icon} alt={page} />
            <p>{page}</p>
        </Link>
    );
};

export default SidebarMenuItem;