const React = require('react');
const Ticker = require('../Ticker');

const containerStyle = { flexGrow: 1, padding: 5, minWidth: 230 };
const labelStyle = { fontWeight: 'bold' };
const valueStyle = { float: 'right' };

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
    return class ReactTicker extends React.Component {
      constructor(props) {
        super(props);
        this.state = props.instance.uiState;
      }

      render() {
        return (
          <div style={containerStyle}>
            <div>
              <span style={labelStyle}>Period:</span>
              <span style={valueStyle}>{this.state.period + 'ms'}</span>
            </div>
            <div>
              <span style={labelStyle}>Tick count:</span>
              <span style={valueStyle}>{this.state.count + ''}</span>
            </div>
            <div>
              <span style={labelStyle}>Last tick:</span>
              <span style={valueStyle}>{this.state.value + ''}</span>
            </div>
          </div>
        );
      }
    };
  }
});

module.exports = TickerUI;
