const React = require('react');
const MsgSender = require('../MsgSender');

const MsgSenderUI = MsgSender.extend({

  uiFactory() {
    const containerStyle = { padding: 5 };
    const btnStyle = { float: 'right' };

    const ReactTicker = React.createClass({

      getInitialState() {
        return { value: '' };
      },

      onChange(e) {
        this.setState({ value: e.target.value });
      },

      onKeyPress(e) {
        if (e.charCode === 13 || e.keyCode === 13) { // 'enter' key
          this.onClick();
        }
      },

      onClick() {
        this.props.instance.out_send(this.state.value);
        this.setState({ value: '' }); // reset field value after send
      },

      render() {
        return (
          <div style={containerStyle}>
            <input
              type="text"
              value={this.state.value}
              onChange={(e) => this.onChange(e)}
              onKeyPress={(e) => this.onKeyPress(e)} />
            <button
              onClick={() => this.onClick()}
              style={btnStyle}>Send</button>
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

module.exports = MsgSenderUI;
