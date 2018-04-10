import Im from '../modules/im';

const writer = ({ author, quote }) => {
  return new Im('')
    .background('#ffffff')
    .size('500x')
    .font('Liberation-Sans')
    .fontSize(36)
    .text(`${author}:\n${quote}\n\neu:`)
    .buffer('png');
};

export default writer;
