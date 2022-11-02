import { setLocalStorage, getLocalStorage, loadHeaderFooter } from './utils.js';

loadHeaderFooter();
export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
    this.imageSize = '';
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);

    // add listener to Add to Cart button

    if (window.screen.width < 640) {
      this.imageSize = this.product.Images.PrimaryMedium;
    } else if (window.screen.width <= 896) {
      this.imageSize = this.product.Images.PrimaryLarge;
    } else {
      this.imageSize = this.product.Images.PrimaryExtraLarge;
    }

    document.querySelector('main').innerHTML = this.renderProductDetails();

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
    // then add the current product to the list
    cartContents.push(this.product);

    setLocalStorage('so-cart', cartContents);
    location.reload();
    alert('Item added to cart!');
  }

  renderProductDetails() {
    return `
    <p>${this.product.Category}</p>
    <section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.imageSize}"
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
