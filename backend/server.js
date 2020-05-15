const express =require('express');
const cors=require('cors');
const mongoose=require('mongoose');
require('dotenv').config();//to have envirenment variabel in dotenv files

const app=express();//create the express server 
const port=process.env.port || 5000;//SET the port 

//this is the middleware
//un middleware est un logiciel tiers qui crée un réseau d'échange d'informations entre différentes applications informatiques
app.use(cors());
app.use(express.json());//will allow us to parse json cause the server will send and resecve json


const uri=process.env.atlasUri;//go to ,env file to see the link to mongo connection
//const uri="mongodb+srv://kensama:<password>@cluster0-pbt6g.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(uri,{useUnifiedTopology: true,useNewUrlParser : true,useCreateIndex : true});
const connection=mongoose.connection;
connection.once('open',()=>{
    console.log("MongoDB database connection established successfully");
})
//add the files that contains api so we the servercan use them to do crud operations 
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);//localhost:5000/users

//start the server
app.listen(port,()=>{
    console.log('server  is runnig on port : '+port);
});

