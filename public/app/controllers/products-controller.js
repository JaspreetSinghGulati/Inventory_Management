angular.module('myApp')
.controller('productsController',function(productService){
	var self = this;
	/**
	* @description Get all existing invoices
	**/
	productService.getAllProducts().then(function(products){
		self.products = products;
	});
	
	self.updateProduct = function(product){
		productService.updateProductByProductId(product.id,product.name,product.price).then(function(product){
			console.log('product update');
		});
	};
});