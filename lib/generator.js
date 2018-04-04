const generator = function({ quote, author }) {
  return Promise.resolve('buffer from generator');
};

export default generator;
