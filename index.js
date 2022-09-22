const express = require('express');
const app = express();
app.use(express.json());

const port = process.env.PORT || 5000;



// routes here

const authRoute = require('./src/Routes/auth.routes')

// middlewares

app.use('/auth', authRoute);





app.listen(port, ()=>{
    console.log('Server is listening at port '+ port);
});