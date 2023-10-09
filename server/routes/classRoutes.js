import express  from "express";
import {hello, getstudents, getusers} from '../controllers/classControllers.js';

const router = express.Router()

router.get('/class/', hello );

router.get('/class/users',getusers);

router.get('/class/students',getstudents);


export default router;