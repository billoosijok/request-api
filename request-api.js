
/*	
	It constructs an API object that can be used to make requests to the
	passed api url
	
	@param url (String) : The url of the API.
*/
function API_Connect(url) {

	this.url = url

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
		
		var reqUrl = this.url + '?' + $.param(params);

		$.ajax({
  
		  url: reqUrl,
		  method: (params['method'])? params.method : 'GET',
		
		}).done(function(result, status) {
		  			
		  	callback(result, status);

		}).fail(function(err, status) {
			
			callback(err, status);
		
		});
	}
}
