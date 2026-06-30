const initial = 1;

const addOne = x => x + 1;
const powerTwo = x => x ** 2;

const pipe = (...args) => (x) => {
    if (args.length === 1) {
        return args[0](x);
    }

    const res = args[0](x);
    return pipe(...args.slice(1, args.length))(res);
}

pipe(addOne, powerTwo, console.log)(initial); // 4
