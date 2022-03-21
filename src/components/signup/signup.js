import React, { useState } from "react";
import './signup.css';
import {Row, Button, Form} from 'react-bootstrap';

function Signup(){

    const dosignup = async () => {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => resolve("Signup Works"), 100)
        });
    
        let result = await promise

        alert(result);
    }

    return(
        <Row className="form-container">
            <Form className="text-center login-form ">
                <h3 className="form-title">Signup</h3>
                <p> Already registered? <a href="/">Login</a></p>

                <Form.Group className="mt-3">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type="text" placeholder="Enter nickname" className="mt-1"/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className="mt-1"/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Create a password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className="mt-1"/>
                </Form.Group>

                <Form.Group className ="gap-2 mt-3">
                    <Button type="submit" variant="primary" onClick={() => dosignup}>
                    Sign up
                    </Button>
                </Form.Group>
            </Form>      
        </Row> 
    );
}

export default Signup;