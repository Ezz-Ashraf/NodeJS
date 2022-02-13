const fs = require('fs');
const path = require('path');
const Cart =require('./cart');
  const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
	 let products = [];
	
	//we need to call the function more than one time because it's asyncronous
	const readProducts = cb =>{
	 fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
	
      }
	  else {
      cb(JSON.parse(fileContent));
	  }
	});
	};
module.exports = class Product {
  	constructor(id,n,p,s,i){
		this.id=id
		this.name=n;
		this.price=p;
		this.seller=s;
		this.imgName= i;
	};
	
  save() {

	  	readProducts(products => {
			if(this.id)
			{
				const existingProductIndex = products.findIndex(prod => prod.id === this.id);
	const existingProducts = products[existingProductIndex];
	const updatedProducts= [...products];
	updatedProducts[existingProductIndex] = this;
	  fs.writeFile(p, JSON.stringify(updatedProducts), err => {
        console.log(err);
	  });
			}
			else {
				  this.id=Math.random().toString();
			 	  products.push({ name:this.name,price : parseFloat(this.price),seller : this.seller ,imgName : this.imgName ,id:this.id});
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
	  })
      };
		});
   
    };
  

  static fetchAll(cb) {
  	readProducts(cb);

  }
  static findById(id,cb)
  {
	  readProducts(products =>{
		  const product=products.find(p =>{return p.id === id});
		  cb(product);
	  } );
  }
  static deleteById(id)
  {
	   readProducts(products =>{
		   const product =products.find(prod =>{prod.id === id});
		  const updatedProducts=products.filter(p =>{return p.id !== id});
    fs.writeFile(p, JSON.stringify(updatedProducts), err => {
		if(err){
        console.log(err);
		}
		Cart.deleteProduct(id,product.price);
	  });
      });
	  };
  
};
