module.exports = {
	fragmentDictionary: {
		array: [
			{
				name: 'masterNode',
				findValuesByID: function () {
					return { name: 'isMaster', value: 'true' };
				}
			}
		]
	},
	findSubNodesByID: function () {
		return {
			name: 'masterNode',
			networkInformation: {
				array: [
					{
						name: 'lo',
						values: {
							array: [
								{ name: 'ipv4', value: '127.0.0.1' }
							]
						}
					}
				]
			}
		};
	}
};
