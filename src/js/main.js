import ExternalServices from './externalServices';
import ProductList from './productList.js';
import Alert from './alert.js';
import { loadHeaderFooter } from './utils.js';

loadHeaderFooter();

// first create an instance of our ProductData class.
const dataSource = new ExternalServices('tents');
// then get the element we want the product list to render in
const listElement = document.querySelector('.product-list');
// then create an instance of our ProductList class and send it the correct information.
const myList = new ProductList('tents', dataSource, listElement);
// finally call the init method to show our products
myList.init();

const alertItem = new Alert(document.querySelector('main'));
alertItem.init();