const express = require("express");
const Rent = require("../models/rent")
const router = express.Router();

router.post("/rentarcar", async (req, res) => {
    let message = "";
    let error = false;
    await Rent.findOne({ rentnumber: req.body.rentnumber })
        .then((rents) => {
          if (rents === null) {
            const renta = new Rent(req.body);
            renta.save();
            error=false;
            res.json({ message: "Renta registrada con exito" ,error:error});
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







  router.get("/listarentnumber", async (req, res) => {
      await Rent.find({ status: true })
      .then((rentas) => {
        if (rentas.length > 0) {
          res.json(rentas);
        } else {
          res.json({ message: "No existen vehiculos rentados" });
        }
      });
    });

    router.get("/listarentnumber/:platenumber", async (req, res) => {
      console.log(req.params)
      await Rent.findOne({ platenumber: req.params.platenumber })
      .then((rentas) => {
        if (rentas!=null) {
          res.json(rentas);
        } else {
          res.json({ message: "No existen vehiculos rentados" });
        }
      });
    });


    module.exports = router;