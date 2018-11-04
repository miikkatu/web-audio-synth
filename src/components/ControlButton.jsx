import React, { Component } from 'react';

class ControlButton extends Component {
  render() {
    return (
      <div className="ControlButton">
        <div className="Function">{this.props.function}</div>
        <button
          className="Button"
          onClick={() => this.props.onClick(this.props.function)}
        >
          {this.props.value}
        </button>
      </div>
    );
  }
}

export default ControlButton;
