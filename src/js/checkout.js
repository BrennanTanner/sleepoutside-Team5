import { getLocalStorage, loadHeaderFooter, removeLocalStorage } from './utils.js';

import CheckoutProcess from './checkoutProcess';

loadHeaderFooter();

const myCheckout = new CheckoutProcess('so-cart', document.getElementById('orderSummary'));

myCheckout.init();document.querySelector('#zip').addEventListener('blur', myCheckout.calculateOrdertotal.bind(myCheckout));



document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
   e.preventDefault();

   const form = document.forms[0];
   const checkValidation = form.checkValidity();
   console.log(checkValidation)
  form.reportValidity();
  if(checkValidation) {
    myCheckout.checkout();
    localStorage.clear();
  } 
 });