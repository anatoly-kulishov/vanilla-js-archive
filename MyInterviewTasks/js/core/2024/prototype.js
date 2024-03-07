let z = { d: 10 };
let b = z;
b.d = 11;

if(b.d === z.d) console.log('Bad...') //

let a = 1
a.toString()
if(typeof a == 'number') console.log('Why?') //
