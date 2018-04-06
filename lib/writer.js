import Im from '../modules/im';

const writer = ({ author, quote }) => {
  return new Im('#ffffff')
    .size('500x')
    .background('#ffffff')
    .fontSize(40)
    .text(`${author}:\n${quote}\n\nme:`)
    .buffer('png');
};

export default writer;
