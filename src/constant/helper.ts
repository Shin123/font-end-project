export const addCommas = (str_: number, comma_?: string) => {
  if (!str_) return 0;
  let str = str_.toString();

  while (str[0] === '0') str = str.substring(1, str.length);

  const comma = comma_ || ',';

  let s = str;
  let tail = '';

  const dot = str.indexOf(comma === ',' ? '.' : ',');

  if (dot >= 0 && dot !== str.length - 1) {
    tail = str.substring(dot + 1, str.length);

    if (comma === ',') {
      tail = `.${tail}`;
    } else {
      tail = `,${tail}`;
    }

    s = str.substring(0, dot);
  }

  let signed = false;
  if (s[0] === '-') {
    signed = true;
  }

  s = s.replace(/\D/g, '');

  if (s.length < 4) return `${s}${tail}`;

  let temp = '';
  let n = 0;

  for (let i = s.length - 1; i >= 0; i -= 1) {
    temp = `${s[i]}${temp}`;
    n += 1;
    if (n % 3 === 0 && i > 0) temp = `${comma}${temp}`;
  }
  return `${signed ? '-' : ''}${temp}${tail}`;
};
