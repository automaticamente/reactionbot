import Im from '../modules/im';

const writer = ({ author, quote }) => {
  return new Im('#ffffff')
    .size('500x')
    .fontSize(40)
    .text(`${author}:\n${quote}\n\neu:`)
    .buffer('png');
};

export default writer;
