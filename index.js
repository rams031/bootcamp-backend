const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const secret = 'TOP_SECRET';
const db = require('./db/db')
const app = express()
const port = 5000;

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

mongoose.connect(db, {});

app.use((req, res, next) =>{
  console.log("ROUTE:", req.originalUrl)
  if(req.url === "/users/login"){
      next();
  }else{
      const auth = req.headers.authorization;
      jwt.verify(auth, secret, function(err, decoded){
          if(err){
              res.sendStatus(401);
          }else {
              next();
          }
      });
  }
});


const UserRouter = require('./routes/users')
const ProductRouter = require('./routes/products')

app.use('/users/', UserRouter)
app.use('/products/', ProductRouter)
 
app.get('/', (req, res) => {
    res.send("welcome")
})

app.all('*', (req, res) => {
    res.send('Route Not Found')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


