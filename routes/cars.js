const express = require("express");
const Car = require("../models/car");
const router = express.Router();


router.post("/crearcar",async (req, res) => {
  let message = "";
  let error = false;
    await Car.findOne({ platenumber: req.body.platenumber })
      .then((cars) => {
        if (cars === null) {
          const carro = new Car(req.body);
          carro.save();
          error=false;
          res.json({ message: "Vehiculo registrado con exito" ,error:error});
        } else {
          error=true
          res.json({
            message: "El vehiculo ya existe. Intenta con una placa nueva",
            error:error
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.get("/listarcar",async (req, res) => {
    await Car.find().then((carros) => {
      console.log(carros);
      if (carros.length > 0) {
        res.json(carros);
      } else {
        res.json({ message: "No existen registros" });
      }
    });
  });

  router.get("/listarcar/disponibles",async (req, res) => {
    await Car.find({state:true}).then((carros) => {
      console.log(carros);
      if (carros.length > 0) {
        res.json(carros);
      } else {
        res.json({ message: "No existen registros" });
      }
    });
  });

  router.get("/listarcar/nodisponibles",async (req, res) => {
    await Car.find({state:false}).then((carros) => {
      console.log(carros);
      if (carros.length > 0) {
        res.json(carros);
      } else {
        res.json({ message: "No existen registros" });
      }
    });
  });


  router.put("/updatecar", async (req, res) => {
    let message = "";
    let error = false;
    await Car.findOneAndUpdate(
      { platenumber: req.body.platenumber },
      {
        brand: req.body.brand,
        state: req.body.state,
        dailyvalue: req.body.dailyvalue,
        created:req.body.created
      }
    ).then((car) => {
      if (car) {
        error=false;
        res.json({ message: "Vehiculo Actualizado con exito" ,error:error});
      } else {
        error=true
        res.json({ message: "numero de placa no valido, por favor verifique",error:error });
      }
    });
  });

  router.delete("/deletecar/:platenumber", async (req, res) => {
    
    await Car.findOneAndDelete({ platenumber: req.params.platenumber }).then(
      (car) => {
        if (car) {
          res.json({ message: "Vehiculo borrado con exito" });
        } else {
          res.json({ message: "numero de placa no valido, por favor verifique",placa:`${req.body.platenumber}` });
        }
      }
    );
  });




module.exports = router;
