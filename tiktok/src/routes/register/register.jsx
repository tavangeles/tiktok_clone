import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserContext, useUserUpdateContext } from "../../hooks/userContext";
import { usePageUpdateContext } from "../../hooks/pageContext";
import { userRegister } from "../../services/users";
import "./register.styles.scss";

const defaultFormFields = {
    name: "",
    username: "",
    password: ""
}

const Register = () => {
    const user = useUserContext();
    const setPage = usePageUpdateContext();
    const setUser = useUserUpdateContext();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, username, password } = formFields;
    const isReady = name.length > 0 && username.length > 0 && password.length > 0;
    const navigate = useNavigate();
    
    useEffect(() => {
        setPage("Register");
    }, [])

    useEffect(() => {
        if (user) {
            navigate("/");
        }
    }, [user, navigate])

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        userRegister(formFields).then(res => {
            if (res.success) {
                console.log(res.userDetails);
                setUser(res.userDetails);
                navigate("/");
            }
        })
    }

    const goToLoginHandler = () => {
        navigate('/login');
    };

    return (
        <div className="register-container">
            <form onSubmit={handleSubmit}>
                <h1>Sign Up</h1>
                <p>What is your nickname?</p>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    onChange={handleChange}
                    value={name}
                    autoComplete="off"
                />
                <p>Username</p>
                <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    onChange={handleChange}
                    value={username}
                    autoComplete="off"
                />
                <input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={handleChange}
                    value={password}
                    autoComplete="off"
                />
                <button className={isReady ? "btn-primary" : "btn-disabled"}>Sign Up</button>
            </form>
            <div className="footer">
                <p>Already have an account?</p>
                <button onClick={goToLoginHandler}>Log in</button>
            </div>
        </div>
    );
};

export default Register;
