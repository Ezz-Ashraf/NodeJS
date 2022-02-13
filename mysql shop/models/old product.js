const Cart =require('./cart');
const db = require('../util/database');
	 let products = [];

module.exports = class Product {
  	constructor(id,n,p,s,i){
		this.id=id
		this.name=n;
		this.price=p;
		this.description=s;
		this.imgName= i;
	};
	
  save() {

	return  db.execute('INSERT INTO products (name,price,description,imageURL) values (?,?,?,?)',[this.name,this.price,this.description,this.imgName]);
    };
  

  static fetchAll() {
return db.execute('SELECT * FROM products');

  }
  static findById(id)
  {
return db.execute('SELECT * FROM products WHERE products.id = ?',[id]);
  }
  static deleteById(id)
  {

  
};
}
