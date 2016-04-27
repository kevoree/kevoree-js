import { ModelConnector , Inject, Services, LoggerService } from 'kevoree-api';

@ModelConnector({
	version: 1,
	description: 'todo'
})
class WebSocketMCon {

}

export = WebSocketMCon;
