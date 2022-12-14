const baseURL = 'http://server-nodejs.cit.byui.edu:3000/'

async function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw {name: 'serviceError', message: res.json()};
  }
}

export default class ExternalServices  {
  constructor() {

  }
  getData(category) {
    return fetch(baseURL + `products/search/${category}`)
    .then(convertToJson).then((data) => data.Result);
    
  }
  async findProductById(id) {
    return await fetch(baseURL + `product/${id}`).then(convertToJson)
    .then((data) => data.Result);
    
  }
  async checkout(payload) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },

      body: JSON.stringify(payload),
    };

    return await fetch(baseURL + 'checkout/', options).then(convertToJson);
  }

  async loginRequest(user) {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(user)
    }
    const response = await fetch(baseURL + 'login', options).then(convertToJson);
    return response.accessToken;
  }

  async getOrders(token) {
    const options = {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }
    const response = await fetch(baseURL + 'orders', options).then(convertToJson);
    return response;
  }
}