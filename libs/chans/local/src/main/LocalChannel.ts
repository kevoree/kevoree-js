import {
	Channel, ChannelService, Inject, Services, DispatchCallback, OnMessage
} from 'kevoree-api';

@Channel({
	version: 1,
	description: '<strong>TODO</strong>'
})
class LocalChannel {

	@Inject(Services.Channel)
	private chanService: ChannelService;

	@OnMessage
	onSend(msg: string, callback: DispatchCallback) {
		this.chanService.localDispatch(msg, callback);
	}
}

export = LocalChannel;
