const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;



// middleware
app.use(cors());
app.use(express.json());


console.log(process.env.DB_USER)

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ygtywwo.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db('beauty-parlour-db').collection('services');
        const reviewCollection= client.db('beauty-parlour-db').collection('review');
        const addPersonalCollection=client.db('beauty-parlour-db').collection('addPersonal')
        app.get('/', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.limit(3).toArray();
            res.send(services)
        })
        app.get('/services', async (req, res) => {
            const query = {}
            const cursor = serviceCollection.find(query);
            const services = await cursor.toArray();
            res.send(services)
        })
        app.get('/services/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)}
            const service=await serviceCollection.findOne(query);
            res.send(service);
        });
        // review api 
        app.post('/review',async(req,res)=>{
            const review=req.body;
            const result=await reviewCollection.insertOne(review);
            res.send(result);

        })
        app.get('/review', async (req, res) => {

            
            let query = {};
            if(req.query.service){
                query={
                    service:req.query.service
                }
            }
            if(req.query.email){
                query={
                    email:req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review)
        });
        app.put('/review/:id',async(req,res)=>{
            const id=req.params.id;
            const filter ={_id:ObjectId(id)};
            const updatedReview=req.body;
            console.log(updatedReview)
        })

        app.delete('/review/:id',async(req,res)=>{
            const id=req.params.id;
            const query={_id:ObjectId(id)};
            const result=await reviewCollection.deleteOne(query);
            res.send(result)
        })
        app.post('/addPersonalService',async(req,res)=>{
            const addPersonal=req.body;
            const result=await addPersonalCollection.insertOne(addPersonal);
            res.send(result);})
        app.get('/addPersonalService',async(req,res)=>{
            const query={};
            const cursor = addPersonalCollection.find(query);
            const review = await cursor.toArray();
            res.send(review)

        })

    }
    finally {
// some issu t
    }

}

run().catch(err => console.error(err))
app.get('/', (req, res) => {
    res.send('this is working')
})
app.listen(port, () => {
    console.log(`Genious car server running port ${port}`)
})
// some issu testing 