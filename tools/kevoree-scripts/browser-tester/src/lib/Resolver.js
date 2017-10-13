import loggerFactory from './logger-factory';

import KevoreeModuleLoader from 'kevoree-module-loader';

export default class Resolver {

  constructor(localDuHashcode) {
    this.localDuHashcode = localDuHashcode;
    this.logger = loggerFactory.create('Resolver');
  }

  install(du) {
    return new Promise((resolve, reject) => {
      this.logger.debug(`Resolving ${du.name}@${du.version}...`);
      const iframe = document.createElement('iframe');
      iframe.id = du.name + '-' + du.version;
      iframe.src = `installer.html?name=${encodeURI(du.name)}&version=${encodeURI(du.version)}&local=${du.hashcode === this.localDuHashcode}`;
      iframe.classList.add('hide');

      const messageListener = (event) => {
        if (event.origin === window.location.origin) {
          switch (event.data.type) {
            case 'error':
              reject(new Error(event.data.error));
              break;

            case 'done':
              window.removeEventListener('message', messageListener);
              resolve(KevoreeModuleLoader.require(du.name, du.version));
              break;

            default:
              break;
          }
        }
      };
      window.addEventListener('message', messageListener);
      document.body.appendChild(iframe);
    });
  }

  uninstall(du) {
    document.getElementById(`${du.name}-${du.version}`).remove();
    return Promise.resolve();
  }

  resolve(du) {
    if (KevoreeModuleLoader.has(du.name, du.version)) {
      return Promise.resolve(KevoreeModuleLoader.require(du.name, du.version));
    } else {
      return this.install(du);
    }
  }
}
