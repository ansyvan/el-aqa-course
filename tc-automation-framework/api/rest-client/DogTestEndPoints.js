class DogTestEndPoints {
    static getRootEndPoint() {
        return '';
    }

    static getAllBreedsEndPoint() {
        return 'breeds/list/all';
    }

    static getRandomDogImageEndPoint() {
        return 'breeds/image/random';
    }

    static getAllImagesByBreedEndPoint(breed) {
        return `breed/${breed}/images`;
    }

    static getListOfSubBreedsEndPoint(breed) {
        return `breed/${breed}/list`;
    }
}

module.exports = DogTestEndPoints;
