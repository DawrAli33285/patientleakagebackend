const express = require('express');
const multer = require('multer');
const csv = require('csv-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const userModel = require('./user');
const axios = require('axios');
const authRoutes = require('./routes/auth');
const connection = require('./connection/connection');
const footDataRoutes=require('./routes/footdata')
const { Parser } = require('json2csv');

const app = express();
require('dotenv').config()

const PORT = process.env.PORT || 3001;

connection;


app.use(cors());
app.use(express.json());
app.use("/api",authRoutes);
app.use("/api",footDataRoutes)




app.listen(PORT, () => {
 
  console.log(`Server running on http://localhost:${PORT}`);
 
});

