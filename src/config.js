const synth = {
  detune: 0,
  envelope: {
    attack: 0.01,
    decay: 0.01,
    release: 1,
    sustain: 2
  },
  harmonicity: 3,
  modulation: {
    type: 'sine'
  },
  modulationEnvelope: {
    attack: 0.5,
    decay: 0,
    release: 0.5,
    sustain: 1
  },
  modulationIndex: 10,
  oscillator: {
    type: 'sine'
  },
  volume: -12
};

export default {
  noteRange: {
    first: 'c2',
    last: 'c4'
  },
  oscillator: [
    'sine',
    'square',
    'triangle',
    'sawtooth'
  ],
  synth
}