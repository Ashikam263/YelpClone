require('dotenv').config()
const e = require('express');
const express = require('express')
const morgan = require('morgan');

const app = express();
app.use(express.json());

//get all restaurants
app.get('/api/v1/restaurants', (req, res) => {
  console.log("route handeler ran")
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
  console.log(req.body);

  res.status(201).json({
    status: 'success',
    data : {
      restaurant : 'mcdnalads'
    }
  })
});

//update a restaurant
app.put('/api/v1/restaurants/:id', (req, res) => {
  console.log(req.params.id);
  console.log(req.body);

  res.status(200).json({
    status: 'success',
    data : {
      restaurant : 'mcdnalads'
    }
  })
}); 

//delete a restaurant
app.delete('/api/v1/restaurants/:id', (req, res) => {
  console.log(req.params.id);

  res.status(204).json({
    status: 'success',
    data : null
  })
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});