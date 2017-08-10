const React = require('react');
const PropTypes = require('prop-types');

class Model extends React.Component {

  componentDidUpdate() {
    if (this.elem) {
      hljs.highlightBlock(this.elem);
    }
  }

  render() {
    return (
      <pre ref={(elem) => this.elem = elem} className="hljs json">
        {this.props.model}
      </pre>
    );
  }
}

Model.propTypes = {
  model: PropTypes.string,
};

module.exports = Model;
