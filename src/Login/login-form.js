import React, { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import { InputGroup, FormControl, Button, Modal } from 'react-bootstrap';
import { Row, Col } from 'react-flexbox-grid';
import './login-form.scss';

function LoginForm(props) {
    const [data, setData] = useState({
        username: {
            value: "",
            error: "*This field is required",
            touched: false,
        },
        password: {
            value: "",
            error: "*This field is required",
            touched: false,
        }
    })

    const [showAlert, setAlert] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setAlert(false)
        }, 5000);
        return () => clearTimeout(timer);
    });

    const getError = (type, value = data[type].value) => {
        let error = "";
        if (isEmpty(value)) {
            error = "*This field is required";
        } else if (type === "username") {
            if (!(/\S+@\S+\.\S+/).test(value)) {
                error = "*Enter Valid Email";
            }
        } else if (type === "password") {
            if (value.length < 8) {
                error = "*Should have 8 characters atleast";
            }
        }
        setData({
            ...data,
            [type]: {
                value,
                error,
                touched: true,
            }
        })
    }

    const onSubmit = () => {
        getError("username");
        getError("password");
        setAlert(true);
        props.onSubmit(data.username.value, data.password.value)
    }

    const validateFields = () => {
        return isEmpty(data.username.error) && isEmpty(data.password.error);
    }

    const handleInputChange = (e) => {
        getError(e.target.id, e.target.value)
    }


    const isValid = validateFields();

    return (
        <Row>
            <Col lg={4} lgOffset={4}>
                <i className="material-icons circle-icon">person</i>
                <InputGroup className="mb-4">
                    <InputGroup.Prepend className="input-height">
                        <InputGroup.Text id="basic-addon1">
                            <i className="material-icons">person</i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="text"
                        placeholder="UserName"
                        id="username"
                        value={data.username.value}
                        required
                        onChange={handleInputChange}
                        aria-label="Username"
                        aria-describedby="basic-addon1"
                        className="input-height"
                    />
                    <span className="error-msg">{data.username.touched && data.username.error}</span>
                </InputGroup>
                <InputGroup className="mb-4">
                    <InputGroup.Prepend className="input-height">
                        <InputGroup.Text id="basic-addon1">
                            <i className="material-icons">vpn_key</i>
                        </InputGroup.Text>
                    </InputGroup.Prepend>
                    <FormControl
                        type="password"
                        placeholder="Password"
                        id="password"
                        value={data.password.value}
                        required
                        onChange={handleInputChange}
                        aria-label="Password"
                        aria-describedby="basic-addon1"
                        className="input-height"
                    />
                    <span className="error-msg">{data.password.touched && data.password.error}</span>
                </InputGroup>
                <Button
                    size="lg"
                    variant={isValid ? "primary" : "secondary"}
                    disabled={!isValid}
                    onClick={onSubmit}
                    block
                >
                    Login
                </Button>
            </Col>
            {!isEmpty(props.errorMsg) && showAlert &&
                <Modal.Dialog>
                    <Modal.Header>
                        <Modal.Title>{props.errorMsg}</Modal.Title>
                    </Modal.Header>
                </Modal.Dialog>
            }
        </Row>
    );
}

export default LoginForm;