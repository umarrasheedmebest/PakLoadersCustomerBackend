const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')

const fs= require('fs')
app.use(express.json());

const port = process.env.PORT || 5000;


morgan.token('body', (req)=> JSON.stringify(req.body))
morgan.token('id', (req)=> req.params.id);
morgan.token('date', (req)=> new Date());

let accesLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('"DATE":date  "URL":url"HTTP/:http-version" "REQUEST METHOD":method "STATUS CODE":status \
 "CONTENT LENGTH":res[content-length] "RESPONSE TIME":response-time ms "REFERRER":referrer \
"USER AGENT":user-agent "BODY":body',{stream: accesLogStream}))

// routes here

const authRoute = require('./src/Routes/auth.routes')

app.get('/',(req,res)=>{
    res.json({message: "Working"});
});


// middlewares

app.use('/auth', authRoute);





app.listen(port, ()=>{
    console.log('Server is listening at port '+ port);
});