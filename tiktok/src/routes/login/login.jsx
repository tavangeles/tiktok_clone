import { useEffect, useState } from "react";
import { useUserContext, useUserUpdateContext } from "../../hooks/userContext";
import { useNavigate } from 'react-router-dom';
import { userGetAccountDetails, userLogin } from "../../services/users";
import "./login.styles.scss";

const defaultFormFields = {
    emailAddress: "",
    password: ""
}

const Login = () => {
    const user = useUserContext();
    const setUser = useUserUpdateContext();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { emailAddress, password } = formFields;
    const navigate = useNavigate();
    
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
                <p>Email</p>
                <input
                    type="email"
                    name="emailAddress"
                    placeholder="Email"
                    onChange={handleChange}
                    value={emailAddress}
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
                <button>Log in</button>
            </form>
            <div className="footer">
                <p>Don't have an account?</p>
                <button onClick={goToRegisterHandler}>Sign up</button>
            </div>
        </div>
    );
};

export default Login;
