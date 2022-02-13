const fs=require('fs');
const path=require('path');
//const products =[];
const p = path.join(path.dirname(require.main.filename),'data','products.json');
module.exports= class Product
{
	constructor(n,p,s){
		this.name=n;
		this.price=p;
		this.seller=s;
	}
/*	save() {
	//	products.push({ Name:this.name,Price : this.price,SellerName : this.seller});
	
	fs.readFile(p,(err,fileContent) =>
	{
		let products = [];
		if(!err)
		{
			JSON.parse(fileContent);

		}
	else {
			products.push({ Name:this.name,Price : this.price,SellerName : this.seller});
			fs.writeFile(p,JSON.stringify(products),(err) =>{
				console.log(err);
			});
	}
	});
	}
	static fetchAll(cb) {
	
	fs.readFile(p,(err,fileContent) => {
		if(err)
		{
			cb([]);

		}
 
			cb(JSON.parse(fileContent));
	});
	
	//	return products;
	
	}
};*/
 save() {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
     const products = [];
      if (!err) {
        products = JSON.parse(fileContent);
      }
products.push({ Name:this.name,Price : this.price,SellerName : this.seller});
      fs.writeFile(p, JSON.stringify(products), err => {
        console.log(err);
      });
    });
  }

  static fetchAll(cb) {
    const p = path.join(
      path.dirname(process.mainModule.filename),
      'data',
      'products.json'
    );
    fs.readFile(p, (err, fileContent) => {
      if (err) {
        cb([]);
      }
      cb(JSON.parse(fileContent));
    });
  }
};
