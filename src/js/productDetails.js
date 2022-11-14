import {
  setLocalStorage,
  getLocalStorage,
  loadHeaderFooter,
  getLocalStorageCount,
} from './utils.js';

loadHeaderFooter();
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }
  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    document.querySelector('main').innerHTML = this.renderProductDetails();
    // add listener to Add to Cart button
    document
      .getElementById('addToCart')
      .addEventListener('click', this.addToCart.bind(this));
  }
  addToCart() {
    // to fix the cart we need to get anything that is in the cart already.
    let cartContents = getLocalStorage('so-cart');
    //check to see if there was anything there
    if (!cartContents) {
      cartContents = [];
    }

    this.product['qty'] = 1;

    if (cartContents.length === 0) {
      cartContents.push(this.product);
    } else {
      if (cartContents.some((e) => e.Id === this.product.Id)) {
        const i = cartContents.findIndex((e) => e.Id === this.product.Id);
        if (i > -1) {
          console.log(cartContents[i].qty)
          cartContents[i].qty += 1
          cartContents[i].FinalPrice += this.product.FinalPrice
        } 
      } else {
        cartContents.push(this.product)
      }
    }

    console.log(cartContents);

    setLocalStorage('so-cart', cartContents);

    // location.reload()

    const cartSubscript = (count) => `<sup class="cart-number">${count}</sup>`;
    let localContent = JSON.parse(localStorage.getItem('so-cart'));

    if (localContent.length > 0) {
      document.querySelector('.cart-count').innerHTML = cartSubscript(
        getLocalStorageCount(localContent)
      );
    }

    document.querySelector('.cart-count').animate(
      [
        // keyframes
        { transform: 'translateY(0px)' },
        { transform: 'translateY(-5px)' },
        { transform: 'translateY(-10px)' },
        { transform: 'translateY(0px)' },
      ],
      {
        // timing options
        duration: 1000,
        iterations: 1,
      }
    );
    // alert('Item added to cart!');
  }

  renderProductDetails() {
    return `
    <p>${this.product.Category}</p>
    <section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.product.Images.PrimaryLarge}"
      alt="${this.product.NameWithoutBrand}"
    />
    <p class="product-card__discount">$${this.product.SuggestedRetailPrice}</p>
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`;
  }
}
