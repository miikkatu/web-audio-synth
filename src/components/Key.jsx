import classnames from 'classnames';
import React, { Component } from 'react';

import MidiNumbers from '../util/midi-numbers';

// These values seem to work
const PITCH_POSITIONS = {
  C: 0,
  Db: 0.8,
  D: 1,
  Eb: 1.8,
  E: 2,
  F: 3,
  Gb: 3.8,
  G: 4,
  Ab: 4.8,
  A: 5,
  Bb: 5.8,
  B: 6
};

class Key extends Component {
  // Key position is represented by the number of natural key widths from
  // the left. This hacky implementation assumes that white keys are 50px wide.
  getAbsoluteKeyPosition = midiNumber => {
    const OCTAVE_WIDTH = 7;
    const { octave, pitchName } = MidiNumbers.getAttributes(midiNumber);
    const pitchPosition = PITCH_POSITIONS[pitchName];
    const octavePosition = OCTAVE_WIDTH * octave;
    return pitchPosition + octavePosition;
  };

  getRelativeKeyPosition = midiNumber => {
    return (
      this.getAbsoluteKeyPosition(midiNumber) -
      this.getAbsoluteKeyPosition(this.props.noteRange.first)
    );
  };

  handlePlayNote = () => {
    // Event will be eventually handled in Synth.jsx
    this.props.onPlayNote(this.props.note);
  };

  handleStopNote = () => {
    // Event will be eventually handled in Synth.jsx
    this.props.onStopNote(this.props.note);
  };

  render() {
    const { accidental, active, midiNumber } = this.props;

    return (
      <div>
        <div
          className={classnames('Key', {
            accidental: accidental,
            active: active
          })}
          onMouseDown={this.handlePlayNote}
          onMouseUp={this.handleStopNote}
          role="button"
          style={{
            left: this.getRelativeKeyPosition(midiNumber) * 50
          }}
          tabIndex={midiNumber}
        />
      </div>
    );
  }
}

export default Key;
