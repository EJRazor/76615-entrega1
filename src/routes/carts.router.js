const express = require('express');
const router = express.Router();
const CartManager = require('../managers/CartManager');
const manager = new CartManager();

router.post('/', async (req, res) => {
  const newCart = await manager.createCart();
  res.status(201).json(newCart);
});

router.get('/', async (req, res) => {
  const products = await manager.getCarts();
  res.json(products);
});

router.get('/:cid', async (req, res) => {
  const cart = await manager.getCartById(parseInt(req.params.cid));
  cart ? res.json(cart.products) : res.status(404).send('Carrito no encontrado');
});

router.post('/:cid/product/:pid', async (req, res) => {
  const updatedCart = await manager.addProductToCart(
    parseInt(req.params.cid),
    parseInt(req.params.pid)
  );
  updatedCart ? res.json(updatedCart) : res.status(404).send('Carrito no encontrado');
});

router.delete('/:cid', async (req, res) => {
  const result = await manager.deleteCart(parseInt(req.params.cid));
  res.json(result);
});

module.exports = router;