import React, { Component } from 'react';
import Tone from 'tone';

import { ControlButton, Keyboard, Slider, Wheel } from './';
import config from '../config';
import { createKeyboardShortcuts } from '../util/keyboard-shortcuts';
import MidiNumbers from '../util/midi-numbers';

class Synth extends Component {
  constructor(props) {
    super(props);

    this.midi = undefined;
    this.data = undefined;

    // Initialize access to MIDI controller
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess({
          sysex: false
        })
        .then(this.onMIDISuccess, this.onMIDIFailure);
    } else {
      console.warn('No MIDI support in your browser');
    }

    this.state = {
      activeNotes: [],
      oscillator: config.oscillator[0]
    };

    this.synth = new Tone.PolySynth(4, Tone.Synth, config.synth).toMaster();
  }

  handlePlayNote = note => {
    this.setState(prevState => ({
      activeNotes: prevState.activeNotes.concat(note)
    }));

    // Start playing given note
    this.synth.triggerAttack(note);
  };

  handleStopNote = note => {
    this.setState({
      activeNotes: this.state.activeNotes.filter(prevNote => prevNote !== note)
    });

    // Stop playing given note
    this.synth.triggerRelease(note);
  };

  onMIDISuccess = midiData => {
    this.midi = midiData;
    var allInputs = this.midi.inputs.values();

    // Loop over all available inputs and listen for any MIDI input
    for (
      var input = allInputs.next();
      input && !input.done;
      input = allInputs.next()
    ) {
      // When a MIDI value is received, handle it
      input.value.onmidimessage = this.gotMIDImessage;
    }
  };

  onMIDIFailure = () => {
    console.warn('No MIDI controller');
  };

  getMIDIAction = data => {
    if (data === 144) return 'startNote';
    else return 'stopNote';
  };

  gotMIDImessage = messageData => {
    const action = this.getMIDIAction(messageData.data[0]);
    const { note } = MidiNumbers.getAttributes(messageData.data[1]);

    action === 'startNote'
      ? this.handlePlayNote(note)
      : this.handleStopNote(note);
  };

  handleClickControlButton = control => {
    const items = config[control];
    const index = config[control].indexOf(this.state[control]);

    // Set the next value in the list of options
    let nextValue;
    if (index < items.length - 1) {
      nextValue = config[control][index + 1];
    } else {
      nextValue = config[control][0];
    }

    this.setState({
      [control]: nextValue
    });

    if (control === 'oscillator') {
      this.synth.set('oscillator', { type: nextValue });
    }
  };

  handleMoveSlider = value => {
    this.setVolume(value);
  };

  handleMoveWheel = value => {
    this.synth.set('detune', value * 10);
  };

  setVolume = value => {
    this.synth.set('volume', value / 3 - 25);
  };

  render() {
    // Render one octave
    const noteRange = {
      first: MidiNumbers.fromNote(config.noteRange.first),
      last: MidiNumbers.fromNote(config.noteRange.last)
    };

    const keyboardShortcuts = createKeyboardShortcuts({
      firstNote: noteRange.first,
      lastNote: noteRange.last
    });

    return (
      <div className="Synth">
        <div className="Logo" title="Borg React Synthesizer 7">
          <div className="Brand">Borg</div>
          <div className="Model">RS-7</div>
          <div className="Description">
            Digital MIDI Controllable Synthesizer
          </div>
        </div>
        <div className="Player">
          <Wheel function="pitch" onMoveWheel={this.handleMoveWheel} />
          <Keyboard
            activeNotes={this.state.activeNotes}
            keyboardShortcuts={keyboardShortcuts}
            noteRange={noteRange}
            onPlayNote={this.handlePlayNote}
            onStopNote={this.handleStopNote}
          />
          <div className="Controls">
            <div className="ControlButtons">
              <ControlButton
                function="oscillator"
                onClick={this.handleClickControlButton}
                value={this.state.oscillator}
              />
            </div>
            <Slider
              defaultPosition={20}
              function="volume"
              onMoveSlider={this.handleMoveSlider}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Synth;
