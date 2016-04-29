import * as React from 'react';
import { Actions, Action } from '../actions/Actions';
import styles from './styles';

const CREATE = 'Create instance';
const REMOVE = 'Remove instance';
const START = 'Start instance';
const STOP = 'Stop instance';

interface UIProps {
  onCreate: () => void;
  onRemove: () => void;
  onStart: () => void;
  onStop: () => void;
}

interface UIState {
  started?: boolean;
  actions?: { [name:string]: Action };
}

export class LifecycleActions extends React.Component<UIProps, UIState>  {

  constructor(props: UIProps) {
    super(props);
    this.state = {
      started: false,
      actions: {
        [CREATE]: {
          enabled: true,
          handler: () => { this.createInstance(); }
        },
        [REMOVE]: {
          enabled: false,
          handler: () => { this.removeInstance(); }
        },
        [START]: {
          enabled: false,
          handler: () => { this.startInstance(); }
        },
        [STOP]: {
          enabled: false,
          handler: () => { this.stopInstance(); }
        }
      }
    };
  }

  createInstance() {
    this.state.actions[CREATE].enabled = false;
    this.state.actions[REMOVE].enabled = true;
    this.state.actions[START].enabled = true;
    this.setState({ actions: this.state.actions });
    this.props.onCreate();
  }

  removeInstance() {
    this.state.actions[CREATE].enabled = true;
    this.state.actions[REMOVE].enabled = false;
    this.state.actions[START].enabled = false;
    this.state.actions[STOP].enabled = false;
    this.setState({ actions: this.state.actions });
    this.props.onRemove();
  }

  startInstance() {
    this.state.actions[START].enabled = false;
    this.state.actions[STOP].enabled = true;
    this.setState({ actions: this.state.actions });
    this.props.onStart();
  }

  stopInstance() {
    this.state.actions[START].enabled = true;
    this.state.actions[STOP].enabled = false;
    this.setState({ actions: this.state.actions });
    this.props.onStop();
  }

  render(): JSX.Element {
    return (<Actions actions={this.state.actions} />);
  }
}
