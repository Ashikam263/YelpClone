require('dotenv').config()
const express = require('express')

const app = express();

app.use((req, res, next) => {
  console.log('Middleware');
  next();
});

//get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
  console.log("route handeler ran for middle ware")
  res.status(200).json({
    status: 'success',
    data : {
      restaurants : ['mcdnalads', 'kfc', 'burger king']
    }
  })
});

//get a restaurant
app.get('/api/v1/restaurants/:id', (req, res) => {
  console.log(req.params);
  res.status(200).json({
    status: 'success',
    data : {
      restaurant : 'mcdnalads'
    }
  })
});

//create a restaurant
app.post('/api/v1/restaurants', (req, res) => {
  console.log(req);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});