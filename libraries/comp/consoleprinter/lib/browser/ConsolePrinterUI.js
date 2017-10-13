import React from 'react';

import ConsolePrinter from '../ConsolePrinter';
import s from './styles';

const ConsolePrinterUI = ConsolePrinter.extend({

  construct() {
    this.uiState = { messages: [], maxLines: 25 };
  },

  in_input(msg) {
    this._super(msg);
    this.uiState.messages = [].concat(this.uiState.messages).concat(msg);
    if (this.ui) {
      this.ui.setState({ messages: this.uiState.messages });
      this.ui.updateLines();
    }
  },

  uiFactory() {
    return class ReactConsolePrinter extends React.Component {
      constructor(props) {
        super(props);
        this.state = props.instance.uiState;
      }

      updateLines() {
        const state = this.props.instance.uiState;
        if (state.messages.length > state.maxLines) {
          state.messages = [].concat(state.messages);
          state.messages.splice(0, state.messages.length - state.maxLines);
          this.setState({ messages: state.messages });
        }
      }

      onClear() {
        this.props.instance.uiState.messages = [];
        this.setState({ messages: this.props.instance.uiState.messages });
      }

      onMaxLineChange(value) {
        this.props.instance.uiState.maxLines = parseInt(value, 10);
        this.setState({ maxLines: this.props.instance.uiState.maxLines });
        this.updateLines();
      }

      render() {
        return (
          <div style={s.container}>
            <div style={s.topPanel}>
              <button style={s.btn} onClick={() => this.onClear()}>Clear</button>
              <input
                type='number'
                value={this.state.maxLines}
                onChange={(e) => this.onMaxLineChange(e.target.value)}
                style={Object.assign({}, s.maxLines, s.formControl, s.inputSm, s.pullRight)}
              />
            </div>
            <div style={s.listPanel}>
              {this.state.messages.length > 0 ? (
                <ul style={s.list}>
                  {this.state.messages.map((msg, i) => {
                    return (
                      <li key={i} style={s.listItem}>{msg}</li>
                    );
                  })}
                </ul>
              ) : (<em style={s.emptyList}>- no messages -</em>)}
            </div>
          </div>
        );
      }
    };
  }
});

module.exports = ConsolePrinterUI;
