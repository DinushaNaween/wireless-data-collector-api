const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const passport = require('passport');

const nodeRoutes = require('./routes/node');

mongoose.connect('mongodb://admin:admin12345@ds019756.mlab.com:19756/wireless-data-collector');
// mongoose.connect('mongodb://localhost:27017/ClzMate');

mongoose.Promise = global.Promise;
 
app.use(morgan('dev'));  
app.use(bodyparser.urlencoded({extended:false})); 
app.use(bodyparser.json());  
 
app.use(passport.initialize()); 
app.use(passport.session());  

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin","*");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){ 
        res.header('Access-Control-Allow-Methods','PUT, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});

app.get('/', (req, res, next) => {
    console.log("Hello Server");
    res.status(200).json({
        state: true
    })
})

app.use('/node', nodeRoutes);

app.use((req, res, next)=>{
    const error = new Error('Not Found');
    error.status(404);
    next(error);
});

app.use((error, req, res, next)=>{  
    res.status(error.status || 500);
    res.json({ 
        error: {
            message: error.message
        }
    });
}); 

module.exports = app;