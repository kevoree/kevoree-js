const React = require('react');
const MsgSender = require('../MsgSender');

const MsgSenderUI = MsgSender.extend({

  uiFactory() {
    const containerStyle = {
      display: 'flex',
      flexGrow: 1,
      padding: 5,
      height: 22,
    };
    const inputStyle = {
      flexGrow: 1,
    };

    return class ReactTicker extends React.Component {
      constructor(props) {
        super(props);
        this.state = { value: '' };
      }

      onChange(e) {
        this.setState({ value: e.target.value });
      }

      onKeyPress(e) {
        if (e.charCode === 13 || e.keyCode === 13) { // 'enter' key
          this.onClick();
        }
      }

      onClick() {
        this.props.instance.out_send(this.state.value);
        this.setState({ value: '' }); // reset field value after send
      }

      render() {
        return (
          <div style={containerStyle}>
            <input
              type="text"
              style={inputStyle}
              value={this.state.value}
              onChange={(e) => this.onChange(e)}
              onKeyPress={(e) => this.onKeyPress(e)} />
            <button onClick={() => this.onClick()}>Send</button>
          </div>
        );
      }
    };
  }
});

module.exports = MsgSenderUI;
