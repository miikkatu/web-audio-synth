import React, { Component } from 'react';
import Draggable from 'react-draggable';

class Slider extends Component {
  convertValue = (value, limit) => {
    // Make the slider scale go from 0 to 100. Limit comes
    // from the bottom bounds property of the Draggable element
    let convertedValue = value - limit;
    convertedValue = convertedValue - convertedValue * 2;
    const factor = 100 / limit;

    return parseInt(convertedValue * factor, 10);
  };

  handleDrag = (e, data) => {
    this.props.onMoveSlider(this.convertValue(data.y, 80));
  };

  render() {
    const defaultPosition = 80 - this.props.defaultPosition;
    return (
      <div className="Slider">
        <div className="Function">{this.props.function}</div>
        <div className="Draggable">
          <Draggable
            axis="y"
            bounds={{ left: 0, top: 0, right: 0, bottom: 80 }}
            defaultPosition={{ x: 0, y: defaultPosition }}
            onDrag={this.handleDrag}
          >
            <div className="Handle" />
          </Draggable>
        </div>
      </div>
    );
  }
}

export default Slider;
