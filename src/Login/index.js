import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './login-form';
import { Redirect } from 'react-router-dom';
import { checkUser } from '../redux/actions';

function LoginPage() {
    const { users, loginStatus } = useSelector(state => state.loginData);
    const dispatch = useDispatch();
    const [error, setError] = useState("");

    const onSubmit = (username, password) => {
        const index = users.findIndex((user =>
            user.username === username && user.password === password));
        if (index > -1) {
            setError("");
            dispatch(checkUser({
                username,
                password
            }))
        } else {
            setError("Invalid Username and/or Password");
        }
    }

    console.log("index-index", users, loginStatus);

    return (
        <React.Fragment>
            {loginStatus ?
                <Redirect to='/dashboard'/>
                : <LoginForm
                    onSubmit={onSubmit}
                    errorMsg={error}
                />
            }
        </React.Fragment>
    );
}

export default LoginPage;