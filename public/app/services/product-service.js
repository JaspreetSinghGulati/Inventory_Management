angular.module('myApp')
.service('productService',function($http,APP_CONSTANTS,$resource){
	var self = this;
	/**
	* @description Get All products
	* @returns {Object}
	**/
	self.getAllProducts = function(){
		var promise = $http.get(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.PRODUCTS).then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Create a new product
	* @returns {Object}
	**/
	self.createNewProduct = function(name,price){
		var data = {
			'name':name,
			'price':price
		};
		var promise = $http.post(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.PRODUCTS,data).then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Get product by product id
	* @returns {Object}
	**/
	self.getProductByProductId = function(productID){
		var product = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.GET_PRODUCT, {productID:'@id'}, {
					  query: {method: 'get', isArray: false}
		});
		var promise = product.query({'productID':productID}).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Update product by product id
	* @returns {Object}
	**/
	self.updateProductByProductId = function(productID,name,price){
		var product = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.GET_PRODUCT, null, {
					  update: {method: 'PUT', isArray: false,params:{productID}}
		});
		var promise = product.update({
                name: name, price:price
            }).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Delete product by product id
	* @returns {Object}
	**/
	self.deleteProductByProductId = function(productID){
		var product = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.GET_PRODUCT, null, {
					  update: {method: 'DELETE', isArray: false,params:{productID}}
		});
		var promise = product.update().$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
	/**self.getProductByProductId(49).then(function(data){
		console.log(data);
	});**/
});