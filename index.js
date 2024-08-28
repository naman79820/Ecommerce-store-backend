const express = require('express');
const cors = require('cors');
const app = express();
const userRoutes = require('./src/routes/user.route');
const categoryRoutes = require('./src/routes/category.route');

const env = require('dotenv');
const mongoose = require('mongoose');    
env.config();
app.use(express.json());
app.use(cors());

// Database connection
mongoose.connect('mongodb+srv://naman79820:harley%40789@ecommerce-store.j43z2.mongodb.net/?retryWrites=true&w=majority&appName=Ecommerce-Store')
 
.then(() => console.log('Database Connected!'))
  .catch((error) => console.log('Database connection error:', error));

// Middleware


// Routes
app.use('/api', userRoutes);
app.use('/api', categoryRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!');
});


// Server
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`);
});
