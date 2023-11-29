const express = require('express')
require('dotenv').config()
const app = express()
const cors = require('cors')
const configdb = require('./connection/configdb')
//PORT
const port = process.env.PORT || 4500
const usersRoutes = require("./routes/users");
const carsRoutes = require("./routes/cars");
const rentRoutes = require("./routes/rents")
const returnsRoutes = require("./routes/returns");

//middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors());
app.use("/api/users", usersRoutes);
app.use("/api/cars", carsRoutes);
app.use("/api/rents", rentRoutes);
app.use("/api/returns", returnsRoutes);



app.listen(port, ()=>{
    console.log('listening on port', port);
})