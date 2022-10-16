import { Outlet } from "react-router-dom";
import Sidebar from "../../components/sidebar/sidebar";
import "./main.styles.scss";

const Main = () => {
    return (
        <div className="main-container">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Main;