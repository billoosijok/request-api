require('https://code.jquery.com/jquery-3.2.1.min.js', 'js');

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

function require(fileurl, type) {
	
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

	document.head.appendChild(fileElement);

	return true
}
