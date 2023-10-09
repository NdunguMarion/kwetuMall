import { useState } from 'react';
import axios from 'axios';
import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Cookies from 'js-cookie';

const Login = () => {
    const [loginData ,setLoginData]= useState({
        email:'',password:''
    })

const login= async(e)=>{
    e.preventDefault();
    const{data}= await axios.post('http://localhost:5000/login',loginData);
    console.log(data)
    if (data.message ==='user authenticated succesfully!'){
        Cookies.set('token',data.token)
        window.open('/','_self');
    }
    }
    return (
        <div style={styles.container}>
            <div style={styles.backgroundImage}>

                <div style={styles.formContainer}>
                    <Form onSubmit={login}>
                        <h1 style={styles.h1}>Login</h1>
                        <hr/>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Control 
                            type="email" 
                            placeholder="email" 
                            value={loginData.email}
                            onChange={(e)=>setLoginData({...loginData,email:e.target.value})}
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Control type="password" placeholder="Password" 
                             value={loginData.password}
                             onChange={(e)=>setLoginData({...loginData,password:e.target.value})}
                             />
                        </Form.Group>

                        <Button style={styles.button} type="login">
                           Login
                        </Button>
                    </Form>
                </div>
            </div>
        </div>
    );
};

const styles = {
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
    },
    backgroundImage: {
        backgroundImage: 'url("./background.png")',
        height: '100%',
        width: '100%',
        objectFit: 'cover',
        opacity: '0.8',
        justifyContent:'center',
        alignItems:'center',
        display:'flex',
        flexDirection: 'column',

    },
    formContainer: {
        backgroundColor: 'white',
        padding: '20px',
        borderRadius: '5px',
        width:'400px'

    },
    // form: {
    //     display: 'flex',
    //     flexDirection: 'column',
    //     alignItems: 'center',
    // },
    h1: {
        fontSize: '1.5em',
    },
    button: {
        width: '100%',
        margin: '10px 0',
        backgroundColor: 'black',
        color: '#fff',
    },
};

export default Login;
