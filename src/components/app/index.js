import React, {Component} from "react";
import './app.css'
import Header from "../header";
import ItemList from "../item-list";
import PersonDetails from "../person-details";
import RandomPlanet from "../random-planet";

export default class App extends Component{

    state = {
        showRandomPlanet: true,
        selectedPerson: null
    }

    toggleRandomPlanet = () => {
        this.setState((state) => {
            return {
                showRandomPlanet: !state.showRandomPlanet
            }
        })
    }

    onPersonSelected = (id) => {
        this.setState({
            selectedPerson: id
        })
    }

    render() {

        const randomPlanet = this.state.showRandomPlanet ? <RandomPlanet /> : null
        return (
            <div >
                <Header />
                {randomPlanet}

                <button className='button-row'
                        onClick={this.toggleRandomPlanet}>
                    Toggle Planet
                </button>

                <div className='row mb-2'>
                    <div className='col-md-6'>
                        <ItemList onItemSelected={this.onPersonSelected}/>
                    </div>
                    <div className='col-md-6'>
                        <PersonDetails personId={this.state.selectedPerson}/>
                    </div>
                </div>
            </div>
        )
    }
}

