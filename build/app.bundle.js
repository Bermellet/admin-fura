/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	// require('ng-admin/build/ng-admin.min.js');
	// require('../node_modules/ng-admin/build/ng-admin.min.css');

	// BOOTSTRAP THE ADMIN

	var crmApp = angular.module('admin', ['ng-admin']);

	crmApp.factory('httpInterceptor', __webpack_require__(4));

	crmApp.config(['NgAdminConfigurationProvider', '$stateProvider', '$translateProvider', '$httpProvider', function(NgAdminConfigurationProvider, $stateProvider, $translateProvider, $httpProvider) {

			$httpProvider.interceptors.push('httpInterceptor');

	    var nga = NgAdminConfigurationProvider;
	    var admin = nga.application("Admin Fura")
	      .baseApiUrl("/api/");


	    // ENTITIES

	    admin.addEntity(nga.entity('questions'));
	    admin.addEntity(nga.entity('answers'));

	    __webpack_require__(3)(nga, admin);
	    __webpack_require__(2)(nga, admin);

	    // PAGES
	    // require('./pages/summary')($stateProvider);


	    admin.dashboard(__webpack_require__(1)(nga, admin));
	    admin.header(__webpack_require__(5));
	    admin.menu(__webpack_require__(7)(nga, admin));


	    // CONFIG
	    nga.configure(admin);

	    // LANGUAGE
	    __webpack_require__(6)($translateProvider);
	}]);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	module.exports = function (nga, admin) {
	  return nga.dashboard()
			.template(
				'<div class="container-fluid">' +
					'<div class="row">' +
						'<div class="col-md-12 text-center">' +
							'<h2>Admin Fura</h2>' +
							'<p class="text-muted">Questionnaire database admin<br/>La Fura dels Baus</p>' +
						'</div>' +
					'</div>' +
				'</div>'
			);
	};


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	module.exports = function (nga, admin) {

			var answers = admin.getEntity('answers');
			var questions = admin.getEntity('questions');

			answers.identifier(nga.field('_id'));

			answers.listView()
			.title('Answers')
			.fields([
				nga.field('question', 'reference')
				.targetEntity(questions)
				.targetField(nga.field('id_fura'))
				.isDetailLink(true),
				nga.field('group').isDetailLink(true),
				nga.field('value').isDetailLink(true),
				nga.field('date', 'date').format('dd/MM/yyyy HH:mm'),
			])
			.sortField('date')
			.sortDir('DESC')
			.exportFields([])
			.listActions(['show'])
			.filters([
				nga.field('question'),		
			]);

			answers.showView()
			.title('Answers')
			.fields([
				nga.field('question', 'reference')
				.targetEntity(questions)
				.targetField(nga.field('id_fura'))
				.isDetailLink(true),
				nga.field('group'),
				nga.field('value'),
				nga.field('date', 'date').format('dd/MM/yyyy HH:mm'),
			]);

			return answers;
	};


