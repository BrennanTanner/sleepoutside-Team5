import { loadHeaderFooter } from './utils.js';

import CheckoutProcess from './checkoutProcess';

loadHeaderFooter();

const myCheckout = new CheckoutProcess(
  'so-cart',
  document.getElementById('orderSummary')
);

myCheckout.init();
document
  .querySelector('#zip')
  .addEventListener('blur', myCheckout.calculateOrderTotal.bind(myCheckout));

document.querySelector('#checkoutSubmit')
.addEventListener('click', (e) => {
  e.preventDefault();
  const myForm = document.forms[0];
  const chk_status = myForm.checkValidity();
  myForm.reportValidity();
  if(chk_status) 
    myCheckout.checkout();
});
