angular.module('myApp')
.service('customerService',function($http,APP_CONSTANTS,$resource){
	var self = this;
	/**
	* @description Get All customers
	* @returns {Object}
	**/
	self.getAllCustomers = function(){
		var promise = $http.get(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CUSTOMERS).then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Create a new customer
	* @returns {Object}
	**/
	self.createNewCustomer = function(name,address,phone){
		var data = {
			'name':name,
			'address':address,
			'phone':phone
		};
		var promise = $http.post(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CUSTOMERS,data).then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Get customer by customer id
	* @returns {Object}
	**/
	self.getCustomerByCustomerId = function(customerID){
		var customer = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CUSTOMER_ID, {customerID:'@id'}, {
					  query: {method: 'get', isArray: false}
		});
		var promise = customer.query({'customerID':customerID}).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Update customer by customer id
	* @returns {Object}
	**/
	self.updateCustomerByCustomerId = function(customerID,name,address,phone){
		var customer = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CUSTOMER_ID, null, {
					  update: {method: 'PUT', isArray: false,params:{customerID}}
		});
		var promise = customer.update({
                name: name, address:address,phone:phone
            }).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Delete customer by customer id
	* @returns {Object}
	**/
	self.deleteCustomerByCustomerId = function(customerID){
		var customer = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CUSTOMER_ID, null, {
					  update: {method: 'DELETE', isArray: false,params:{customerID}}
		});
		var promise = customer.update().$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
});