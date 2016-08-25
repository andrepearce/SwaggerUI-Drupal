/**
* Created by: Andre Pearce
* Created on: 25/08/2016
*/

/**
* SwaggerUI_Drupal V0.1
* Custom call for drupal to invoke swagger ui javascript
*/

(function ($) {

	Drupal.behaviors.SwaggerSetup = {
		attach: function (context, settings) {
			var url = window.location.search.match(/url=([^&]+)/);
			if (url && url.length > 1) {
				url = decodeURIComponent(url[1]);
			} else {
				url = "http://petstore.swagger.io/v2/swagger.json";
			}

			hljs.configure({
				highlightSizeThreshold: 5000
			});

      		// Pre load translate...
      		if(window.SwaggerTranslator) {
      			window.SwaggerTranslator.translate();
      		}
      		window.swaggerUi = new SwaggerUi({
      			url: url,
      			dom_id: "swagger-ui-container",
      			supportedSubmitMethods: ['get', 'post', 'put', 'delete', 'patch'],
      			onComplete: function(swaggerApi, swaggerUi){
      				if(typeof initOAuth == "function") {
      					initOAuth({
      						clientId: "your-client-id",
      						clientSecret: "your-client-secret-if-required",
      						realm: "your-realms",
      						appName: "your-app-name",
      						scopeSeparator: " ",
      						additionalQueryStringParams: {}
      					});
      				}

      				if(window.SwaggerTranslator) {
      					window.SwaggerTranslator.translate();
      				}
      			},
      			onFailure: function(data) {
      				log("Unable to Load SwaggerUI");
      			},
      			docExpansion: "none",
      			jsonEditor: false,
      			defaultModelRendering: 'schema',
      			showRequestHeaders: false
      		});

      		window.swaggerUi.load();

      		function log() {
      			if ('console' in window) {
      				console.log.apply(console, arguments);
      			}
      		}
      	}
  	};
  	
})(jQuery);