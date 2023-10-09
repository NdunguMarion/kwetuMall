import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form'
import React from 'react';

const PickupPointForm = ({ show, handleClose, status, pickupPointData, setPickupPointData, createPickupPoint, editPickupPoint }) => {

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{status === 'create' ? 'Create' : 'Edit'} Pickup Point </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={status ==='create'? createPickupPoint : editPickupPoint}>
                        <Form.Group className='mb-3'>
                            <Form.Label>location</Form.Label>
                            <Form.Control
                                value={pickupPointData.location}
                                onChange={(e) => setPickupPointData({ ...pickupPointData, location: e.target.value })}
                                type='text'
                                placeholder='juja'
                            />
                        </Form.Group>
                        <Form.Group className='mb-3'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                value={pickupPointData.name}
                                type='text' placeholder='juja ecomatt'
                                onChange={(e) => setPickupPointData({ ...pickupPointData, name: e.target.value })}
                            />
                        </Form.Group>
                        <button style={styles.button} >Submit</button>
                    </Form>
                </Modal.Body>
            </Modal>
        </>
    )
}
const styles = {
    button: {
        width: '100%',
        padding: '5px',
        // margin: '10px',
        border: '1px solid #fff',
        borderRadius: '5px',
        background: 'black',
        color: '#fff',
    },
}
export default PickupPointForm