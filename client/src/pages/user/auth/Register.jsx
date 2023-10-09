import { useState } from 'react';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Register = ( )=> {
    const navigate = useNavigate();
    const [registerData,setRegisterData]=useState({
        firstName:'',lastName:'',email:'',phoneNumber:'',password:''
    });
    const register = async(e)=>{
        e.preventDefault()
        const{data}= await axios.post('http://localhost:5000/register',registerData);
        console.log(data);
        if  (data.message === 'User created'){
            console.log('gdgd')
            navigate('/login')
        }
        
    }
    return(
        <div style={styles.container}>
            <div style={styles.backgroundImage}>

                <div style={styles.formContainer}>
                    <Form onSubmit={register}>
                        <h1 style={styles.h1}>Register</h1>
                        <hr/>
                        <Row className="mb-3" >
                            <Col>
                            <Form.Control type="text" placeholder="First name" 
                            value={registerData.firstName}
                            onChange={(e)=>setRegisterData({...registerData,firstName:e.target.value})}
                            />
                            </Col>
                            <Col>
                            <Form.Control type="text" placeholder="Last name"
                            value={registerData.lastName}
                            onChange={(e)=>setRegisterData({...registerData,lastName:e.target.value})}
                            />
                            </Col>
                         </Row>
                         <Row className="mb-3">
                            <Col>
                            <Form.Control type="email" placeholder="Email" 
                            value={registerData.email}
                            onChange={(e)=>setRegisterData({...registerData,email:e.target.value})}
                            />
                            </Col>
                        </Row>
                        <Row className="mb-3">
                            <Col>
                            <Form.Control type="password" placeholder="Password"
                            value={registerData.password}
                            onChange={(e)=>setRegisterData({...registerData,password:e.target.value})}
                             />
                            </Col>
                        </Row>
                         <Row className="mb-3">
                            <Col>
                            <Form.Control type="text" placeholder="Phone number"
                            value={registerData.phoneNumber}
                            onChange={(e)=>setRegisterData({...registerData,phoneNumber:e.target.value})} 
                            />
                            </Col>
                        </Row>

                        <Button style={styles.button} type="Register">
                          Register
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

export default Register;

