interface IPerson {
	name: string;
	surname: string
}

interface IUser extends IPerson {
	userId: number
}

class Person {
	public name: string;
	public surname: string;

	constructor(props: IPerson) {
		this.name = props.name;
		this.surname = props.surname;
	}

	protected printInfo() {
	}
}

class User extends Person {
	static userDoc: string = "Documentation...";
	private readonly userId: number;
	private readonly userPrivateId!: number

	constructor(props: IUser) {
		super(props);
		this.userId = props.userId
	}

	public override printInfo() {
		console.log(this);
	}
}

const user = new User({
	userId: 1,
	name: "Anatoly",
	surname: "Kulishov",
});

user.printInfo(); // {name: "Anatoly", surname: "Kulishov", userId: 1, constructor: Object, printInfo: ƒ ()}
console.log(User.userDoc) // Documentation...

interface IAnimal {
	name: string
	age: number
	voiceSound: string
	getVoice: () => string
}

class Animal implements IAnimal {
	name: string;
	voiceSound: string;
	age: number;

	constructor(props: Omit<IAnimal, 'getVoice'>) {
		this.name = props.name;
		this.voiceSound = props.voiceSound;
		this.age = props.age;
	}

	getVoice(): string {
		return this.voiceSound;
	}
}

const dog = new Animal({name: 'Rex', age: 5, voiceSound: 'wuf-wuf'})
const cat = new Animal({name: 'Kit', age: 3, voiceSound: 'muf-muf'})

console.log(dog.getVoice()) // wuf-wuf
console.log(cat.getVoice()) // muf-muf