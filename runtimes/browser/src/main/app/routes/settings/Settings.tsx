import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import { AbstractComponent } from '../../components/AbstractComponent';
import { LayoutDesc, Context } from '../../api';
import { Actions, ActionColsChange } from '../../actions';

export interface RouteParams {}
interface UIProps extends RouteComponentProps<RouteParams, {}> {}
export class Settings extends AbstractComponent<UIProps, {}> {

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

  render() {
    const state = this.context.store.getState();

    return (
      <div className="container">
        <span className="uppercase">Dashboard columns settings:</span>
        <div className="row">
          {Object.keys(state.cols).map(key => {
            const keyId = 'cols-' + key;
            return (
              <div key={keyId} className="two columns">
                <label htmlFor={keyId}>{key}</label>
                <input
                    id={keyId}
                    className="u-full-width medium"
                    type="number"
                    min="1"
                    value={state.cols[key]}
                    onChange={this.onColsChange.bind(this, key)} />
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
