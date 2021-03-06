'use strict';
var version = {
	full: '"NG_VERSION_FULL"',    // all of these placeholder strings will be replaced by grunt's
	major: "NG_VERSION_MAJOR",    // package task
	minor: "NG_VERSION_MINOR",
	dot: "NG_VERSION_DOT",
	codeName: '"NG_VERSION_CODENAME"'
};

function publishExternalAPI(angular) {
	console.log('publishExternalAPI');
	extend(angular, {
		'bootstrap': bootstrap,
		'copy': copy,
		'extend': extend,
		'equals': equals,
		'element': jqLite,
		'forEach': forEach,
		'injector': createInjector,
		'noop': noop,
		'bind': bind,
		'toJson': toJson,
		'fromJson': fromJson,
		'identity': identity,
		'isUndefined': isUndefined,
		'isDefined': isDefined,
		'isString': isString,
		'isFunction': isFunction,
		'isObject': isObject,
		'isNumber': isNumber,
		'isElement': isElement,
		'isArray': isArray,
		'version': version,
		'isDate': isDate,
		'lowercase': lowercase,
		'uppercase': uppercase,
		'callbacks': {counter: 0},
		'$$minErr': minErr,
		'$$csp': csp
	});

	angularModule = setupModuleLoader(window);
	try {
		angularModule('ngLocale');
	} catch (e) {
		angularModule('ngLocale', []).provider('$locale', $LocaleProvider);
	}

	angularModule('ng', ['ngLocale'], ['$provide',
		function ngModule($provide) {
			// $$sanitizeUriProvider needs to be before $compileProvider as it is used by it.
			$provide.provider({
				$$sanitizeUri: $$SanitizeUriProvider
			});
			$provide.provider('$compile', $CompileProvider).
			directive({
				a: htmlAnchorDirective,
				input: inputDirective,
				textarea: inputDirective,
				form: formDirective,
				script: scriptDirective,
				select: selectDirective,
				style: styleDirective,
				option: optionDirective,
				ngBind: ngBindDirective,
				ngBindHtml: ngBindHtmlDirective,
				ngBindTemplate: ngBindTemplateDirective,
				ngClass: ngClassDirective,
				ngClassEven: ngClassEvenDirective,
				ngClassOdd: ngClassOddDirective,
				ngCloak: ngCloakDirective,
				ngController: ngControllerDirective,
				ngForm: ngFormDirective,
				ngHide: ngHideDirective,
				ngIf: ngIfDirective,
				ngInclude: ngIncludeDirective,
				ngInit: ngInitDirective,
				ngNonBindable: ngNonBindableDirective,
				ngPluralize: ngPluralizeDirective,
				ngRepeat: ngRepeatDirective,
				ngShow: ngShowDirective,
				ngStyle: ngStyleDirective,
				ngSwitch: ngSwitchDirective,
				ngSwitchWhen: ngSwitchWhenDirective,
				ngSwitchDefault: ngSwitchDefaultDirective,
				ngOptions: ngOptionsDirective,
				ngTransclude: ngTranscludeDirective,
				ngModel: ngModelDirective,
				ngList: ngListDirective,
				ngChange: ngChangeDirective,
				required: requiredDirective,
				ngRequired: requiredDirective,
				ngValue: ngValueDirective
			}).
			directive(ngAttributeAliasDirectives).
			directive(ngEventDirectives);
			$provide.provider({
				$anchorScroll: $AnchorScrollProvider,
				$animate: $AnimateProvider,
				$browser: $BrowserProvider,
				$cacheFactory: $CacheFactoryProvider,
				$controller: $ControllerProvider,
				$document: $DocumentProvider,
				$exceptionHandler: $ExceptionHandlerProvider,
				$filter: $FilterProvider,
				$interpolate: $InterpolateProvider,
				$interval: $IntervalProvider,
				$http: $HttpProvider,
				$httpBackend: $HttpBackendProvider,
				$location: $LocationProvider,
				$log: $LogProvider,
				$parse: $ParseProvider,
				$rootScope: $RootScopeProvider,
				$q: $QProvider,
				$sce: $SceProvider,
				$sceDelegate: $SceDelegateProvider,
				$sniffer: $SnifferProvider,
				$templateCache: $TemplateCacheProvider,
				$timeout: $TimeoutProvider,
				$window: $WindowProvider
			});
		}
	]);
}
