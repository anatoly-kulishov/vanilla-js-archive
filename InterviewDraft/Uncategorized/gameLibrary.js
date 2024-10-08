class GameLibrary {
    constructor() {
        this.collection = [];
    }

    addGameInCollection() {}

    removeGameFromCollection() {}

    getAllCollection() {}
}

class Steam extends GameLibrary {
    constructor() {
        super();
    }

    addGameInCollection(game) {
        super.addGameInCollection();
        this.collection.push(game)
        return this
    }

    removeGameFromCollection(game) {
        super.removeGameFromCollection();
        const index = this.collection.indexOf(this.collection.find(el => el === game));

        if (index > -1) {
            this.collection.splice(index, 1);
        }

        return this
    }

    getAllCollection() {
        super.getAllCollection();
        return this.collection;
    }
}

const steam = new Steam();

steam
    .addGameInCollection('Diablo')
    .addGameInCollection('Diablo 2')
    .addGameInCollection('Diablo 3')
    .addGameInCollection('Diablo 4');

console.log(steam.getAllCollection()); // [ 'Diablo', 'Diablo 2', 'Diablo 3', 'Diablo 4' ]

steam
    .removeGameFromCollection('Diablo 4')
    .removeGameFromCollection('Diablo 3');

console.log(steam.getAllCollection()); // [ 'Diablo', 'Diablo 2' ]



