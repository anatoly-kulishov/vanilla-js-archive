let charset = " !\"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\]^_`abcdefghijklmnopqrstuvwxyz{|}~";

function crack(knownPassword) {

  let start = (new Date()).getTime(),
    guess = '',
    c;

  while (guess !== knownPassword) {
    for (let i = 0; i < charset.length; i++) {
      c = charset.charAt(i);
      if (c === knownPassword.charAt(guess.length)) {
        guess += c;
        console.log(guess);
        break;
      }
    }

  }

  console.log('mycrack', ((new Date()) * 1) - start, 'ms');
}

crack('7}Ce9{8V#9W}lStLdE4O');