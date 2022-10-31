import { renderListWithTemplate, getLocalStorage, setLocalStorage } from './utils.js';

export default class CartList {
  constructor(key, listElement) {
    this.key = key;
    this.listElement = listElement;
  }

  async init() {
    const list = getLocalStorage(this.key);
    this.renderList(list);
  }

  prepareTemplate(template, product) {
    let cart = getLocalStorage('so-cart');

    let quanity = 0;

    console.log(product)

    // cart.forEach((element) => {
    //   if(element.Id === product.Id) {
    //     console.log('it does')
    //   } else {
    //     console.log('it does not')
    //   }
    // })


    template.querySelector('.cart-card__image img').src =
      product.Images.PrimaryMedium;
    template.querySelector('.cart-card__image img').alt += product.Name;
    template.querySelector('.card__name').textContent = product.Name;
    template.querySelector('.cart-card__color').textContent =
      product.Colors[0].ColorName;
    template.querySelector('.cart-card__price').textContent +=
      product.FinalPrice;
      
    // let quanity = 0;
    let quanityLabel = template.querySelector('.cart-card__quantity');
    template
      .querySelector('.removeFromCart')
      .setAttribute('data-id', product.Id);

      

      for(let i = 0; i < cart.length; i++) {
        if (cart[i].Id === product.Id) {
          quanity += 1
          quanityLabel.textContent = `qty: ${quanity}`
          // cart.remove(product)
          
        } 
      }


  //   for(let i = 0; i < cart.length; i++) {
  //       if(cart[i].Id === itemId) { 
  //         cart.splice(i, 1)
  //         console.log(cart.splice(i, 1))
  //         setLocalStorage('so-cart', cart)
  //         location.reload;
  //       }
  //     }

  // //   for (let i = 0; i < cart.length; i++) {
  // //     if(cart[i].Id === itemId) {
  // //       setLocalStorage('so-cart', cart);
  // //       location.reload;
  // //     }
  // //   }
  //  for(let i = 0; i < cart.length; i++) {
  //     console.log(cart[i].Id)
  //     if(cart[i].Id === itemId) {
  //       quanity += 1
  //     }
  //     quanityLabel.textContent = quanity;
  //  }

    location.reload

    return template;
  }

  renderList(list) {
    // make sure the list is empty
    this.listElement.innerHTML = '';
    //get the template
    const template = document.getElementById('cart-card-template');
    renderListWithTemplate(
      template,
      this.listElement,
      list,
      this.prepareTemplate
    );
  }
}
