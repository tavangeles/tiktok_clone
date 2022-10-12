import { useEffect, useState } from "react";
import { useUserContext, useUserUpdateContext } from "../../hooks/userContext";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { useNavigate } from 'react-router-dom';
import { userLogin } from "../../services/users";
import "./login.styles.scss";

const defaultFormFields = {
    username: "",
    password: ""
}

const Login = () => {
    const user = useUserContext();
    const setUser = useUserUpdateContext();
    const setPage = usePageUpdateContext();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { username, password } = formFields;
    const isReady = username.length > 0 && password.length > 0;
    const navigate = useNavigate();

    
    useEffect(() => {
        setPage("Login");
    }, [])

    useEffect(() => {
        if (user) {
            navigate("/");
            return;
        }

    }, [user, navigate])
    
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        userLogin(formFields).then(res => {
            if (res.success) {
                setUser(res.userDetails);
                navigate("/");
            }
        })
    }

    const goToRegisterHandler = () => {
        navigate("/register");
    };

    return (
         <div className="login-container">
            <form onSubmit={handleSubmit}>
                <h1>Log in</h1>
                <p>Username</p>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={username}
                    autoComplete="none"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    onChange={handleChange}
                    value={password}
                    autoComplete="none"
                />
                <button className={isReady ? "btn-primary" : "btn-disabled"}>Log in</button>
            </form>
            <div className="footer">
                <p>Don't have an account?</p>
                <button onClick={goToRegisterHandler}>Sign up</button>
            </div>
        </div>
    );
};

export default Login;
