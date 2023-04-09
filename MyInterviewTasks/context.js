var a = 404;

const obj = {
	a: 10,
	getF() {
		console.log("F", this.a); // ?

		function getF2() {
			console.log("F2", this.a); // ?
		}

		getF3 = () => {
			console.log("F3", this.a); // ?
		};

		getF2();
		getF3();
	},

	getF4: () => {
		console.log("F4", this.a); // ?
	},

	getF5() {
		console.log("F5", this.a); // ?
	},
};

obj.getF();
obj.getF4();
obj.getF5();

