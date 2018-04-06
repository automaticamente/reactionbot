import Im from '../modules/im';

const composer = ({ topImage, bottomImage }) => {
  return new Im().appendVertical([topImage, bottomImage]).buffer('png');
};
