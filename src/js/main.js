import productData from './productData';
import productList from './productList';

const dataSource = new productData('tents');

const listElement = document.querySelector('.product-list');

const myList = new productList('tents', dataSource, listElement);

myList.init();