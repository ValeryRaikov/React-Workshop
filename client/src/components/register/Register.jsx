import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { useRegister } from "../../hooks/useAuth";
import { useForm } from "../../hooks/useForm";

const initialValues = { email: '', password: '', rePasswrod: '',};

export default function Register() {
    const register = useRegister();
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const registerHandler = async (values) => {
        if (values.password !== values.rePassword) {
            setError(error.message);
            return;
        }

        try {
            await register(values.email, values.password);
            navigate('/');
        } catch (err) {
            console.error(err.message);
        }
    }

    const {
        values,
        changeHandler,
        submitHandler,
    } = useForm(initialValues, registerHandler);

    return (
        <section id="register-page" className="content auth">
            <form id="register" onSubmit={submitHandler}>
                <div className="container">
                <div className="brand-logo" />
                <h1>Register</h1>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={values.email}
                    onChange={changeHandler}
                    placeholder="maria@email.com"
                />
                <label htmlFor="pass">Password:</label>
                <input 
                    type="password" 
                    name="password" 
                    id="register-password" 
                    value={values.password}
                    onChange={changeHandler}
                />
                <label htmlFor="con-pass">Confirm Password:</label>
                <input 
                    type="password" 
                    name="rePassword" 
                    id="confirm-password" 
                    value={values.rePasswrod}
                    onChange={changeHandler}
                />

                {error && (
                    <p>
                        <span style={{fontSize: '24px', color: 'red'}}>{error}</span>
                    </p>
                )}

                <input className="btn submit" type="submit" defaultValue="Register" />
                <p className="field">
                    <span>
                    If you already have profile click <Link to="/login">here</Link>
                    </span>
                </p>
                </div>
            </form>
            </section>
    );
}