/***/ }),
/* 3 */
/***/ (function(module, exports) {

	module.exports = function (nga, admin) {

			var questions = admin.getEntity('questions');

			questions.identifier(nga.field('_id'));

			questions.listView()
			.title('Questions')
			.fields([
				nga.field('questionnaire').label('Questionnaire').isDetailLink(true),
				nga.field('id_fura').label("ID").isDetailLink(true),
				nga.field('group').label('Group').isDetailLink(true),
				nga.field('text').label('Question'),
				nga.field('date', 'date').label('Created').format('dd/MM/yyyy')
			])
			.sortField('id_fura')
			.sortDir('ASC')
			.listActions(['show'])
			.filters([
				nga.field('questionnaire'),
				nga.field('group')
			]);

			questions.showView()
			.title('Question')
			.fields([
				nga.field('questionnaire').label('Questionnaire'),
				nga.field('id_fura').label("ID"),
				nga.field('group').label('Group'),
				nga.field('text').label('Question'),
				nga.field('opcions').label('Options'),
				nga.field('date', 'date').label('Created').format('dd/MM/yyyy')
			])
			.actions(['edit']);

			questions.editionView()
			.title('Question')
			.fields([
				nga.field('questionnaire').label('Questionnaire'),
				nga.field('id_fura').label("ID"),
				nga.field('group').label('Group'),
				nga.field('text').label('Question'),
				nga.field('opcions').label('Options')
			]);

			questions.creationView()
			.title('Question')
			.fields([
				nga.field('questionnaire').label('Questionnaire'),
				nga.field('id_fura').label("ID"),
				nga.field('group').label('Group'),
				nga.field('text').label('Question'),
				nga.field('opcions').label('Options')
			]);
				

			// questions.editionView()
			// 		.title('Question')
			// 		.actions([
			// 			'<question-mark-retail question="entry"></question-mark-retail>',
			// 			'<question-mark-wholesale question="entry"></question-mark-wholesale>',
			// 			'list'
			// 		])
			// 		.fields([
			// 				nga.field('name'),
			// 				nga.field('lastName').label('Last Name'),
			// 				nga.field('type', 'choice')
			// 					.choices([
			// 						{label: 'Retail', value: 'Retail'},
			// 						{label: 'Wholesale', value: 'Wholesale'}
			// 					]),
			// 				nga.field('email'),
			// 				nga.field('phone'),
			// 				nga.field('delivery.address'),
			// 				nga.field('delivery.city'),
			// 				nga.field('delivery.zip'),
			// 				nga.field('billing.nif'),
			// 				nga.field('billing.name'),
			// 				nga.field('billing.address'),
			// 				nga.field('billing.city'),
			// 				nga.field('billing.zip'),
			// 				nga.field('registered', 'date')
			// 					.format('dd/MM/yyyy')
			// 					.editable(false),

			// 				// nga.field('purchases', 'referenced_list')
			// 				// 		.label('Ventas')
			// 				// 		.targetEntity(admin.getEntity('purchases'))
			// 				// 		.targetReferenceField('question')
			// 				// 		.targetFields([
			// 				// 			nga.field('reference').label('Localizador').isDetailLink(true),
			// 				// 			nga.field('date', 'date').label('Fecha').isDetailLink(true).format('dd/MM/yyyy'),
			// 				// 			nga.field('status', 'choice').label('Estado')
			// 				// 				.choices([
			// 				// 					{label: 'Pago pendiente', value: 'Pending'},
			// 				// 					{label: 'Pagada', value: 'Paid'},
			// 				// 					{label: 'Remesa', value: 'Remitted'}
			// 				// 				])
			// 				// 				.cssClasses(function(entry) {
			// 				// 						if(!entry) return '';
			// 				// 						else if (entry.values.status == 'Pending') return 'bg-warning';
			// 				// 						else if (entry.values.status == 'Remitted') return 'bg-info';
			// 				// 						else if (entry.values.status == 'Paid') return 'bg-success';
			// 				// 						else return 'bg-danger';
			// 				// 				})
			// 				// 		])
			// 				// 		.perPage(10)
			// 				// 		.sortField('date')
			// 				// 		.sortDir('DESC')
			// 		]);

			// 		questions.creationView()
			// 				.title('Question')
			// 				.fields([
			// 						nga.field('name'),
			// 						nga.field('lastName').label('Last Name'),
			// 						nga.field('type', 'choice')
			// 							.choices([
			// 								{label: 'Retail', value: 'Retail'},
			// 								{label: 'Wholesale', value: 'Wholesale'}
			// 							]),
			// 						nga.field('email'),
			// 						nga.field('phone'),
			// 						nga.field('delivery.address'),
			// 						nga.field('delivery.city'),
			// 						nga.field('delivery.zip'),
			// 						nga.field('billing.nif'),
			// 						nga.field('billing.name'),
			// 						nga.field('billing.address'),
			// 						nga.field('billing.city'),
			// 						nga.field('billing.zip')
			// 				]);



			return questions;
	};


/***/ }),
/* 4 */
/***/ (function(module, exports) {

	module.exports = ['$q', '$injector', 'notification', function($q, $injector, notification) {
	    return {
	        'responseError': function(rejection) {
	            if(rejection.data && rejection.data.error) {
	                notification.log(rejection.data.error, { addnCls: 'humane-flatty-error' });
	            }
	            else if (rejection.status === 401) {
	                notification.log('You are not logged in', { addnCls: 'humane-flatty-error' });
	                $injector.get('$state').go('logout');
	            }
	            else if (rejection.status === 403) {
	                notification.log('Access is forbidden', { addnCls: 'humane-flatty-error' });
	                $injector.get('$state').go('dashboard');
	            }
	            else if (rejection.status === 404) {
	                notification.log('Could not find the resource', { addnCls: 'humane-flatty-error' });
	                $injector.get('$state').go('dashboard');
	            }
	            else
	              notification.log('Unable to complete the request', { addnCls: 'humane-flatty-error' });
	            // Replace response with rejected promise to prevent rest of execution
	            return $q.reject(rejection);
	        }
	    };
	}];


/***/ }),
/* 5 */
/***/ (function(module, exports) {

	module.exports = '<div class="navbar-header">' +
		'<button type="button" class="navbar-toggle" ng-click="isCollapsed = !isCollapsed">' +
			'<span class="icon-bar"></span>' +
			'<span class="icon-bar"></span>' +
			'<span class="icon-bar"></span>' +
		'</button>' +
		'<a class="navbar-brand" href="#/dashboard" ng-click="appController.displayHome()">Admin Fura</a>' +
	'</div>'


/***/ }),
/* 6 */
/***/ (function(module, exports) {

	module.exports = function($translateProvider){
		$translateProvider.translations('es', {
			'BACK': 'Atrás',
			'DELETE': 'Suprimir',
			'CREATE': 'Crear',
			'EDIT': 'Modificar',
			'EXPORT': 'Exportar',
			'ADD_FILTER': 'Filtrar',
			'SEE_RELATED': 'Ver l@s {{ entityName }} relacionados',
			'LIST': 'Lista',
			'SHOW': 'Detalles',
			'SAVE': 'Guardar',
			'N_SELECTED': '{{ length }} seleccionados',
			'ARE_YOU_SURE': 'Esta modificación no se puede deshacer. ¿Estás seguro?',
			'YES': 'Confirmar',
			'NO': 'Cancelar',
			'FILTER_VALUES': 'Escribe o selecciona un elemento',
			'CLOSE': 'Cerrar',
			'CLEAR': 'Vaciar',
			'CURRENT': 'Actual',
			'REMOVE': 'Borrar',
			// 'ADD_NEW': 'Añadir {{ name }}',
			'ADD_NEW': 'Añadir elemento',
			'BROWSE': 'Buscar',
			'N_COMPLETE': '{{ progress }}% completado',
			'CREATE_NEW': 'Crear',
			'SUBMIT': 'Enviar',
			'SAVE_CHANGES': 'Guardar cambios',
			'BATCH_DELETE_SUCCESS': 'Borrado completado',
			'DELETE_SUCCESS': 'Borrado completado',
			'ERROR_MESSAGE': 'Error en el servidor (código: {{ status }})',
			'INVALID_FORM': 'Formulario inválido',
			'CREATION_SUCCESS': 'Registro completado',
			'EDITION_SUCCESS': 'Modificación completada',
			'ACTIONS': 'Acciones',
			'PAGINATION': '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> de <strong>{{ total }}</strong>',
			'NO_PAGINATION': 'No hay resultados',
			'PREVIOUS': '« Anterior',
			'NEXT': 'Siguiente »',
			'DETAIL': 'Detalle',
			'STATE_CHANGE_ERROR': 'Error de ruta: {{ message }}',
			'NOT_FOUND': 'Página no encontrada',
			'NOT_FOUND_DETAILS': 'La página solicitada no existe. Vuelve a la página anterior e inténtalo de nuevo.'

			// CUSTOM BELOW
		});
		$translateProvider.translations('ca', {
			'BACK': 'Enrere',
			'DELETE': 'Esborrar',
			'CREATE': 'Crear',
			'EDIT': 'Modificar',
			'EXPORT': 'Exportar',
			'ADD_FILTER': 'Filtrar',
			'SEE_RELATED': 'Veure els {{ entityName }} relacionats',
			'LIST': 'Llista',
			'SHOW': 'Detalls',
			'SAVE': 'Guardar',
			'N_SELECTED': '{{ length }} seleccionats',
			'ARE_YOU_SURE': 'Aquesta modificació no es pot desfer. N\'estàs segur?',
			'YES': 'Sí',
			'NO': 'Cancel·lar',
			'FILTER_VALUES': 'Escriu per filtrar o tria un element',
			'CLOSE': 'Tancar',
			'CLEAR': 'Buidar',
			'CURRENT': 'Actual',
			'REMOVE': 'Esborrar',
			'ADD_NEW': 'Afegir {{ name }}',
			'BROWSE': 'Buscar',
			'N_COMPLETE': '{{ progress }}% completat',
			'CREATE_NEW': 'Crear',
			'SUBMIT': 'Enviar',
			'SAVE_CHANGES': 'Guardar canvis',
			'BATCH_DELETE_SUCCESS': 'Esborrat completat',
			'DELETE_SUCCESS': 'Esborrat completat',
			'ERROR_MESSAGE': 'Error en el servidor (codi: {{ status }})',
			'INVALID_FORM': 'Formulari invàlid',
			'CREATION_SUCCESS': 'Registre completat',
			'EDITION_SUCCESS': 'Modificació completada',
			'ACTIONS': 'Accions',
			'PAGINATION': '<strong>{{ begin }}</strong> - <strong>{{ end }}</strong> de <strong>{{ total }}</strong>',
			'NO_PAGINATION': 'No hi ha resultats',
			'PREVIOUS': '« Anterior',
			'NEXT': 'Següent »',
			'DETAIL': 'Detall',
			'STATE_CHANGE_ERROR': 'Error de ruta: {{ message }}',
			'NOT_FOUND': 'No es troba',
			'NOT_FOUND_DETAILS': 'El contingut sol·licitat no existeix. Torna a la pàgina anterior i prova-ho de nou.'

			// CUSTOM BELOW
		});
		$translateProvider.preferredLanguage('en');
	};


/***/ }),
/* 7 */
/***/ (function(module, exports) {

	module.exports = function(nga, admin) {
			return nga.menu()
					// .addChild(nga.menu()
					// 		.icon('<span class="fa fa-bar-chart fa-fw"></span>')
					// 		.title('Summary')
					// 		.link('/summary')
					// )
					.addChild(nga.menu(admin.getEntity('questions'))
							.active(function(path){return path.indexOf('/questions') === 0})
							.icon('<span class="fa fa-question-circle fa-fw"></span>')
							.title('Questions')
					)
					.addChild(nga.menu(admin.getEntity('answers'))
							.icon('<span class="fa fa-comment fa-fw"></span>')
							.title('Answers')
					)
			;
	};


/***/ })
/******/ ]);