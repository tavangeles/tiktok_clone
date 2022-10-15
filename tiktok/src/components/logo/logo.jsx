import { Link } from "react-router-dom";
import tiktokLogo from "../../assets/images/tiktok-logo.png";
import "./logo.styles.scss";

const Logo = () => {
    return (
        <Link className="logo" to="/">
            <img src={tiktokLogo} alt="tiktok"/>
        </Link>
    );
};

export default Logo;