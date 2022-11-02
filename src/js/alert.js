import alerts from '../json/alert.json';

export default class Alert {
   constructor(){
     this.message = '';
     this.background = '';
     this.color = '';
   }

   async init() {
      alerts.forEach(alert => {
         this.message = alert.message;
         this.color = alert.color;
         this.background = alert.background;
         document.querySelector('main').insertAdjacentHTML('afterbegin',this.renderAlert());
         
      });

   }
   
   renderAlert() {
     return `<section class='alert-list'>
     <p style='color:${this.color}; background-color:${this.background};'>${this.message}</p>

     </section>`;
   }
} 