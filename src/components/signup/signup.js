import React, { useState } from "react";
import './signup.css';
import {Row, Button, Form} from 'react-bootstrap';
import { login } from "../../auth/index";


function Signup(){

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const dosignup = (e) => {
        e.preventDefault()
        let opts ={
            "username": username,
            "email" : email,
            "password" : password
        }
        
        fetch('/api/v2/register', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
            })
            .then(r => r.json())
            .then(res => {
                window.user_id = res.id
                window.location.href = '/login';
            })
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
    }

    const handlePasswordChange = (e) => {
        setPassword(e.target.value)
    }
    
    const handleEmailChange = (e) => {
        setEmail(e.target.value)
    }

    return(
        <Row className="form-container">
            <Form className="text-center login-form ">
                <h3 className="form-title">Signup</h3>
                <p> Already registered? <a href="/login">Login</a></p>

                <Form.Group className="mt-3">
                    <Form.Label>Nickname</Form.Label>
                    <Form.Control type="text" placeholder="Enter nickname" className="mt-1" onChange={handleUsernameChange}/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className="mt-1" onChange={handleEmailChange}/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Create a password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className="mt-1" onChange={handlePasswordChange}/>
                </Form.Group>

                <Form.Group className ="gap-2 mt-3">
                    <Button type="submit" variant="primary" onClick={dosignup}>
                    Sign up
                    </Button>
                </Form.Group>
            </Form>      
        </Row> 
    );
}

export default Signup;