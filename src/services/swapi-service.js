

export default class SwapiService {
    _apiBase = `https://www.swapi.co/api`

     getResource = async (url) => {

        const result = await fetch(`${this._apiBase}${url}`)

        if(!result.ok){
            throw new Error(`Could not fetch ${url}` +
                `, received ${result.status}`)
        }
        return await result.json()
    }

    getAllPeople = async () => {
        const result = await this.getResource(`/people/`)
        return result.result.map(this._transformPerson)
    }

    getPerson = async (id) => {
        const person = await this.getResource(`/people/${id}`)
        return this._transformPerson(person)
    }

    getAllPlanets = async () => {
        const result = await this.getResource(`/planets/`)
        return result.result.map(this._transformPlanet)
    }

    getPlanet = async (id) => {
        const planet = await this.getResource(`/planets/${id}`)
        return this._transformPlanet(planet)
    }

    getAllStarships = async () => {
        const result = await this.getResource(`/starships/`)
        return result.result.map(this._transformStarship)
    }

    getStarships = async (id) => {
        const starship = await this.getResource(`/starships/${id}`)
        return this._transformStarship(starship)
    }

    _extractId = (item) => {
        const idRegExp = /\/([0-9]*)\/$/
        return item.url.match(idRegExp)[1]
    }

    _transformPlanet = (planet) => {

        return {
                id: this._extractId(planet),
                name: planet.name,
                population: planet.population,
                rotationPeriod: planet.rotation_period,
                diameter: planet.diameter
        }
    }

    _transformPerson = (person) => {

        return {
            id: this._extractId(person),
            name: person.name,
            gender: person.gender,
            birthYear: person.bitrh_year,
            eyeColor: person.eye_color,
        }
    }

    _transformStarship = (starship) => {

        return {
            id: this._extractId(starship),
            name: starship.name,
            model: starship.model,
            manufacturer: starship.manufacturer,
            costInCredits: starship.costInCredits,
            length: starship.length,
            crew: starship.crew,
            passengers: starship.passengers,
            cargoCapacity: starship.cargoCapacity
        }
    }
}


