const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app=express();
require('dotenv').config();
const port=process.env.PORT||5000;



// middleware
app.use(cors());
app.use(express.json());


console.log(process.env.DB_USER)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygtywwo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });




app.get('/',(req,res)=>{
    res.send('this is working')
})
app.listen(port,()=>{
    console.log(`Genious car server running port ${port}`)
})