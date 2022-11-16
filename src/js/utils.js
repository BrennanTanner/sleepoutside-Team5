function convertToText(res) {
  if (res.ok) {
    return res.text();
  } else {
    throw new Error('Bad Response');
  }
}

// wrapper for querySelector...returns matching element
export function qs(selector) {
  return document.querySelector(selector);
}

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

export function removeLocalStorage(key) {
  localStorage.removeItem(key);
}

// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener('touchend', (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener('click', callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}

export function renderListWithTemplate(template, parent, list, callback) {

  if (!list || list.length === 0){

    document.getElementById('emptyCart').style.display = 'inline';
  }
  else {
    list.forEach(item => {
    const clone = template.content.cloneNode(true);
    const templateWithData = callback(clone, item);
    parent.appendChild(templateWithData);
  })
}
}

export function renderWithTemplate(template, parent, data, callback) {
  
    let clone = template.content.cloneNode(true);
    if(callback) {
    clone = callback(clone, data);
    
    }
    parent.appendChild(clone);
  
}

export async function loadTemplate(path) {
  const html = await fetch(path).then(convertToText);
  const template = document.createElement('template');
  template.innerHTML = html;
  return template;

}

// load the header and footer
export async function loadHeaderFooter() {
  const header = await loadTemplate('../partials/header.html');
  const footer = await loadTemplate('../partials/footer.html');
  const headerElement = document.getElementById('main-header');
  const footerElement = document.getElementById('main-footer');
  renderWithTemplate(header, headerElement);
  renderWithTemplate(footer, footerElement);

  
const cartSubscript = (count) => 
   `<sup class="cart-number">${count}</sup>`
;
let localContent = JSON.parse(localStorage.getItem('so-cart'));

if (localContent.length > 0){
document.querySelector('.cart-count').innerHTML = cartSubscript(
  getLocalStorageCount(localContent)
  );
}
}

export function getLocalStorageCount(localContent) {
  let total = 0;
  localContent.forEach((element) => {
    total += element.qty
  })
  return total;
}

export function alertMessage(message, scroll = true) {
  const alert = document.createElement('div');
  // const xButton = document.createElement('div');
  // const messages = document.createElement('div');
  // xButton.innerHTML = 'X'
  // xButton.classList.add('x')
  // messages.innerHTML = message
  // alert.appendChild(xButton)
  // alert.appendChild(messages)
  alert.classList.add('alert');
  alert.innerHTML = `<p>${message}</p><span>X</span>`;
  
  alert.addEventListener('click', function(e) {
      if(e.target.tagName == 'SPAN') {
        main.removeChild(this);
      }
  })

  // alert.addEventListener('click', function(e) {
  //   if(e.target.classList.contains('x')) {
  //     main.removeChild(this);
  //   }
  // })

  const main = document.querySelector('main');
  main.prepend(alert);

  if(scroll)
    window.scrollTo(0,0);
}

export function removeAllAlerts() {
  const alerts = document.querySelectorAll('.alert');
  alerts.forEach(alert => document.querySelector('main').removeChild(alert));
}

