import { loadHeaderFooter } from './utils.js';

import CheckoutProcess from './checkoutProcess';

loadHeaderFooter();

const myCheckout = new CheckoutProcess(
  'so-cart',
  document.getElementById('orderSummary')
);
console.log(myCheckout);
myCheckout.init();
document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector('#checkoutSubmit').addEventListener('click', (e) => {
  e.preventDefault();

  const form = document.forms[0];
  const checkValidation = form.checkValidity();
  form.reportValidity();
  myCheckout.checkout()
  if (checkValidation) {
    myCheckout.checkout();
  }
});
