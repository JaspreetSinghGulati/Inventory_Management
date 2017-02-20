angular.module('myApp')
.controller('invoiceController',function(productService,customerService,invoiceService,invoiceItemService){
	var self = this;
	self.selectedProducts = [];
	/**
	* @description Get all existing invoices
	**/
	invoiceService.getAllInvoices().then(function(invoices){
		self.invoices = invoices;
		angular.forEach(self.invoices, function(invoice){
			 customerService.getCustomerByCustomerId(invoice.id).then(function(customer){
				invoice.customerName = customer.name;
			});
		});
	});
});