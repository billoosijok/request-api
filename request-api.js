
function API_Connect(params) {

	this.url = params.url
	this.apikey = params.apikey
	this.timeout = params.timeout

	var _timeOffIntervall = this.timeout || null;

	this.request = ( (params, callback) => {
		
		var reqUrl = this.url + '?' + $.param(params);
		
		if(_timeOffIntervall) {
			clearTimeout(_timeOffIntervall);
		}

		_timeOffIntervall = setTimeout(function() {

			$.ajax({
	  
			  url: reqUrl,
			  method: (params['method'])? params.method : 'GET',
			
			}).done(function(result) {
			  			
			  	callback(result);

			}).fail(function(err) {
			
			  throw err;
			  return false;
			
			});

		}, 1000);

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
