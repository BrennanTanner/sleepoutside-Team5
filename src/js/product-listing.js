import ProductData from './productData.js';
import ProductList from './productList.js';
import { loadHeaderFooter, getParam } from './utils.js';

loadHeaderFooter();

let category = getParam('category');
const dataSource = new ProductData();
const listElement = document.querySelector('.product-list');

const myList = new ProductList(category, dataSource, listElement);

myList.init();
