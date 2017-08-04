module.exports = {
  fragmentDictionary: {
    array: [
      {
        name: 'masterNode',
        findValuesByID() {
          return { name: 'isMaster', value: 'true' };
        }
      }
    ]
  },
  findSubNodesByID() {
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
