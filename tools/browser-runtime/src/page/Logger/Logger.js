import React from 'react';
import { List, Menu, Button, Dropdown, Input } from 'semantic-ui-react';

import PageContent from '../../component/PageContent';

import './Logger.css';

const LEVEL_OPTIONS = [
  {
    text: 'DEBUG',
    value: 'debug',
    label: { color: 'teal', empty: true, circular: true },
  },
  {
    text: 'INFO',
    value: 'info',
    label: { color: 'grey', empty: true, circular: true },
  },
  {
    text: 'WARN',
    value: 'warn',
    label: { color: 'orange', empty: true, circular: true },
  },
  {
    text: 'ERROR',
    value: 'error',
    label: { color: 'red', empty: true, circular: true },
  },
];

const LEVELS = {
  debug: 0,
  info: 1,
  warn: 2,
  error: 3,
};

function level2class(level) {
  switch (level) {
    case 'debug':
      return 'teal';

    default:
      return 'grey';

    case 'warn':
      return 'orange';

    case 'error':
      return 'red';
  }
}

export default class Logger extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logs: props.services.logger.logs,
      level: props.services.logger.level,
      filter: '',
    };
  }

  handleFilter = (evt) => {
    this.setState({ filter: evt.target.value });
  }

  clear = () => {
    this.props.services.logger.clear();
  }

  setLevel(level) {
    this.props.services.logger.level = level;
    this.setState({ level });
  }

  componentDidMount() {
    this.props.services.logger.on('log', this.onLog);
    this.props.services.logger.on('clear', this.onClear);
  }

  componentWillUnmount() {
    this.props.services.logger.off('log', this.onLog);
    this.props.services.logger.off('clear', this.onClear);
  }

  onLog = () => {
    this.setState({ logs: this.props.services.logger.logs });
  }

  onClear = () => {
    this.setState({ logs: this.props.services.logger.logs });
  }

  render() {
    const logs = this.state.logs
      .filter(({ level }) => LEVELS[level] >= LEVELS[this.state.level])
      .filter(({ tag, msg, name }) => tag.match(this.state.filter) || name.match(this.state.filter) || msg.match(this.state.filter));

    return (
      <PageContent title='Logger'>
        <div className='Logger-container'>
          <Menu secondary className='Logger-menu'>
            <Menu.Menu position='left'>
              <Menu.Item>
                <Dropdown text='Filter logs' icon='filter' floating labeled button className={`icon ${level2class(this.state.level)}`}>
                  <Dropdown.Menu>
                    <Input icon='search' iconPosition='left' value={this.state.filter} onChange={this.handleFilter} onClick={(evt) => evt.stopPropagation()} />
                    <Dropdown.Divider />
                    <Dropdown.Header icon='tags' content='Level' />
                    <Dropdown.Menu scrolling>
                      {LEVEL_OPTIONS.map((option) => (
                        <Dropdown.Item key={option.value} active={option.value === this.state.level} onClick={() => this.setLevel(option.value)} {...option} />
                      ))}
                    </Dropdown.Menu>
                  </Dropdown.Menu>
                </Dropdown>
              </Menu.Item>
            </Menu.Menu>
            <Menu.Menu position='right'>
              <Menu.Item>
                <Button primary className='orange' onClick={this.clear} disabled={this.state.logs.length === 0}>Clear</Button>
              </Menu.Item>
            </Menu.Menu>
          </Menu>
          <List className='Logger' divided inverted relaxed size='tiny'>
            {logs.length === 0
              ? (
                <List.Item>
                  <List.Content><em>- empty -</em></List.Content>
                </List.Item>
              )
              : logs.map(({ level, tag, name, msg }, i) => (
                <List.Item key={i}>
                  <List.Content className={'Logger-line-' + level}>
                    <span className='logger-fixed'>{tag}</span>
                    <span className='logger-fixed'>{name}</span>
                    <pre>{msg}</pre>
                  </List.Content>
                </List.Item>
              ))}
          </List>
        </div>
      </PageContent>
    );
  }
}
