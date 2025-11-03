const express = require('express');
const app = express();
const PORT = 8080;

const productsRouter = require('./src/routes/products.router');
const cartsRouter = require('./src/routes/carts.router');

app.use(express.json());
app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);

app.listen(PORT, () => {
 console.log(`Servidor escuchando en puerto ${PORT}`);
});