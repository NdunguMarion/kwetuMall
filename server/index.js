import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import classRoutes from './routes/classRoutes.js'
import mongoose from 'mongoose';
import categoryRoutes from './routes/categoryRoutes.js';
import pickUpPointRoutes from './routes/pickupPointRoutes.js';
import productRoutes from './routes/productRoutes.js';
import userAuth from './routes/auth/userAuth.js';
import cartRoutes from './routes/cartRoutes.js'


const app = express();
const PORT = 5000;
app.use(cors());
app.use(bodyParser.json());
app.use (express.static('uploads'))

app.use('/', classRoutes);
app.use('/', productRoutes)
app.use ('/',categoryRoutes);
app.use('/',pickUpPointRoutes);
app.use('/',userAuth);
app.use('/',cartRoutes);

///POST->used when receiving data from a frontend ,
///PUT->used when updating two databases,
/// DELETE-> used when deleting from a database
const mongoURI= 'mongodb+srv://ndungumarion:'+encodeURIComponent('AwQLeJKxROGeAtUL')+'@cluster0.oua1rsm.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(mongoURI)
        .then(()=>console.log('connected to mongo db'))
        .catch((err)=> console.log(err))
app.listen(PORT, ()=>{
    console.log("server is listening on PORT: " + PORT)
});