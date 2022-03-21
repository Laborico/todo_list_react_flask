import React, { useState } from "react";
import './login.css';
import {Row, Col, Button, Form} from 'react-bootstrap';

function Login(){

    const dologin = async () => {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("Login Works"), 100)
        });
    
        let result = await promise

        alert(result);
    }

    return(
        <Row className="form-container">
            <Form className="text-center login-form ">
                <h3 className="form-title">Sign In</h3>
                <Form.Group className="mt-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className="mt-1"/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className="mt-1"/>
                </Form.Group>

                <Form.Group className ="gap-2 mt-3">
                    <Button type="submit" variant="primary" onClick={() => dologin}>
                    Sign in
                    </Button>
                </Form.Group>
            </Form>      
        </Row> 
    );
}

export default Login;