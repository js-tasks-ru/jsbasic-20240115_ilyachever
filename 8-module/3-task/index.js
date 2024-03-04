export default class Cart {
  cartItems = [];

  constructor(cartIcon) {
    this.cartIcon = cartIcon;
  }

  addProduct(product) {
    if (!product) return;

    let cartItem = this.cartItems.find(({product: {id}}) => id === product.id);

    if (cartItem) {
      cartItem.count++;
    } else {
      this.cartItems.push({product, count: 1});
    }

    this.onProductUpdate(cartItem);
  }

  updateProductCount(productId, amount) {
    let cartItem = this.cartItems.find(({product: {id}}) => id === productId);

    if (!cartItem) return;

    switch (amount) {
    case 1:
      cartItem.count++;
      break;
    case -1:
      cartItem.count--;
      if (cartItem.count === 0) {
        this.cartItems.splice(this.cartItems.indexOf(cartItem), 1);
      }
      break;
    }

    this.onProductUpdate(cartItem);
  }

  isEmpty() {
    return !this.cartItems.length;
  }

  getTotalCount() {
    return this.cartItems.reduce((sum, {count}) => sum + count, 0);
  }

  getTotalPrice() {
    return this.cartItems.reduce((sum, {count, product: {price}}) => sum + (count * price), 0);
  }

  onProductUpdate(cartItem) {
    // реализуем в следующей задаче

    this.cartIcon.update(this);
  }
}

