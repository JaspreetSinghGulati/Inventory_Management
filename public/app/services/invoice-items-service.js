angular.module('myApp')
.service('invoiceItemService',function($http,APP_CONSTANTS,$resource){
	var self = this;
	/**
	* @description Get All Invoices
	* @returns {Object}
	**/
	self.getAllItemsByInvoiceId = function(invoiceID){
		var invoice = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.ITEMS_INVOICE, {invoiceID:'@id'}, {
					  query: {method: 'get', isArray: true}
		});
		var promise = invoice.query({'invoiceID':invoiceID}).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      });
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Add Invoice item by invoice id
	* @returns {Object}
	**/
	self.addInvoiceItemsByInvoiceId = function(invoiceID,productID,quantity){
		var invoiceItems = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.ITEMS_INVOICE, null, {
					  update: {method: 'POST', isArray: false,params:{invoiceID}}
		});
		var promise = invoiceItems.update({
                'product_id':productID, 'quantity': quantity
            }).$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
	/**
	* @description Get Invoice by Invoice id
	* @returns {Object}
	**/
	self.getInvoiceItemsById = function(invoiceID,id){
		var invoiceItems = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.ITEMS_INVOICE_ID, {invoiceID:invoiceID,id:id}, {
					  query: {method: 'get', isArray: false}
		});
		var promise = invoiceItems.query().$promise.then(function (response) {
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
	self.updateInvoiceItemsById = function(invoiceID,id,productID,quantity){
		var invoiceItems = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.ITEMS_INVOICE_ID, {invoiceID:invoiceID,id:id}, {
					  update: {method: 'PUT', isArray: false}
		});
		var promise = invoiceItems.update({
                'product_id':productID, 'quantity': quantity
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
	self.deleteInvoiceItemsById = function(invoiceID,id){
		var invoiceItems = $resource(APP_CONSTANTS.ROOT_PATH+APP_CONSTANTS.ITEMS_INVOICE_ID, {invoiceID:invoiceID,id:id}, {
					  update: {method: 'DELETE', isArray: false}
		});
		var promise = invoiceItems.update().$promise.then(function (response) {
        // The return value gets picked up by the then in the controller.
        return response;
      },function(error){console.log(error)});
      // Return the promise to the controller
      return promise;
	};
});