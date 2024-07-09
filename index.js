
const express = require('express')
const server = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require('cors');

const productsRouter = require('./routes/Products');
const brandRouter = require('./routes/Brand')
const categoryRouter = require('./routes/Category')
const userRouter = require('./routes/User')
const authRouter = require('./routes/Auth');
const cartRouter = require('./routes/Cart')
const orderRouter = require('./routes/Order')

dotenv.config();

mongoose.set("strictQuery", false);
mongoose.connect(
    process.env.MONGO_URL
).then(()=>
    
    console.log("database connect successfully")).catch((err)=>{
        console.log(err);
    })

server.use(cors());
server.use(express.json());


server.use('/products', productsRouter.router)
server.use('/brands', brandRouter.router)
server.use('/categories', categoryRouter.router)
server.use('/users', userRouter.router)
server.use('/auth', authRouter.router)
server.use('/cart', cartRouter.router)
server.use('/orders', orderRouter.router)

server.get('/', (req, res)=>{
    res.json({status: 'success'});
})

// server.post('/products', createProduct)

server.listen(8080, ()=>{
    console.log('server started successfully')
})