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
