var i=(c,r,e)=>new Promise((a,n)=>{var l=s=>{try{o(e.next(s))}catch(t){n(t)}},h=s=>{try{o(e.throw(s))}catch(t){n(t)}},o=s=>s.done?a(s.value):Promise.resolve(s.value).then(l,h);o((e=e.apply(c,r)).next())});import d from"../json/alert.json.proxy.js";export default class g{constructor(){this.message="",this.background="",this.color=""}init(){return i(this,null,function*(){d.forEach(r=>{this.message=r.message,this.color=r.color,this.background=r.background,document.querySelector("main").insertAdjacentHTML("afterbegin",this.renderAlert())})})}renderAlert(){return`<section class='alert-list'>
     <p style='color:${this.color}; background-color:${this.background};'>${this.message}</p>

     </section>`}}
