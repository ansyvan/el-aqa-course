
class TestEndPoints {
    static getStarShipByIdEndPoint(starShipId) {
        return `starships/${starShipId}/`;
    }

    static getPersonByIdEndPoint(personId) {
        return `people/${personId}/`;
    }

    static getPlanetByIdEndPoint(planetId) {
        return `planets/${planetId}/`;
    }

    static getFilmByIdEndPoint(filmId) {
        return `films/${filmId}/`;
    }

    static getPersonByNameEndPoint(personName) {
        return `people/?search=${encodeURIComponent(personName)}`;
    }

    static getStarShipByNameEndPoint(starShipName) {
        return `starships/?search=${encodeURIComponent(starShipName)}`;
    }

    static getFilmByNameEndPoint(filmName) {
        return `films/?search=${encodeURIComponent(filmName)}`;
    }

    static getVehicleByNameEndPoint(vehicleName) {
        return `vehicles/?search=${encodeURIComponent(vehicleName)}`;
    }

    static getAllStarshipsEndPoint() {
        return 'starships/';
    }

    static getEndpointFromFullUrl(fullUrl) {
        const url = new URL(fullUrl);
        const fullPath = url.pathname + url.search;
        return fullPath.replace('/api/', '');
    }

    static getResourceEndpoint(resourceName) {
        return `${resourceName}/`;
    }

    static getRootEndPoint() {
        return '';
    }
}

module.exports = TestEndPoints;
