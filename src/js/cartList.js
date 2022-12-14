import { renderListWithTemplate, getLocalStorage, getLocalStorageCount} from './utils.js';

export default class CartList {
  constructor (key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    
    const list = getLocalStorage(this.key);
    this.renderList(list);
    let count = getLocalStorageCount(list);
    document.getElementById('cartTotal').innerHTML = `Total: ${count}`;
  }

  prepareTemplate(template, product) {
    
    template.querySelector('.cart-card__image img').src =  product.Images.PrimaryMedium;
    template.querySelector('.cart-card__image img').alt += product.Name;
    template.querySelector('.card__name').textContent = product.Name;
    template.querySelector('.cart-card__color').textContent = product.Colors[0].ColorName;
    template.querySelector('.cart-card__price').textContent += product.FinalPrice.toFixed(2); 
    template.querySelector('.cart-card__quantity').textContent = `qty: ${product.qty}`; 
    template.querySelector('.removeFromCart').setAttribute('data-id' , product.Id);
    location.reload
    return template;
  }
  
  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('cart-card-template');
    renderListWithTemplate(template, this.listElement, list, this.prepareTemplate);
    
  }
}
