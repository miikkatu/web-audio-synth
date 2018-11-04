import MidiNumbers from './midi-numbers';

export const createKeyboardShortcuts = ({
  firstNote,
  lastNote
}) => {
  let keyboardConfig = [{
      natural: 'a',
      flat: 'q',
      sharp: 'w'
    },
    {
      natural: 's',
      flat: 'w',
      sharp: 'e'
    },
    {
      natural: 'd',
      flat: 'e',
      sharp: 'r'
    },
    {
      natural: 'f',
      flat: 'r',
      sharp: 't'
    },
    {
      natural: 'g',
      flat: 't',
      sharp: 'y'
    },
    {
      natural: 'h',
      flat: 'y',
      sharp: 'u'
    },
    {
      natural: 'j',
      flat: 'u',
      sharp: 'i'
    },
    {
      natural: 'k',
      flat: 'i',
      sharp: 'o'
    },
    {
      natural: 'l',
      flat: 'o',
      sharp: 'p'
    }
  ];

  let currentMidiNumber = firstNote;
  let keyboardShortcuts = [];
  let keyIndex = 0;

  while (
    // There are still keys left to be assigned
    // Note to be assigned does not surpass range
    keyIndex < keyboardConfig.length &&
    currentMidiNumber <= lastNote
  ) {
    const key = keyboardConfig[keyIndex];
    const {
      isAccidental
    } = MidiNumbers.getAttributes(currentMidiNumber);

    if (isAccidental) {
      keyboardShortcuts.push({
        key: key.flat,
        midiNumber: currentMidiNumber,
      });
    } else {
      keyboardShortcuts.push({
        key: key.natural,
        midiNumber: currentMidiNumber,
      });
      keyIndex += 1;
    }

    currentMidiNumber += 1;
  }
  return keyboardShortcuts;
}