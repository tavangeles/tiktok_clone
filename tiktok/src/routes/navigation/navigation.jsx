import { useEffect } from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";
import { useUserContext, useUserUpdateContext } from "../../hooks/userContext";
import { userLogout, userGetAccountDetails } from "../../services/users";
import { usePageContext } from "../../hooks/pageContext";
import Button from "../../components/button/button";
import Logo from "../../components/logo/logo";
import Dropdown from "../../components/dropdown/dropdown";
import ProfilePicture from "../../components/profile-picture/profile-picture";
import NavigationSearch from "../../components/navigation-search/navigation-search";
import cross from "../../assets/svgs/cross.svg";
import profile from "../../assets/svgs/profile.svg";
import settings from "../../assets/svgs/settings.svg";
import logout from "../../assets/svgs/logout.svg";
import "./navigation.styles.scss";


const Navigation = () => {
    const navigate = useNavigate();
    const user = useUserContext();
    const setUser = useUserUpdateContext();
    const page = usePageContext();

    useEffect(() => {
        userGetAccountDetails().then(res => {
            if (res.success) {
                setUser(res.userDetails);
            }
        });
    }, [])

    const handleUserLogout = () => {
        userLogout();
        setUser(null);
        navigate(`/login`);
    }  
    
    return (
        <>
            <div className="navigation">
                <Logo />
                <NavigationSearch />
                <div className="navigation-links">
                    <Link to="/upload">
                        <Button buttonType="secondary">
                            <img src={cross} alt="cross" className="svg" /> Upload
                        </Button>
                    </Link>
                    {
                        user ?
                        <Dropdown>
                            <ProfilePicture imageUrl={user.imageUrl} diameter="32px" />
                            <div class="dropdown-content">
                                <Link to={`/account/${user.username}`}>
                                    <p><img src={profile} alt="account" />View Profile</p>
                                </Link>
                                <p><img src={settings} alt="settings" />Settings</p>
                                <p onClick={handleUserLogout}><img src={logout} alt="logout" />Logout</p>
                            </div>
                        </Dropdown>
                        :
                        <Link to="/login">
                            <Button buttonType="primary">
                                Login
                            </Button>
                        </Link>
                    }
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
