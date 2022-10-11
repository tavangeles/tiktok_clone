import { Outlet, Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useUserContext, useUserUpdateContext } from '../../hooks/userContext';
import { userGetAccountDetails } from '../../services/users';
import ProfilePicture from '../../components/profile-picture/profile-picture';
import tiktokLogo from "../../assets/images/tiktok-logo.png";
import cross from "../../assets/svgs/cross.svg";
import search from "../../assets/svgs/search.svg";
// import notification from "../../assets/svgs/notification.svg";
import './navigation.styles.scss';


const Navigation = () => {
    const user = useUserContext();
    const setUser = useUserUpdateContext();

    useEffect(() => {
        userGetAccountDetails().then(res => {
            if (res.success) {
                setUser(res.userDetails);
            }
        });
    }, [])
    
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

                    {/* <Link className="navigation-link-icon" to="/account">
                        <img src={notification} alt="cross" className="svg" />
                    </Link> */}
                    {
                        user &&
                        <>
                            <Link className="navigation-link-button" to="/upload">
                                <img src={cross} alt="cross" className="svg" />
                                Upload
                            </Link>
                            <Link className="navigation-link-profile" to={`/account/${user.username}`}>
                                <ProfilePicture imageUrl={user.imageUrl} diameter="32px" />
                            </Link>
                        </>
                    }
                    { !user && <Link className="navigation-link-profile" to="/login">
                        Login
                    </Link>}
                </div>
            </div>
            <Outlet />
        </>
    );
};

export default Navigation;
