import ExternalServices from './externalServices';
import ProductDetails from './productDetails.js';
import { getParam } from './utils.js';

const dataSource = new ExternalServices('tents');
const productId = getParam('product');

const product = new ProductDetails(productId, dataSource);
product.init();


 