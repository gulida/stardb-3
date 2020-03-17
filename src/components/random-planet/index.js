import React, {Component} from "react";
import SwapiService from "../../services/swapi-service";
import './random-planet.css'
import Spinner from "../spinner";
import ErrorIndicator from "../error-indicator";

export default class RandomPlanet extends Component {

    swapiService = new SwapiService()

    state = {
        planet: {},
        loading: true,
        error: false
    }

    constructor() {
        super();
        console.log('constructor')
    }

    componentDidMount() {
        console.log('did mount')
        this.updatePlanet()
        setInterval(this.updatePlanet, 5000)
    }

    componentWillUnmount() {
        console.log('unmount')
    }

    onError = (error) => {
        this.setState({
            error: true,
            loading: false
        })
    }

    onPlanetLoaded = (planet) => {
        this.setState({
            planet,
            loading: false
        })
    }

    updatePlanet = () => {
        console.log('update')
        const id = Math.floor(Math.random() * 25) + 2
        this.swapiService
            .getPlanet(id)
            .then(this.onPlanetLoaded)
            .catch(this.onError)
    }

    render() {

        const { planet, loading, error } = this.state

        const hasData = !(loading || error)

        const spinner = loading ? <Spinner/> : null

        const errorMessage = error ? <ErrorIndicator/> : null

        const content = hasData ? <PlanetView planet={planet} /> : null


         return (
            <div className='random-planet jumbotron rounded'>
                {spinner}
                {content}
                {errorMessage}
            </div>
        )
    }
}

const PlanetView = ({ planet }) => {
    const { id, name, population, rotationPeriod, diameter } = planet

    return (
        <React.Fragment>
            <img className="planet-image" src={`https://starwars-visualguide.com/assets/img/planets/${id}.jpg`} alt='planet'/>
            <div>
                <h4>
                    {name}
                </h4>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'>
                        <span className='term'>Population </span>
                        <span>{population}</span>
                    </li>
                    <li className='list-group-item'>
                        <span className='term'>Rotation period </span>
                        <span>{rotationPeriod}</span>
                    </li>
                    <li className='list-group-item'>
                        <span className='term'>Diameter </span>
                        <span>{diameter}</span>
                    </li>
                </ul>
            </div>
        </React.Fragment>
    )
}