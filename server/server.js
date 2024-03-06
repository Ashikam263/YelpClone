require('dotenv').config()
const e = require('express');
const express = require('express')
const morgan = require('morgan');
const db = require('./db');
const app = express();
app.use(express.json());

//get all restaurants
app.get('/api/v1/restaurants', async (req, res) => {

  try {
    const results = await  db.query('SELECT * FROM restaurants');

    console.log(results)
    res.status(200).json({
      status: 'success',
      results: results.rows.length,
      data : {
        restaurants : results.rows
      }
    })
  } catch (err) {
    console.log(err); 
  }

});

//get a restaurant
app.get('/api/v1/restaurants/:id', async (req, res) => {
  console.log(req.params.id);

  try {
    const results = await db.query('SELECT * FROM restaurants WHERE id = $1', [req.params.id]);

    // select * from restaurants where id = req.params.id 
    res.status(200).json({
      status: 'success',
      data : {
        restaurant : results.rows[0],
      },
    })
    console.log(results.rows[0])
  } catch (err) {
    console.log(err);
  }

});

//create a restaurant
app.post('/api/v1/restaurants', async (req, res) => {
  console.log(req.body);

  try {
     const results = await db.query('INSERT INTO restaurants (name, location, price_range) values ($1, $2, $3) returning *', [req.body.name, req.body.location, req.body.price_range]);
     res.status(201).json({
      status: 'success',
      data : {
        restaurant : results.rows[0]
      }
    })
    } catch (err) {
    console.log(err);
  }


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