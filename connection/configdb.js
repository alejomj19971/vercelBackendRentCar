const mongoose = require('mongoose');
require('dotenv').config()
mongoose.connect(process.env.MONGODB_URI)
    .then(()=>console.log("Conectado a la base de datos de MongoDB Atlas"))
    .catch(()=> console.error("Error de conexión a la base de datos") )