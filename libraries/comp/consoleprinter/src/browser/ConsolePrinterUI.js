var React = require('react');

var ConsolePrinter = require('../ConsolePrinter');
var s = require('./styles');

var ConsolePrinterUI = ConsolePrinter.extend({

  construct: function () {
    this.uiState = { messages: [], maxLines: 25 };
  },

  in_input: function (msg) {
    this._super(msg);
    this.uiState.messages = [].concat(this.uiState.messages).concat(msg);
    if (this.ui) {
      this.ui.setState({ messages: this.uiState.messages });
      this.ui.updateLines();
    }
  },

  uiFactory: function () {
    var ReactConsolePrinter = React.createClass({
      getInitialState: function () {
        return this.props.instance.uiState;
      },

      updateLines: function () {
        var state = this.props.instance.uiState;
        if (state.messages.length > state.maxLines) {
          state.messages = [].concat(state.messages);
          state.messages.splice(0, state.messages.length - state.maxLines);
          this.setState({ messages: state.messages });
        }
      },

      onClear: function () {
        this.props.instance.uiState.messages = [];
        this.setState({ messages: this.props.instance.uiState.messages });
      },

      onMaxLineChange: function (event) {
        this.props.instance.uiState.maxLines = parseInt(event.target.value, 10);
        this.setState({ maxLines: this.props.instance.uiState.maxLines });
        this.updateLines();
      },

      render: function () {
        return (
          <div style={s.container}>
            <div style={s.topPanel}>
              <button style={s.btn} onClick={this.onClear}>Clear</button>
              <input
                type='number'
                value={this.state.maxLines}
                onChange={this.onMaxLineChange}
                style={Object.assign({}, s.maxLines, s.formControl, s.inputSm, s.pullRight)}
              />
            </div>
            <div style={s.listPanel}>
              {this.state.messages.length === 0 && (
                <p style={s.textCenter}>
                  <em>- empty -</em>
                </p>
              )}
              {this.state.messages.length > 0 && (
                <ul>
                  {this.state.messages.map(function (msg, i) {
                    return (
                      <li key={i} style={s.listGroupItem}>{msg}</li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
        );
      }
    });

    ReactConsolePrinter.propTypes = {
      instance: React.PropTypes.object.isRequired
    };

    return ReactConsolePrinter;
  }
});

module.exports = ConsolePrinterUI;
