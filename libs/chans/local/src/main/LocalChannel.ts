import {
	Channel, ChannelService, Inject, Services, OnMessage
} from 'kevoree-api';

@Channel({
	version: 1,
	description: '<strong>TODO</strong>'
})
class LocalChannel {

	@Inject(Services.Channel)
	private chanService: ChannelService;

	@OnMessage()
	onSend(msg: string) {
		this.chanService.getLocalInputs().forEach(input => {
      input.dispatch(msg);
    });
	}
}

export = LocalChannel;
