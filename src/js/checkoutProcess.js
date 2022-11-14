import { getLocalStorage, setLocalStorage, removeAllAlerts, alertMessage } from './utils';
import ExternalServices from './externalServices';

const services = new ExternalServices();

function formDataToJSON(formElement) {
  const formData = new FormData(formElement),
    convertedJSON = {};
  formData.forEach(function (value, key) {
    convertedJSON[key] = value;
  });

  return convertedJSON;
}

function packageItems(items) {
  const simplifiedItems = items.map((item) => {
    console.log(item);
    return {
      id: item.Id,
      price: item.FinalPrice,
      name: item.Name,
      quantity: 1,
    };
  });
  return simplifiedItems;
}

export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.subTotal = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);

    this.calculateItemSummary();
  }

  calculateItemSummary() {
    this.itemTotal = this.list.length;
    let total = 0;
    this.list.forEach((element) => {
      total += element.qty
      this.subTotal += element.FinalPrice
    })
    this.itemTotal = total;


    document.getElementById(
      'orderSummary'
    ).innerHTML = `<p>Item Subtotal (${this.itemTotal})</p>
            <p>$${this.subTotal.toFixed(2)}</p>`;
    this.calculateOrderTotal();
  }

  calculateOrderTotal() {
    const zipField = document.getElementById('zip');

    zipField.addEventListener('blur', () => {
      if (zipField.checkValidity() == true) {
        this.list.forEach((item, i) => {
          if (i == 0) {
            this.shipping += 10;
          } else {
            this.shipping += 2;
          }

          this.tax = parseFloat(this.subTotal * 0.06).toFixed(2);

          this.orderTotal = (parseFloat(this.subTotal) + parseFloat(this.tax) + parseFloat(this.shipping)).toFixed(2);
        });
        document.getElementById(
          'orderSummary'
        ).innerHTML += this.displayOrderTotals();
      }
    });
  }

  displayOrderTotals() {
    return `<p>Shipping Estimate $${this.shipping}</p>
            <p>Tax $${this.tax}</p>
            <p>Order Total $${this.orderTotal} </p>`;
  }

  async checkout() {
    const formElement = document.forms['checkout'];

    const json = formDataToJSON(formElement);

    json.orderDate = new Date();
    json.items = packageItems(this.list);
    json.orderTotal = this.orderTotal;
    json.shipping = this.shipping;
    json.tax = this.tax;
    console.log(json);
    try {
      const res = await services.checkout(json);
      console.log(res);
      setLocalStorage('so-cart', []);
      location.assign('/checkout/checkedout.html');
    } catch (err) {
      removeAllAlerts();
      for(let message in err.message) {
         alertMessage(err.message[message]);
      }
      throw {name: 'checkout-error', message: err}
    }
  }
}

