require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors')
const auth = require('./routes/auth');
const user = require('./routes/user');
const category = require('./routes/category');
const product = require('./routes/product');
const order = require('./routes/order');
const payment = require('./routes/payment');
const path = require('path')
const app = express();

//bodyparser middleware
app.use(bodyparser.urlencoded({'extended':false}));
app.use(bodyparser.json());

//cookieparser middleware
app.use(cookieParser())

//cors middleware
app.use(cors())

//Mongodb connect
mongoose.connect(process.env.MONGODB_URI ||process.env.DATABASE,{
    useCreateIndex:true, 
    useNewUrlParser:true, 
    useUnifiedTopology:true})
    .then(()=>console.log("Connected to DB")).catch(err => console.log(err));

//set routes to api
app.use('/api/auth',auth);
app.use('/api/user',user);
app.use('/api/category',category);
app.use('/api/product',product);
app.use('/api/order',order);
app.use('/api/payment',payment);


port=process.env.PORT||8000;

if(process.env.NODE_ENV === 'production'){
    app.use(express.static(path.join(__dirname, '/frontend/build')))
}

app.listen(port,()=>{
    console.log(`Port ${port} is running`);
})