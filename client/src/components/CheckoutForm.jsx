import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import authApi from '../api/authApi'
import Alert from 'react-bootstrap/Alert';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = () => {
    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [pickupPoints, setPickupPoints] = useState([]);
    const [names, setNames] = useState([])
    const [locations, setLocations] = useState([])
    const [showAlert, setShowAlert] = useState(false);


    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getPickupPoints = async () => {
        const { data } = await axios.get('http://localhost:5000/pickup-points');
        console.log(data)
        if (data.message === 'Fetched pickup points!') {
            setPickupPoints(data.data)
            let locationsArr = [];
            for (let i = 0; i < data.data.length; i++) {
                locationsArr = [...locationsArr, data.data[i].location];
            }
            setLocations([...new Set(locationsArr)]);
        }
    }

    const getLocationName = (location) => {
        let fillteredPickupPoints = pickupPoints.filter((pickupPoint) => {
            return pickupPoint.location === location;
        })
        setNames(fillteredPickupPoints);
    }

    const handleCheckout = async (e) => {
        e.preventDefault();
        console.log('data')
        const { data } = await authApi.post('/checkout');
        console.log(data)
        if (data.message === 'Successfully ckecked out') {
            setShowAlert(true)
            setTimeout(()=>{
                navigate('/')
            },3000)
        }
    }

    useEffect(() => {
        getPickupPoints();
    }, [])

    return (
        <>
            <button onClick={handleShow} style={styles.button}>Proceed to Checkout</button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Checkout</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {
                        showAlert === true ?
                            <Alert variant="success" onClose={() => setShowAlert(false)} dismissible>
                                <Alert.Heading>Successfully checkout</Alert.Heading>
                                <p>
                                    Pick items within 7 day of ordering!
                                </p>
                            </Alert>
                            : null
                    }
                    <Form onSubmit={handleCheckout}>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Choose location
                            </Form.Label>
                            <Form.Select onChange={(e) => getLocationName(e.target.value)}>
                                <option></option>
                                {
                                    locations.map((location) => {
                                        return <option key={location}>{location}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>
                                Choose Pickup Point
                            </Form.Label>
                            <Form.Select>
                                <option></option>
                                {
                                    names.map((name) => {
                                        return <option key={name._id}>{name.name}</option>
                                    })
                                }
                            </Form.Select>
                        </Form.Group>
                        <button style={styles.checkoutbutton}>Checkout</button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>

    )
}

const styles = {
    button: {
        margin: "2px",
        border: "1px solid #000",
        borderRadius: "10px",
        background: "black",
        color: "#fff",
        width: "50%",
        padding: "10px 0",

    },
    checkoutbutton: {
        margin: "2px",
        border: "1px solid #000",
        borderRadius: "10px",
        background: "black",
        color: "#fff",
        width: "100%",
        padding: "10px 0",
    }
};

export default CheckoutForm;