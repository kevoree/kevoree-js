const React = require('react');
const Ticker = require('../Ticker');

const containerStyle = {
  padding: 5,
  margin: 0
};

const pStyle = {
  margin: 0,
  fontFamily: '"Helvetica", "Arial", sans-serif'
};

const pullRight = {
  float: 'right'
};

const TickerUI = Ticker.extend({

  construct() {
    this.uiState = {
      count: 0,
      value: null,
      period: this.dic_period.defaultValue
    };
    this.dictionary.on('period', (val) => {
      this.uiState.period = val;
      if (this.ui) {
        this.ui.setState({ period: this.uiState.period });
      }
    });

    const internalSend = this.out_tick;
    this.out_tick = (msg) => {
      this.uiState.count = this.uiState.count + 1;
      this.uiState.value = msg;
      if (this.ui) {
        this.ui.setState(this.uiState);
      }
      internalSend(msg);
    };
  },

  uiFactory() {
    const ReactTicker = React.createClass({
      getInitialState() {
        return this.props.instance.uiState;
      },

      render() {
        return (
          <div style={containerStyle}>
            <p style={pStyle}>
              <strong>Period:
              </strong>
              <span style={pullRight}>{this.state.period + 'ms'}</span>
            </p>
            <p style={pStyle}>
              <strong>Tick count:
              </strong>
              <span style={pullRight}>{this.state.count + ''}</span>
            </p>
            <p style={pStyle}>
              <strong>Last tick:
              </strong>
              <span style={pullRight}>{this.state.value + ''}</span>
            </p>
          </div>
        );
      }
    });

    ReactTicker.propTypes = {
      instance: React.PropTypes.object.isRequired
    };

    return ReactTicker;
  }
});

module.exports = TickerUI;
