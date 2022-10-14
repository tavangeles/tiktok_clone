import { Outlet, Link, Navigate, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext, useUserUpdateContext } from '../../hooks/userContext';
import { userLogout, userGetAccountDetails } from '../../services/users';
import { usePageContext } from '../../hooks/pageContext';
import ProfilePicture from '../../components/profile-picture/profile-picture';
import tiktokLogo from "../../assets/images/tiktok-logo.png";
import cross from "../../assets/svgs/cross.svg";
import search from "../../assets/svgs/search.svg";
import profile from "../../assets/svgs/profile.svg";
import settings from "../../assets/svgs/settings.svg";
import logout from "../../assets/svgs/logout.svg";
import './navigation.styles.scss';


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
                <Link className="navigation-logo-container" to='/'>
                    <img src={tiktokLogo} alt="tiktok"/>
                </Link>
                <div className="navigation-search-container">
                    <input type="search" placeholder="Search accounts and videos" />
                    <button><img src={search} alt="search" /></button>
                </div>
                <div className="navigation-links-container">
                    <Link className={`navigation-link-button ${page==='Upload' ? 'link-active': ''}`} to="/upload">
                        <img src={cross} alt="cross" className="svg" />
                        Upload
                    </Link>
                    {
                        user &&
                        <>
                            <div class="dropdown">
                                <ProfilePicture imageUrl={user.imageUrl} diameter="32px" />
                                <div class="dropdown-content">
                                    <Link className="navigation-link-profile" to={`/account/${user.username}`}>
                                        <p><img src={profile} alt="account" />View Profile</p>
                                    </Link>
                                    <p><img src={settings} alt="settings" />Settings</p>
                                    <p onClick={handleUserLogout}><img src={logout} alt="logout" />Logout</p>
                                </div>
                            </div>
                        </>
                    }
                    {
                        !user &&
                        <Link className={`navigation-link-button btn-primary`} to="/login">
                            Login
                        </Link>
                    }
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
