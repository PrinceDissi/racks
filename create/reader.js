
var fs = require('fs');
var path = require('path');

var templateDir = path.join(__dirname, '../templates/');
var _result;

exports.template = function readTemplate(name, handler) {
	var content;
	fs.readFile(templateDir + 'racks-component.html', 'utf8', function(err, data) {
		if(err) {
			console.error('No file found for markup under %s', templateDir);
			return;
		}
		content = data;
		
	});
	handler(content);
};