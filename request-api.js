
function apiRequest(params) {
	
	this.url = params.url
	this.apikey = params.apikey

	this.request = ( (params, callback) => {
		var reqUrl = this.url + '?' + $.param(params);
		
		$.ajax({
		  url: reqUrl,
		  method: (params['method'])? params.method : 'GET',
		}).done(function(result) {
		    callback(result);
		}).fail(function(err) {
		  throw err;
		  return false;
		});
	});
}
