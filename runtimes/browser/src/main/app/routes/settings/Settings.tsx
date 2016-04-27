import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AbstractComponent } from '../../components/AbstractComponent';
import { LayoutDesc, Context } from '../../api';
import { Actions, ActionColsChange, ActionBreakpointsChange } from '../../actions';
import { Button } from '../../components/Button';

export interface RouteParams {}
interface UIProps extends RouteComponentProps<RouteParams, {}> {}
export class Settings extends AbstractComponent<UIProps, void> {

  onColsChange(key: string, event: Event) {
    const val: number = parseInt((event.target as any).value, 10);
    if (val > 0) {
      this.context.store.dispatch<ActionColsChange>({
        type: Actions.COLS_CHANGE,
        key: key,
        value: val
      });
    }
  }

  onBreakpointsChange(key: string, event: Event) {
    const val: number = parseInt((event.target as any).value, 10);
    if (val > 0) {
      this.context.store.dispatch<ActionBreakpointsChange>({
        type: Actions.BRKPTS_CHANGE,
        key: key,
        value: val
      });
    }
  }

  private toggleDevMode() {
    this.context.store.dispatch({ type: 'TOGGLE_DEVMODE' });
  }

  render() {
    const state = this.context.store.getState();

    return (
      <div className='container'>
        <h5 className='uppercase'>Development mode:</h5>
        <div className='row'>
          <Button displaySize='medium' handler={this.toggleDevMode.bind(this)}>
            {(state.devMode)?'Disable':'Enable'}
          </Button>
        </div>
        <hr />

        <h5 className='uppercase'>Dashboard columns settings:</h5>
        <div className='row'>
          {Object.keys(state.cols).map(key => {
            const keyId = 'cols-' + key;
            return (
              <div key={keyId} className='two columns'>
                <label htmlFor={keyId}>{key}</label>
                <input
                    id={keyId}
                    className='u-full-width medium'
                    type='number'
                    min='1'
                    value={state.cols[key]}
                    onChange={this.onColsChange.bind(this, key)} />
              </div>
            );
          })}
        </div>
        <hr />

        <h5 className='uppercase'>Dashboard breakpoints settings:</h5>
        <div className='row'>
          {Object.keys(state.cols).map(key => {
            const keyId = 'brkpts-' + key;
            return (
              <div key={keyId} className='two columns'>
                <label htmlFor={keyId}>{key}</label>
                <input
                    id={keyId}
                    className='u-full-width medium'
                    type='number'
                    min='1'
                    value={state.breakpoints[key]}
                    onChange={this.onBreakpointsChange.bind(this, key)} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
