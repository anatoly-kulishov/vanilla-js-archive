interface IName {
	name: string;
}

function isName(obj: unknown): obj is IName {
	return obj !== null && typeof obj === 'object' && 'name' in obj;
}

const getName = (obj: unknown): string | null  => {
	if(isName(obj)) {
		return obj.name;
	}

	return null;
}

const userName = getName({name: 'abc'})?.slice(1)
/** **************************************************************************** **/
interface User {
	name: string
}

interface Human extends User {
	speak: () => void
}

interface Animal extends User {
	color: string
}

const serverInfo: Human = <Human>{
	name: 'Anatoly',
	speak: () => {
		console.log('Hello!')
	}
}

function isHuman(serverInfo: User): serverInfo is Human {
	return typeof (serverInfo as Human).speak === 'function';
}

if (isHuman(serverInfo)) {
	serverInfo.speak();
}


