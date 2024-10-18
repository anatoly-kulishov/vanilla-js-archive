// (function question() {
//     class Fruit {}
//
//     Object.assign(Fruit.prototype, {
//         color: 'red',
//         names: [],
//         addName(name) {
//             this.names.push(name);
//         }
//     });
//
//     const fruit1 = new Fruit();
//     const fruit2 = new Fruit();
//
//     fruit1.color = 'yellow';
//
//     fruit1.addName('banana');
//     fruit1.addName('coconut');
//
//     console.log('20:', fruit1.color, fruit2.color);
//     console.log('21:', fruit1.names, fruit2.names);
//
//     delete fruit2.names;
//     console.log('24:', fruit2.names, Fruit.prototype.names);
//
//     fruit2.names = [];
//     fruit2.addName('apple');
//
//     console.log('29:', fruit1.names, fruit2.names);
//
//     console.log('31:', Fruit.prototype);
//     console.log('32:', Fruit.prototype.constructor);
//     console.log('33:', Fruit.prototype.constructor.prototype);
//     console.log('34:', Fruit.prototype.constructor.prototype.prototype);
// })();

/** **************************************************************************************************************** **/

// (function question2() {
//     try {
//         let x = 4;
//         if (true) {
//             console.log("x_let:", x);
//             let x = 5;
//         }
//     } catch (err) {
//         console.log("x_let:error");
//     }
//
//     try {
//         const y = 4;
//         if (true) {
//             const y = 5;
//             console.log("y_const_1:", y);
//         }
//         console.log("y_const_2:", y);
//     } catch (err) {
//         console.log("y_const_1:error");
//     }
// })();

/** **************************************************************************************************************** **/

// (function question3() {
//     const p = Promise.reject();
//
//     p
//         .then(
//             () => console.log('6'),
//         )
//         .catch(
//             () => console.log('9')
//         ).then(
//         () => console.log('11'),
//     );
//
//     p
//         .then(
//             () => console.log('16'),
//         )
//         .catch(
//             () => console.log('19')
//         ).then(
//         () => console.log('21'),
//     );
// })();

/** **************************************************************************************************************** **/

// (function question4() {
//     const p = new Promise((_, reject) => {
//         setTimeout(() => {
//             console.log('reject');
//             reject();
//         }, 2000)
//     });
//
//     p
//         .then(
//             () => console.log('10'),
//             () => console.log('11'),
//         )
//         .then(
//             () => console.log('13'),
//             () => console.log('14'),
//         );
//
//     p
//         .then(
//             () => console.log('18'),
//             () => console.log('19'),
//         );
//
//     p
//         .then(
//             () => console.log('23'),
//             () => console.log('24'),
//         );
// })();

/** **************************************************************************************************************** **/

// (function question5() {
//     let baz = 0;
//
//     let foo = {
//         bar1: function () {return this.baz},
//         bar2: () => this.baz,
//         baz: 1
//     };
//
//     let fooCopy = {
//         bar1: foo.bar1,
//         bar2: foo.bar2,
//         baz: 2
//     };
//
//     console.log(fooCopy.bar1());
//     console.log(fooCopy.bar2());
// })();

/** **************************************************************************************************************** **/

// (function question6() {
//     const person = {
//         name: 'Alex'
//     };
//
//     (function (person) {
//         person = {
//             name: 'Bob'
//         }
//     })(person);
//
//     console.log(person.name);
// })();

/** **************************************************************************************************************** **/

// (function question7() {
//     const f0 = () => { console.log(0); return 0 }
//     const f1 = () => { console.log(1); return 1 }
//     const f2 = () => { console.log(2); return 2 }
//     const f3 = () => { console.log(3); return 3 }
//     const f4 = () => { console.log(4); return 4 }
//
//     console.log(f0() || f1() && f2() || f3() && f4());
// })();

/** **************************************************************************************************************** **/

// function makeGroup() {
//     let people = [];
//
//     let i = 0;
//
//     while (i < 10) {
//         let man = function () {
//             console.log(i);
//         };
//         people.push(man);
//         i++;
//     }
//
//     return people
// }
//
// let group = makeGroup();
//
// group[0](); //
// group[5](); //

/** **************************************************************************************************************** **/

// function Example() {
//     const [flag, setFlag] = React.useState(false);
//
//     React.useEffect(() => {
//         setFlag(true);
//
//         console.log('effect run');
//
//         return () => console.log('effect clean up');
//     }, [flag])
//
//     console.log('render');
//
//     return null
// }