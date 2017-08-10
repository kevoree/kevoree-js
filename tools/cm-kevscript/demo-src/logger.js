const React = require('react');
const PropTypes = require('prop-types');

class Logger extends React.Component {

  constructor(props) {
    super(props);
    this.state = { lines: [], logger: props.logger };
    this.prevTime = Date.now();
  }

  componentDidMount() {
    this.state.logger.on('line', (line) => {
      this.setState({ lines: this.state.lines.concat(line) });
    });

    this.state.logger.on('clear', () => {
      this.setState({ lines: [] });
    });
  }

  componentDidUpdate() {
    if (this.elem) {
      this.elem.scrollTop = this.elem.scrollHeight;
    }
  }

  render() {
    const lines = this.state.lines.slice();
    if (lines.length === 0) {
      lines.push({ message: 'No logs' });
    }

    return (
      <div className="logger-container" ref={(elem) => this.elem = elem}>
        <div className="logger">
          {lines.map((line, i) => (
            <div key={i} className={'line' + (line.level ? ' ' + line.level : '')}>
              {line.message}
              {line.ellapsed ? <span className="time">{'+' + line.ellapsed + 'ms'}</span> : null}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

Logger.propTypes = {
  logger: PropTypes.object,
};

module.exports = Logger;
