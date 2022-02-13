fs =require('fs');
path =require('path');
  const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'cart.json'
    );
module.exports = class cart{
static addProduct(id,productPrice) {

//fetch the previous cart
fs.readFile(p,(err,fileContent ) =>
{
		let cart = {products: [], totalPrice:0};
		if(!err)
		{
			cart=JSON.parse(fileContent);
		}
	//analyze the cart =>find existing product
	const existingProductIndex = cart.products.findIndex(prod => prod.id === id);
	const existingProduct = cart.products[existingProductIndex];
	let updatedProduct;
	//add new product ->(increase quantity)
	if(existingProduct)
	{
		updatedProduct = existingProduct;
		updatedProduct.qty=updatedProduct.qty+1;
		// copying the old array
		cart.products= [...cart.products];
		cart.products[existingProductIndex] = updatedProduct;
	}
	else {
	updatedProduct = {id : id , qty:1};
			cart.products= [...cart.products , updatedProduct];
	}
	cart.totalPrice = cart.totalPrice + +productPrice;
	fs.writeFile( p , JSON.stringify(cart) ,(err) => {
	console.log(err);
	});
});
	
}

static deleteProduct(id,ProductPrice) {
	fs.readFile(p,(err,fileContent ) =>
{
if(err)
{
	return;
}
const updatedCart = {...JSON.parse(fileContent)};
const product = updatedCart.products.find(prod =>prod.id ===id);
if(!product)
{
	return;
}
const productQty =product.qty;
updatedCart.products=updatedCart.products.filter(prod =>{prod.id !==id});
updatedCart.totalPrice = updatedCart.totalPrice- ProductPrice *productQty;
	fs.writeFile( p , JSON.stringify(updatedCart) ,(err) => {
		if(err)
		{
	console.log(err);
		}
		});
});
}

static getCart(cb)
{
	fs.readFile(p,(err,fileContent ) =>
{
	const cart = JSON.parse(fileContent);
	if(err)
	{
		cb(null);
	}
	else {
		cb(cart);
	}
});
}
}