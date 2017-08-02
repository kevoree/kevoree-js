const fs = require('fs');
const csvWriter = require('csv-write-stream');
const writer = csvWriter({ sendHeaders: false });
const RegisterMessage = require('../../lib/protocol/RegisterMessage');

const modelStr = fs.readFileSync('../fixtures/model/simple-client.json', 'utf8');

writer.pipe(fs.createWriteStream('payload/register.csv'));

const regex = new RegExp('node1', 'g');
const count = parseInt(process.argv[2], 10) || 1000;
for (let i=0; i < count; i++) {
	const clientName = 'client' + i;
	const changedModel = modelStr.replace(regex, clientName);
	writer.write({
		message: new RegisterMessage(clientName, changedModel).toRaw()
	});
}

writer.end();
