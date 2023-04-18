export default function (min: number, max: number) {
  const rand = Math.floor(Math.random() * (max - min + 1) + min);
  return rand;
}
