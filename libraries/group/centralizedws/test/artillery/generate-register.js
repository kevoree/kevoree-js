var fs = require('fs');
var csvWriter = require('csv-write-stream');
var writer = csvWriter({ sendHeaders: false });
var RegisterMessage = require('../../lib/protocol/RegisterMessage');

var modelStr = fs.readFileSync('../fixtures/model/simple-client.json', 'utf8');

writer.pipe(fs.createWriteStream('payload/register.csv'));

var regex = new RegExp('node1', 'g');
var count = parseInt(process.argv[2], 10) || 1000;
for (var i=0; i < count; i++) {
	var clientName = 'client' + i;
	var changedModel = modelStr.replace(regex, clientName);
	writer.write({
		message: new RegisterMessage(clientName, changedModel).toRaw()
	});
}

writer.end();
