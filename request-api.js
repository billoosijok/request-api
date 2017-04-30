
/*	
	It constructs an API object that can be used to make requests to the
	passed api url
	
	@param params (Object) : 
			
			Required properties: 
				- url (String) : The url of the API.
				- apikey (String) : The api key.
			
			Optional properties: 
				- timeout (Number) : The minimum delay-duration between each API call.
*/
function API_Connect(params) {

	this.url = params.url
	this.apikey = params.apikey
	this.timeout = params.timeout || 500

	// This will serve as a delay for the request.
	// this is done to prevent multiple calls within 
	// the specified timeout variable
	var _timeOffIntervall = null;

	/**
	Makes a request to the provided url.
	- @param params (Object) : The parameters of the api request.
	- @param callback (Function) : The function to be called after 
									the request gets a response. 
									Note: It gets passed to parameters:
										- @param result (Object)
										- @param status (String)

	*/
	this.request = ( (params, callback) => {
		
		var delay = this.timeout;

		var reqUrl = this.url + '?' + $.param(params);
		
		if(_timeOffIntervall) {
			clearTimeout(_timeOffIntervall);
		} else {
			delay = 0;
		}

		_timeOffIntervall = setTimeout(function() {

			$.ajax({
	  
			  url: reqUrl,
			  method: (params['method'])? params.method : 'GET',
			
			}).done(function(result, status) {
			  			
			  	callback(result, status);

			}).fail(function(err, status) {
				
				callback(err, status);
			  	throw err;
			
			});

			_timeOffIntervall = null

		}, this.timeout);

	});
}

function require(files, callback) {
	
	for (var i = 0; i < files.length; i++) {
		var file = files[i];

		var fileurl = file.fileUrl
		var type 	= file.type
		
		var element = "";
		var attributes = {};

		switch (type.toLowerCase()) {
			case 'css':
				element = 'link';
				attributes.rel 	= "stylesheet" 
				attributes.type	= "text/css" 
				attributes.href = fileurl

				break;

			case 'js':
			case 'javascript':
				element = 'script';
				attributes.type = "text/javascript" 
				attributes.src  = fileurl
				break;

			default:
				return false;
		}

		var fileElement = document.createElement(element);

		for (attr in attributes) {
			fileElement.setAttribute(attr, attributes[attr]);
		}


		document.head.insertBefore(fileElement, document.head.children[0]);
	}
	

	callback()

	return true
}
