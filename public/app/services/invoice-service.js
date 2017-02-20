angular.module('myApp')
.service('invoiceService',function($http,APP_CONSTANTS,$resource){
	var self = this;
	/**
	* @description Get All Invoices
	* @returns {Object}
	**/
	self.getAllInvoices = function(){
		var promise = $http.get(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.INVOICES).then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Create a new Invoice
	* @returns {Object}
	**/
	self.createNewInvoice = function(customerId,discount,total){
		var data = {
			'customer_id':customerId,
			'discount':discount,
			'total':total
		};
		var promise = $http.post(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.INVOICES,data).then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response.data;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Get Invoice by Invoice id
	* @returns {Object}
	**/
	self.getInvoiceByInvoiceId = function(invoiceID){
		var invoice = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CURRENT_INVOICE, {invoiceID:'@id'}, {
					  query: {method: 'get', isArray: false}
		});
		var promise = invoice.query({'invoiceID':invoiceID}).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Update Invoice by Invoice id
	* @returns {Object}
	**/
	self.updateInvoiceByInvoiceId = function(invoiceID,customerId,discount,total){
		var invoice = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CURRENT_INVOICE, null, {
					  update: {method: 'PUT', isArray: false,params:{invoiceID}}
		});
		var promise = invoice.update({
                customer_id: customerId, discount:discount, total:total
            }).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Delete Invoice by Invoice id
	* @returns {Object}
	**/
	self.deleteInvoiceByInvoiceId = function(invoiceID){
		var invoice = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.CURRENT_INVOICE, null, {
					  update: {method: 'DELETE', isArray: false,params:{invoiceID}}
		});
		var promise = invoice.update().$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
});