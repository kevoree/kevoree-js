import * as React from 'react';
import * as Radium from 'radium';

interface UIProps extends React.HTMLProps<Button> {
  handler: Function;
  keyCodes?: number[];
  displaySize?: 'small' | 'medium' | 'normal';
}

@Radium
export class Button extends React.Component<UIProps, void> {

  processClick(event: MouseEvent) {
    event.preventDefault();
    event.stopPropagation();
    this.props.handler();
    (event.target as any).blur();
  }

  processKey(event: KeyboardEvent) {
    const keyCodes = this.props.keyCodes || [13];
    if (keyCodes.indexOf(event.keyCode) !== -1) {
      event.preventDefault();
      event.stopPropagation();
      this.props.handler();
      (event.target as any).blur();
    }
  }

  render(): JSX.Element {
    return (
      <button
          className={this.props.displaySize || 'normal'}
          onClick={this.processClick.bind(this)}
          onKeyDown={this.processKey.bind(this)}
          style={this.props.style}>
        {this.props.children}
      </button>
    );
  }
}
