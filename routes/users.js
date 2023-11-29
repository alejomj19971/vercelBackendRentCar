const express = require("express");
const Users = require("../models/users");
const router = express.Router();


router.post("/registrar", async (req, res) => {
    let message = "";
    let error = false;
    await Users.findOne({ username: req.body.username })
      .then((username) => {
        if (username === null) {
          const user = new Users(req.body);
          user.save();
          message = "Usuario registrado exitosamente...";
          error = false;
          res.json({ message: message, error: error });
        } else {
          message = "El nombre usuario ya existe. Inténtelo con otro";
          error = true;
          res.json({ message: message, error: error });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });

  router.patch("/restablecercontrasena",async (req, res) => {
    let message = "";
    let error = false;
    await Users.findOneAndUpdate(
        { username: req.body.username, reservword: req.body.reservword },
        { password: req.body.password }
      ).then((user) => {
        if (user) {
          error=false
          res.json({ message: "contraseña actualizada con exito" ,error:error});
        } else {
          error=true
          res.json({
            message: "usuario o palabra reservada no valido, por favor verifique",
          error:error});
        }
      });
});

 

 
  
  router.post("/login", async (req, res) => {
    let error=false
    await Users.findOne({ username: req.body.username,password:req.body.password }).then((usuario) => {
      if (usuario!=null) {
        res.json(usuario);
       
      } else {
        error=true
        res.json({ message: "Usuario o contraseña invalidos",error:error });
      }
    });
  });

  router.get("/buscarUsuario/:username",async(req,res)=>{
  await Users.findOne({username:req.params.username})
  .then((usuario)=>{
      if(usuario){
        res.json({message:"Usuario encontrado",error:false})
      }else{
       res.json({message:"Usuario No encontrado",error:true})
      }
    });

  });


  
module.exports = router;
