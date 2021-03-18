const express = require("express");

const Carta = require("../models/Carta");
const router = express.Router();

// GET CARTA
router.get("/carta", (req, res, next) => {
  Carta.find()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.error(err);
      res.json(err);
    });
});

// POST NEW PRODUCT
router.post("/carta/nuevo", (req, res, next) => {

  const {productName, price} = req.body;
 
  if (!productName || !price) {
    res.send({ message: "Tienes que cumplimentar ambos campos" });
    return;
  }

  Carta.create({
    productName: productName,
    price: price
  })
    .then(result => {
      res.json(result);
    })
    .catch(err => {
      res.json(err);
    });
});

// GET EDIT PRODUCTO
router.get('/carta/editar/:id', (req, res, next) => {
  const { id } = req.params;
  Carta.findById(id)
  .then(result => {
    res.status(200).json(result)
  })
  .catch(err => res.status(500).json({ message: 'Producto no encontrado'}))
})

// PUT EDIT PRODUCTO
router.put('/carta/editar/:id', (req, res, next) => {
  const { id } = req.params;
  Carta.findByIdAndUpdate(id, req.body)
  .then(() => {
    res.status(200).json({ message: `Producto ${id} no encontrado` })
  })
  .catch(err => {
    res.status(500).json({ message:'Algo ha salido mal' })
  })
})

router.delete('/carta/borrar/:id', (req, res, next) => {
  const { id } = req.params;
  Carta.findByIdAndDelete(id)
  .then(() => res.status(200).json({message: `Producto ${id} borrado`}))
  .catch(err => res.status(500).json({ message: 'Algo ha salido mal'}))
})


module.exports = router;
