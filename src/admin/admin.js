import ExternalServices from '../js/externalServices';
import { alertMessage } from '../js/utils';

export default class Admin{
   constructor(outputSelector){
 this.mainElement = document.querySelector(outputSelector);
 this.token = null;
 this.services = new ExternalServices();
   };

   async init(){

      console.log('hi');
      this.showLogin();
   };

   async login(creds, next){

      try {
         this.token = await this.services.loginRequest(creds);
         next()
      }
      catch(err) {
         alertMessage(err.message.message);
      }
   };

   showLogin(){
      document.querySelector('#login').innerHTML = `
      <form>
      <label for="email" >email</label><br>
        <input type="email" name="email" required ><br>
        <label for="password">Password</label><br>
        <input type="password" name="password" required ><br>
        <button type="submit" id="checkoutSubmit">Login</button>
      </form>
      `
   };
};

