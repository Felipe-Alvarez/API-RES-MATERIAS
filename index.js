const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();

//MIDE
app.use(morgan('dev'))
app.use(express.json())

//ROUT
app.use('/mat', require('./routes/materias'));


app.get('/', (req, res) => {
  res.send('MATERIAS = TRUE')
});

app.set('PORT', 25001);

app.listen(app.get('PORT'), () => {
  console.log(`SERVER = TRUE ${app.get('PORT')}`)
});
