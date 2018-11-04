import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Wheel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // This is used to reset handle position after dragging
      position: { x: 0, y: 70 }
    };
  }

  convertValue = value => {
    return value - value * 2;
  };

  handleDrag = (e, data) => {
    let y = data.y - 70;
    y = this.convertValue(y);
    this.props.onMoveWheel(y);
  };

  render() {
    return (
      <div className="Wheel">
        <div className="Function">{this.props.function}</div>
        <div className="Draggable">
          <Draggable
            axis="y"
            bounds={{ left: 0, top: 0, right: 0, bottom: 140 }}
            defaultPosition={{ x: 0, y: 70 }}
            onDrag={this.handleDrag}
            onStop={() => this.handleDrag(null, { y: 70 })}
            position={this.state.position}
          >
            <div className="Handle" />
          </Draggable>
        </div>
      </div>
    );
  }
}

export default Wheel;
