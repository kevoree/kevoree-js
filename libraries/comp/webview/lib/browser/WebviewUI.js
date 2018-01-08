import React from 'react';
import Webview from '../Webview';

const containerStyle = { display: 'flex', flewGrow: 1 };
const iframeStyle = {
  boxSizing: 'border-box',
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
};

const WebviewUI = Webview.extend({

  construct() {
    this.uiState = { url: this.dic_url.defaultValue };
    this.dictionary.on('url', (val) => {
      this.uiState.url = val;
      if (this.ui) {
        this.ui.setState({ url: this.uiState.url });
      }
    });
  },

  start(done) {
    done();
  },

  uiFactory() {
    return class ReactWebview extends React.Component {
      constructor(props) {
        super(props);
        this.state = props.instance.uiState;
      }

      render() {
        return (
          <div style={containerStyle}>
            <iframe
              title='Web View'
              src={this.state.url}
              frameBorder='0'
              marginHeight='0'
              marginWidth='0'
              style={iframeStyle}></iframe>
          </div>
        );
      }
    };
  }

});

module.exports = WebviewUI;
