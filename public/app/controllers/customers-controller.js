angular.module('myApp')
.controller('customersController',function(customerService){
	var self = this;
	/**
	* @description Get all existing invoices
	**/
	customerService.getAllCustomers().then(function(customers){
		self.customers = customers;
	});
	
	self.updateCustomer = function(customer){
		customerService.updateCustomerByCustomerId(customer.id,customer.name,customer.address,customer.phone).then(function(customer){
			console.log('customer update');
		});
	};
});