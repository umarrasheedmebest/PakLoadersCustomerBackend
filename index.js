const express = require('express');
const app = express();
const morgan = require('morgan')
const path = require('path')
const fs= require('fs')
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser');
const port = process.env.PORT || 3000;
dotenv.config();
// logs
morgan.token('body', (req)=> JSON.stringify(req.body))
morgan.token('id', (req)=> req.params.id);
morgan.token('date', (req)=> new Date());
let accesLogStream = fs.createWriteStream(path.join(__dirname,'access.log'),{flags:'a'})
app.use(morgan('"DATE":date  "URL":url"HTTP/:http-version" "REQUEST METHOD":method "STATUS CODE":status \
 "CONTENT LENGTH":res[content-length] "RESPONSE TIME":response-time ms "REFERRER":referrer \
"USER AGENT":user-agent "BODY":body',{stream: accesLogStream}))
// routes here
const authRoute = require('./src/Routes/auth.routes')
const userRoute = require('./src/Routes/user.routes')
const imageRoute = require('./src/Routes/image.routes')
const postRoute = require('./src/Routes/post.routes')
const bidsRoute = require('./src/Routes/bids.routes')
const ridesRoute = require('./src/Routes/rides.routes')

app.get('/',(req,res)=>{
    res.json({message: "Working Node JS!"});
});
// middlewares
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "/Images")))
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/images', imageRoute);
app.use('/post', postRoute);
app.use('/bids', bidsRoute);
app.use('/rides', ridesRoute);


// Error Handlers
app.use((req, res, next)=>{
    const err = new Error("Not found");
    err.status = 404;
    next(err);
});
app.use((err, req, res, next)=>{
    if(err.isJoi) err.status = 422;
    res.status(err.status || 500);
    res.send({
        error: {
            status : err.status || 500,
            message : err.message
        }
    });
})




app.listen(port, ()=>{
    console.log('Server is listening at port '+ port);
});