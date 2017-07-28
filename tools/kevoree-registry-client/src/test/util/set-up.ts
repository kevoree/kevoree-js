const conf = require('tiny-conf');

export default () => {
  conf.set({
    registry: {
      host: 'localhost',
      port: 8080,
      ssl: false,
      oauth: {
        client_id: 'kevoree_registryapp',
        client_secret: 'kevoree_registryapp_secret',
      },
    },
    user: {
      login: 'kevoree',
    },
  });
};
