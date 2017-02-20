angular.module('myApp', ['ui.router','ui.bootstrap','ngResource'])
  .constant("APP_CONSTANTS", {
	  'ROOT_PATH':'http://localhost:8000/',
	  'PRODUCTS':'api/products',
	  'GET_PRODUCT':'api/products/:productID',
	  'CUSTOMERS':'api/customers',
	  'CUSTOMER_ID':'api/customers/:customerID',
	  'INVOICES':'api/invoices',
	  'CURRENT_INVOICE':'api/invoices/:invoiceID',
	  'ITEMS_INVOICE':'api/invoices/:invoiceID/items',
	  'ITEMS_INVOICE_ID':'api/invoices/:invoiceID/items/:id'
  })
  .config(['$stateProvider', '$urlRouterProvider', 
    function($stateProvider, $urlRouterProvider) {
      $urlRouterProvider.otherwise('/invoices');
      $stateProvider
      .state('newInvoice', {
        url: '/newInvoice',
		templateUrl: 'app/views/new-invoice.html',
        controller: 'newInvoiceController as newInvoiceCtrl'
      })
	  .state('customers', {
        url: '/customers',
		templateUrl: 'app/views/customers.html',
        controller: 'customersController as customersCtrl'
      })
	   .state('invoices', {
        url: '/invoices',
		templateUrl: 'app/views/invoices.html',
        controller: 'invoiceController as invoiceCtrl'
      })
	  .state('products', {
        url: '/products',
		templateUrl: 'app/views/products.html',
        controller: 'productsController as productsCtrl'
      });
    }
  ]);