angular.module('myApp')
.controller('newInvoiceController',function(productService,customerService,invoiceService,invoiceItemService,$filter,
			$window, $uibModal, $scope){
	var self = this;
	var init = function(){
		self.selectedProducts = [];
		self.discount=0;
		self.quantities =[1,2,3,4,5,6,7,8,9];
		self.invoiceCreated = '';
		self.estTotal = 0;
		/**
		* @description Get all products
		**/
		customerService.getAllCustomers().then(function(customers){
			self.customers = customers;
			self.selectedUser = customers[0];
		});
		/**
		* @description Get all products
		**/
		productService.getAllProducts().then(function(products){
			self.products = products;
			angular.forEach(self.products, function(product){
				product.quantity = 1;
			});
		});
	}
	
	self.resetInvoice = function(){
		init();
	};		
	
	self.addProduct = function(product){
		product.added=!product.added
		self.selectedProducts.push(product);
		self.calcEstimateInvoiceAmount();
		if(self.invoiceCreated.id){
			self.modifyInvoice(self.invoiceCreated.id);
		}
	};
	
	self.removeProduct = function(index,product){
		self.selectedProducts.splice(index, 1);
		product.added=!product.added;
		self.calcEstimateInvoiceAmount();
	};
	
	self.calcEstimateInvoiceAmount = function(){
		self.estTotal = 0;
		angular.forEach(self.selectedProducts, function(product){
			self.estTotal = self.estTotal + (product.price*parseInt(product.quantity));
		});
		if(self.estTotal !==0 ){
			self.estTotal = (self.estTotal*(100-parseInt(self.discount))/100)
		}
		if(self.invoiceCreated.id){
			self.modifyInvoice(self.invoiceCreated.id);
		}
	}
	
	self.createInvoice = function(){
		var invoice = {
			customerId:self.selectedUser.id, 
			discount:self.discount,
			total:0
		}
		angular.forEach(self.selectedProducts, function(product){
			invoice.total = invoice.total + (product.price*parseInt(product.quantity));
		});
		invoice.total = (invoice.total*(100-parseInt(self.discount))/100)
		invoiceService.createNewInvoice(invoice.customerId,invoice.discount,invoice.total).then(function(invoice){
			self.invoice = invoice;
			var invoiceItemCount =0;
			angular.forEach(self.selectedProducts, function(product){
				var invoiceItems = {
					invoiceID:invoice.id,
					productID:product.id,
					quantity:product.quantity
				}
				invoiceItemService.addInvoiceItemsByInvoiceId(invoiceItems.invoiceID,invoiceItems.productID,invoiceItems.quantity).then(function(invoiceItem){
					invoiceItemCount = invoiceItemCount+1;
					product.invoiceItemId = invoiceItem.id;
					if((invoiceItemCount === self.selectedProducts.length) && self.invoice){
						self.invoiceCreated = invoice;
						$window.scrollTo(0, 0);
					}
				},function(){
					console.log('some error occurs');
				});
			})
			
		},function(){
					console.log('some error occurs');
		});
	};
	
	self.modifyInvoice = function(invoiceId){
		var invoice = {
			customerId:self.invoiceCreated.customer_id, 
			discount:self.discount,
			total:0
		}
		angular.forEach(self.selectedProducts, function(product){
			invoice.total = invoice.total + (product.price*parseInt(product.quantity));
		});
		invoice.total = (invoice.total*(100-parseInt(self.discount))/100)
		invoiceService.updateInvoiceByInvoiceId(invoiceId,invoice.customerId,invoice.discount,invoice.total).then(function(invoice){
			self.invoice = invoice;
			var invoiceItemCount =0;
			angular.forEach(self.selectedProducts, function(product){
				invoiceItemService.updateInvoiceItemsById(invoiceId,product.invoiceItemId,product.id,product.quantity).then(function(invoiceItems){
					invoiceItemCount = invoiceItemCount+1;
					if((invoiceItemCount === self.selectedProducts.length) && self.invoice){
						self.invoiceCreated = invoice;
						$window.scrollTo(0, 0);
					}
				},function(){
					console.log('some error occurs');
				});
			})
			
		},function(){
					console.log('some error occurs');
		});
	};
	
	self.addCustomer = function(){
	  self.uibModalInstance = $uibModal.open({
		  ariaLabelledBy: 'modal-title-top',
		  ariaDescribedBy: 'modal-body-top',
		  templateUrl: '/app/views/new-customer.html',
		  size: 'sm',
		  scope: $scope
    });
	};
	$scope.createNewCustomer = function(customer){
		 customerService.createNewCustomer(customer.name,customer.address,customer.phone).then(
		 function(customer){
			 self.customers.push(customer);
			 self.uibModalInstance.close();
		 },function(){
			  console.log('error');
			  self.uibModalInstance.close();
		 });
		 
	};
	self.openNewProductModal = function(){
	  self.uibModalInstance = $uibModal.open({
		  ariaLabelledBy: 'modal-title-top',
		  ariaDescribedBy: 'modal-body-top',
		  templateUrl: '/app/views/new-product.html',
		  size: 'sm',
		  scope: $scope
    });
	};
	$scope.addProduct = function(product){
		 productService.createNewProduct(product.name,product.price).then(
		 function(product){
			 product.quantity = 1;
			 self.products.push(product);
			 self.uibModalInstance.close();
		 },function(){
			  console.log('error');
			  self.uibModalInstance.close();
		 });
		 
	};
	
	init();
});