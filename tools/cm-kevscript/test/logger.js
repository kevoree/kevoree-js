const loggerDiv = document.getElementById('logger');

let prevTime = Date.now();

const logger = {
  info(msg) {
    loggerDiv.appendChild(createLine('info', msg));
  },
  debug(msg) {
    loggerDiv.appendChild(createLine('debug', msg));
  },
  warn(msg) {
    loggerDiv.appendChild(createLine('warn', msg));
  },
  error(msg) {
    loggerDiv.appendChild(createLine('error', msg));
  },
  setLevel() {},
  setFilter() {},
};

function createLine(level, msg) {
  const curTime = Date.now();
  const log = document.createElement('div');
  log.innerText = msg;
  log.classList.add('line');
  log.classList.add(level);

  const ellapsedElem = document.createElement('span');
  ellapsedElem.classList.add('time');
  ellapsedElem.innerText = '+' + (curTime - prevTime) + 'ms';
  log.appendChild(ellapsedElem);
  prevTime = curTime;
  return log;
}

module.exports = logger;
