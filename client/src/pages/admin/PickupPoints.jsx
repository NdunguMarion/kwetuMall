import { useState, useEffect } from 'react';
import React from 'react';
import Sidebar from './Sidebar';
import Table from 'react-bootstrap/Table';
import PickupPointForm from '../../components/PickupPointForm';
import axios from 'axios';

const PickupPoints = () => {
    const [status, setStatus] = useState('create');
    const [show, setShow] = useState(false);
    const [pickupPoints, setPickupPoints] = useState([]);
    const [pickupPointData, setPickupPointData] = useState({
        location: '',
        name: ''
    });


    const handleClose = () => {
        setShow(false)
        setStatus('create');
        setPickupPointData({ location: '', name: '' })
    }

    const handleShow = () => setShow(true)

    const getPickupPoints = async () => {
        const { data } = await axios.get('http://localhost:5000/pickup-points')
        console.log(data)
        if (data.message === 'Fetched pickup points!') {
            setPickupPoints(data.data);
        }
    }

    const createPickupPoint = async (e) => {
        e.preventDefault();
        const { data } = await axios.post('http://localhost:5000/pickup-points/create', pickupPointData);
        console.log(data);
        if (data.message === ' Created pickup point!') {
            setPickupPoints([...pickupPoints, data.data])
            handleClose()
        }
    };
    const handleEdit = async(id)=>{
        setStatus('edit')
        const{data}=await axios.get(`http://localhost:5000/pickup-points/${id}`);
        console.log(data)
        if (data.message==='Fetched pickup point!'){
            setPickupPointData(data.data);
            handleShow();
        }
    }
    const editPickupPoint = async(e)=>{
        e.preventDefault();
        const{data}=await axios.post(`http://localhost:5000/pickup-points/update/${pickupPointData._id}`, pickupPointData);
        console.log(data)
        if (data.message==='Updated pickup point!'){
            let updatedPickupPoints=pickupPoints.map((pickupPoint)=>{
                if (pickupPoint._id === pickupPointData._id){
                    return data.data
                }else{
                    return pickupPoint
                }
            });
            setPickupPoints(updatedPickupPoints);
            handleClose();
        }
    }
    const deletePickUpPoint = async (id) => {
        const { data } = await axios.post(`http://localhost:5000/pickup-points/delete/${id}`);
        console.log(data);
        if (data.message === 'Deleted pickup points!') {
           let filteredpickupPoints =pickupPoints.filter((pickupPoint) => {
                return pickupPoint._id !== id
            }) 
            setPickupPoints(filteredpickupPoints); 
        }
    }

    useEffect(() => {
        getPickupPoints()
    }, []);


    return (
        <div>
            <Sidebar />
            <div className='adminContainer'>
                <h1>Pickup Point</h1>
                <button style={styles.createButton} onClick={() => {
                    setStatus('create');
                    handleShow();
                }}
                >Create Pickup Point</button>
                <Table striped bordered hover >
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Location</th>
                            <th>Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            pickupPoints.map((pickupPoint) => {
                                return (
                                    <tr key={pickupPoint._id}>
                                        <td>{pickupPoint._id}</td>
                                        <td>{pickupPoint.location}</td>
                                        <td>{pickupPoint.name}</td>
                                        <td>
                                            <button style={styles.button} onClick={()=>handleEdit(pickupPoint._id)} >Edit </button>
                                            <button style={styles.button} onClick={()=>deletePickUpPoint(pickupPoint._id)}>Delete </button>
                                        </td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </Table>
                <PickupPointForm
                    show={show}
                    handleClose={handleClose}
                    status={status}
                    pickupPointData={pickupPointData}
                    setPickupPointData={setPickupPointData}
                    createPickupPoint={createPickupPoint}
                    editPickupPoint={editPickupPoint}
                />


            </div>
        </div>
    )
}
const styles = {
    createButton: {
        paddingLeft: '5px',
        paddingRight: '5px',
        margin: '2px',
        border: '1px solid #fff',
        borderRadius: '5px',
        background: 'black',
        color: '#fff',
        width: '200px',
    },
    button: {
        // padding: '5px',
        paddingLeft: '5px',
        paddingRight: '5px',
        margin: '2px',
        border: '1px solid #fff',
        borderRadius: '5px',
        background: 'black',
        color: '#fff',
    },
}
export default PickupPoints

//map over the pickup points, return  the tr below