import { loadHeaderFooter } from './utils.js';

import CheckoutProcess from './checkoutProcess';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', document.getElementById('orderSummary'));

myCheckout.init();

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
   e.preventDefault();
 
   myCheckout.checkout();
 });