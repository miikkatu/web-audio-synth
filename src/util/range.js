function* generateRange(start, end, step = 1) {
  while (start < end) {
    yield start;
    start += step;
  }
}

// Builds a range and returns it in an array
export const range = (start, end, step) => {
  return Array.from(generateRange(start, end, step));
}