import React from 'react';
import PropTypes from 'prop-types';
import { LineChart, Tooltip, Line, XAxis, YAxis } from 'recharts';
import Chart from '../Chart';

const ChartUI = Chart.extend({
  construct() {
    this.values = [];
  },

  in_input(msg) {
    this._super(msg);

    if (this.values.length >= this.getXLimit()) {
      this.values = this.values.slice(-this.getXLimit()+1);
      this.values.push(parseInt(msg, 10));
      this.ui.setState({ values: this.values });
    } else {
      this.values = this.values.concat(parseInt(msg, 10));
    }

    if (this.ui) {
      this.ui.setState({ values: this.values });
    }
  },

  getXLimit() {
    return this.dictionary.getNumber('xLimit', Chart.prototype.dic_xLimit.defaultValue);
  },

  setXLimit(value) {
    this.kCore.submitScript(`set ${this.nodeName}.${this.name}.xLimit = '${value}'`);
  },

  update(done) {
    if (this.ui) {
      this.ui.setState({ xLimit: this.getXLimit() });
    }
    done();
  },

  uiFactory() {
    return ReactChart;
  }
});

class ReactChart extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      paused: false,
      values: props.instance.values,
      xLimit: props.instance.getXLimit()
    };
    this.localValues = this.state.values;
  }

  changeXLimit(value) {
    if (!isNaN(value)) {
      this.props.instance.setXLimit(value);
    }
  }

  clear() {
    this.props.instance.values = [];
    this.setState({ values: this.props.instance.values });
  }

  togglePause() {
    if (!this.state.paused) {
      this.localValues = this.state.values;
    } else {
      this.localValues = [];
    }
    this.setState({ paused: !this.state.paused });
  }

  render() {
    let data;
    if (this.state.paused) {
      data = this.localValues.map((value) => ({ value }));
    } else {
      data = this.state.values.map((value) => ({ value }));
    }
    return (
      <div style={{ minWidth: 500, minHeight: 400 }}>
        <div style={{ padding: 5, display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <button onClick={() => this.clear()} style={{ marginRight: 5 }}>Clear</button>
            <button onClick={() => this.togglePause()}>{this.state.paused ? 'Resume' : 'Pause'}</button>
          </div>
          <input type="number" value={this.state.xLimit} onChange={(e) => this.changeXLimit(parseInt(e.target.value, 10))} />
        </div>
        <LineChart width={500} height={350} data={data}>
          <XAxis />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
        </LineChart>
      </div>
    );
  }
}

ReactChart.propTypes = {
  instance: PropTypes.object,
};

module.exports = ChartUI;
