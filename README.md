# Web Audio Synth

A simple synth that can be played with a MIDI controller, but also with the computer keyboard or mouse.

## Technologies

- [Create React App](https://github.com/facebookincubator/create-react-app)
- [Tone.js](https://tonejs.github.io)
- [React Draggable](https://github.com/mzabriskie/react-draggable)

## Scripts

- Run `npm start` to run the app

## Configuration

Synth and note range are configured in `config.js`. When playing with the computer keyboard, the key A is mapped to the first note on the keyboard.

## Web MIDI

To play using a MIDI controller, just connect one to your computer and make sure your browser supports Web MIDI API. At least Chrome does.

## References

Implementation is partially based on [React Piano](https://github.com/iqnivek/react-piano).
