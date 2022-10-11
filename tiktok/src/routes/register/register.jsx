import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { useUserContext, useUserUpdateContext } from "../../hooks/userContext";
import { userRegister } from "../../services/users";
import "./register.styles.scss";

const defaultFormFields = {
    name: "",
    emailAddress: "",
    password: ""
}

const Register = () => {
    const user = useUserContext();
    const setUser = useUserUpdateContext();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { name, emailAddress, password } = formFields;
    const navigate = useNavigate();

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
                <p>Email</p>
                <input
                    type="email"
                    name="emailAddress"
                    placeholder="Email Address"
                    onChange={handleChange}
                    value={emailAddress}
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
                <button>Sign Up</button>
            </form>
            <div className="footer">
                <p>Already have an account?</p>
                <button onClick={goToLoginHandler}>Log in</button>
            </div>
        </div>
    );
};

export default Register;
