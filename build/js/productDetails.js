var o=(e,t,d)=>new Promise((c,a)=>{var u=i=>{try{r(d.next(i))}catch(s){a(s)}},p=i=>{try{r(d.throw(i))}catch(s){a(s)}},r=i=>i.done?c(i.value):Promise.resolve(i.value).then(u,p);r((d=d.apply(e,t)).next())});import{setLocalStorage as n,getLocalStorage as h,loadHeaderFooter as l}from"./utils.js";l();export default class m{constructor(t,d){this.productId=t,this.product={},this.dataSource=d,this.imageSize="",this.discount=""}init(){return o(this,null,function*(){this.product=yield this.dataSource.findProductById(this.productId),window.screen.width<640?this.imageSize=this.product.Images.PrimaryMedium:window.screen.width<=896?this.imageSize=this.product.Images.PrimaryLarge:this.imageSize=this.product.Images.PrimaryExtraLarge,this.discount=100-this.product.FinalPrice/this.product.SuggestedRetailPrice*100,document.querySelector("main").innerHTML=this.renderProductDetails(),document.getElementById("addToCart").addEventListener("click",this.addToCart.bind(this))})}addToCart(){let t=h("so-cart");t||(t=[]),t.push(this.product),n("so-cart",t),location.reload(),alert("Item added to cart!")}renderProductDetails(){return`
    <p>${this.product.Category}</p>
    <section class="product-detail"> <h3>${this.product.Brand.Name}</h3>
    <h2 class="divider">${this.product.NameWithoutBrand}</h2>
    <img
      class="divider"
      src="${this.imageSize}"
      alt="${this.product.NameWithoutBrand}"
    />
    <section id='pricing'>
    <div class="ribbon">
    <i><span><s></s>${parseFloat(this.discount).toFixed(0)}%<s></s></span></i>
    </div>
    <div>
    <p class="product-card__discount">$${this.product.SuggestedRetailPrice}</p>
    <p class="product-card__price">$${this.product.FinalPrice}</p>
    <p class="product__color">${this.product.Colors[0].ColorName}</p>
    </div></section>
    <p class="product__description">
    ${this.product.DescriptionHtmlSimple}
    </p>
    <div class="product-detail__add">
      <button id="addToCart" data-id="${this.product.Id}">Add to Cart</button>
    </div></section>`}}
