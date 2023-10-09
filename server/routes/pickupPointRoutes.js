import  express  from 'express';
import {getPickUpPoint, getPickUpPoints, createPickUpPoint, updatePickUpPoint, deletePickUpPoint}from '../controllers/pickupPointController.js';

const router = express.Router();

router.get('/pickup-points',getPickUpPoints);
router.get('/pickup-points/:id',getPickUpPoint);
router.post('/pickup-points/create',createPickUpPoint);
router.post('/pickup-points/update/:id',updatePickUpPoint);
router.post('/pickup-points/delete/:id',deletePickUpPoint);

export default router;