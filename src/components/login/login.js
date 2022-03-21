import React, { useState } from "react";
import './login.css';
import {Row, Button, Form} from 'react-bootstrap';
import { login } from "../../auth/index";

function Login(){

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const dologin = (e) => {
        e.preventDefault()
        let opts ={
            "email" : username,
            "password" : password
        }
        
        fetch('/api/v2/login', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(opts)
            })
            .then(r => r.json())
            .then(token => {
                if (token.access_token){
                    login(token)     
                    window.location.href = '/';
                }
                else {
                    console.log("Please type in correct username/password")
                }
            })
    }

    const handleUsernameChange = (e) => {
        setUsername(e.target.value)
      }
    
      const handlePasswordChange = (e) => {
        setPassword(e.target.value)
      }

    return(
        <Row className="form-container" >
            <Form className="text-center login-form" action="#">
                <h3 className="form-title">Sign In</h3>
                <p> Not register? <a href="/signup">Sign up</a></p>

                <Form.Group className="mt-3">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" placeholder="Enter email" className="mt-1" onChange={handleUsernameChange}/>
                </Form.Group>

                <Form.Group className="mt-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" className="mt-1" onChange={handlePasswordChange}/>
                </Form.Group>

                <Form.Group className ="gap-2 mt-3">
                    <Button type="submit" variant="primary" onClick={dologin}>
                    Sign in
                    </Button>
                </Form.Group>
            </Form>      
        </Row> 
    );
}

export default Login;