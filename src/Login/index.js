import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import LoginForm from './login-form';
import { Redirect } from 'react-router-dom';
import { checkUser, addUser } from '../redux/actions';
import { Modal } from 'react-bootstrap';
import { Col } from 'react-flexbox-grid';
import './login-form.scss';

function LoginPage() {
    const { users, loginStatus } = useSelector(state => state.loginData);
    const dispatch = useDispatch();
    const [showAlert, setAlert] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false)
        }, 5000);
        return () => clearTimeout(timer);
    });

    const onSubmit = (username, password, action) => {
        setAlert(true);
        if (action === "login") {
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
        } else {
            const index = users.findIndex((user => user.username === username));
            if (index > -1) {
                setError("Username already exists");
            } else {
                setError("Account Created Successfully");
                dispatch(addUser({
                    username,
                    password
                }))
            }
        }
    }

    return (
        <React.Fragment>
            {(error) && showAlert &&
                <Col lgOffset={8} className="modal-class">
                    <Modal.Dialog>
                        <Modal.Header>
                            <Modal.Title className="title-width">{error}</Modal.Title>
                        </Modal.Header>
                    </Modal.Dialog>
                </Col>
            }
            {loginStatus ?
                <Redirect to='/dashboard' />
                : <LoginForm
                    onSubmit={onSubmit}
                    errorMsg={error}
                />
            }
        </React.Fragment>
    );
}

export default LoginPage;