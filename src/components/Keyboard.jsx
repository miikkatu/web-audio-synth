import React, { Component } from 'react';

import { Key } from './';
import MidiNumbers from '../util/midi-numbers.js';
import { range } from '../util/range';

class Keyboard extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }

  getMidiNumbers() {
    return range(this.props.noteRange.first, this.props.noteRange.last + 1);
  }

  getMidiNumberForKey = key => {
    if (!this.props.keyboardShortcuts) {
      return null;
    }
    const shortcut = this.props.keyboardShortcuts.find(sh => sh.key === key);
    return shortcut && shortcut.midiNumber;
  };

  getNaturalKeyCount() {
    return this.getMidiNumbers().filter(number => {
      const { isAccidental } = MidiNumbers.getAttributes(number);
      return !isAccidental;
    }).length;
  }

  onKeyDown = event => {
    if (event.repeat) {
      return;
    }

    // Don't conflict with existing combinations like ctrl + t
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const midiNumber = this.getMidiNumberForKey(event.key);
    if (midiNumber) {
      const { note } = MidiNumbers.getAttributes(midiNumber);
      this.props.onPlayNote(note);
    }
  };

  onKeyUp = event => {
    // Don't conflict with existing combinations like ctrl + t
    if (event.ctrlKey || event.metaKey || event.shiftKey) {
      return;
    }

    const midiNumber = this.getMidiNumberForKey(event.key);
    if (midiNumber) {
      const { note } = MidiNumbers.getAttributes(midiNumber);
      this.props.onStopNote(note);
    }
  };

  render() {
    return (
      <div className="Keyboard">
        {this.getMidiNumbers().map(midiNumber => {
          const { isAccidental, note } = MidiNumbers.getAttributes(midiNumber);
          const isActive = this.props.activeNotes.includes(note);

          return (
            <Key
              accidental={isAccidental}
              active={isActive}
              key={midiNumber}
              midiNumber={midiNumber}
              note={note}
              noteRange={this.props.noteRange}
              onPlayNote={this.props.onPlayNote}
              onStopNote={this.props.onStopNote}
            />
          );
        })}
      </div>
    );
  }
}

export default Keyboard;
