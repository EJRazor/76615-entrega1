const fs = require('fs').promises;
const path = require('path');

class CartManager {
  constructor() {
    this.filePath = path.join(__dirname, '../data/carts.json');
  }

  async getCarts() {
    const data = await fs.readFile(this.filePath, 'utf-8');
    return JSON.parse(data);
  }

  async getCartById(id) {
    const carts = await this.getCarts();
    return carts.find(c => c.id === id);
  }

  async createCart() {
    const carts = await this.getCarts();
    const newId = carts.length ? carts[carts.length - 1].id + 1 : 1;
    const newCart = { id: newId, products: [] };
    carts.push(newCart);
    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return newCart;
  }

  async addProductToCart(cid, pid) {
    const carts = await this.getCarts();
    const cart = carts.find(c => c.id === cid);
    if (!cart) return null;

    const existingProduct = cart.products.find(p => p.product === pid);
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      cart.products.push({ product: pid, quantity: 1 });
    }

    await fs.writeFile(this.filePath, JSON.stringify(carts, null, 2));
    return cart;
  }

  async deleteCart(id) {
  const carts = await this.getCarts();
  const filtered = carts.filter(c => c.id !== id);
  if (filtered.length === carts.length) return null; // No cart was deleted
  await fs.writeFile(this.filePath, JSON.stringify(filtered, null, 2));
  return true;
  }
  
}

module.exports = CartManager;