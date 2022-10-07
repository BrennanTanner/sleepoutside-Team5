import ProductData from './productData.js';
import ProductDetails from './productDetails.js';
import { getParam } from './utils.js';

const dataSource = new ProductData('tents');
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();

function getLocalStorageCount() {
  const item = localStorage.getItem('so-cart');
  let itemList = [item];
  const countedItems = itemList.length;
  return countedItems;
}

const cartSubscript = (count) => `<sup class="cart-number">${count}</sup>`;

document.querySelector('.cart-count').innerHTML = cartSubscript(
  getLocalStorageCount()
);
