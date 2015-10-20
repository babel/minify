const CHARSET = 'abcdefghijklmnopqrstuvwxyz' +
                'ABCDEFGHIJKLMNOPQRSTUVWXYZ$_0123456789';

// Algorithm adapted from uglifyjs2
class Base54 {
  constructor() {
    this._frequency = Object.create(null);
    this._chars = CHARSET.split('')
                         .map(ch => ch.charCodeAt(0));
    this._chars.forEach(ch => this._frequency[ch] = 0);
  }

  sort() {
    this._chars = this._chars.sort((a, b) => {
      if (isDigit(a) && !isDigit(b)) {
        return 1;
      }
      if (isDigit(b) && !isDigit(a)) {
        return -1;
      }
      return this._frequency[b] - this._frequency[a];
    });
  }

  consider(str) {
    for (let i = 0; i < str.length; i++) {
      let code = str.charCodeAt(i);
      if (code in this._frequency) {
        this._frequency[code] += 1;
      }
    }
  }

  name(num) {
    let ret = '';
    let base = 54;
    num++;
    do {
      num--;
      ret += String.fromCharCode(this._chars[num % base]);
      num = Math.floor(num / base);
      base = 64;
    } while (num > 0);
    return ret;
  }
}

function isDigit(code) {
    return code >= 48 && code <= 57;
}

module.exports = Base54;
