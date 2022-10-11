import { Outlet } from "react-router-dom";
import "./main.styles.scss";
import Sidebar from "../../components/sidebar/sidebar";

const Main = () => {
    return (
        <div className="main-container">
            <Sidebar />
            <Outlet />
        </div>
    );
};

export default Main;
