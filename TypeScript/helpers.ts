interface IFromServer {
	[str: string]: string;
	[num: number]: string;
	[char: symbol]: symbol;
}

const obj: IFromServer = {
	id: "id",
	key: "key",
	1999: "nineteen ninety nine",
	x: "x",
	y: "y"
};

console.log(obj);