import React, { Component } from 'react';
import Winrate from './Winrate.js'

class VehicleStatAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            battles: "all"
        }
        this.Change = this.Change.bind(this)
    }

    Change(event) {
        this.setState({battles: event.target.value})
        event.preventDefault()
        console.log(event.target.value)
    }

    avgValue(battles, variable){
        return (variable / battles).toFixed(4)
    }

    tankyAll() {
        let account_id = Object.keys(this.props.vehicle)
        let vehicles = this.props.vehicle[account_id[0]]
        let id = Object.keys(vehicles)        

        let result = id.map((key) => {            
            if(vehicles[key][this.state.battles].battles !== 0) {
                return <tr className="text-center" key={vehicles[key].tank_id}>
                <td className="text-center">{vehicles[key].tank_id}</td>
                <td className="text-center">{vehicles[key][this.state.battles].battles}</td>
                <td className="text-center">{this.avgValue( vehicles[key][this.state.battles].battles, vehicles[key][this.state.battles].frags)}</td>
                <td className="text-center">{this.avgValue( vehicles[key][this.state.battles].battles,vehicles[key][this.state.battles].damage_dealt)}</td>
                <td className="text-center">{this.avgValue( vehicles[key][this.state.battles].battles,vehicles[key][this.state.battles].spotted)}</td>
                <td className="text-center">{this.avgValue( vehicles[key][this.state.battles].battles,vehicles[key][this.state.battles].dropped_capture_points)}</td>
                <Winrate  wins={vehicles[key][this.state.battles].wins} battles={vehicles[key][this.state.battles].battles}/>
            </tr>
            }
            
        })

        return result
    }


    render() {

        let vehiclesAll = this.tankyAll()

        return (<div>
            <div className="row"><h3>Tu budu snapshot statistiky tankov</h3></div>
            <div className="row">                
                <button className="col-1 button" onClick={this.Change} type="button" value="all">All</button>
                <button className="col-1 button" onClick={this.Change} type="button" value="clan">Clan</button>
                <button className="col-1 button" onClick={this.Change} type="button" value="globalmap">Global map</button>
                <button className="col-1 button" onClick={this.Change} type="button" value="stronghold_skirmish">Skirmish</button>
                <button className="col-1 button" onClick={this.Change} type="button" value="stronghold_defense">Defense</button>
            </div>

            <div className="row">
                <div className="col-6">
                    <table>
                        <thead>
                            <tr>
                            <th className="text-center">tank id</th>
                            <th className="text-center">battles</th>
                            <th className="text-center">avg frags</th>
                            <th className="text-center">avg dmg</th>
                            <th className="text-center">avg spot</th>
                            <th className="text-center">avg def</th>
                            <th className="text-center">winrate</th>
                            <th className="text-center">wn8</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vehiclesAll}
                        </tbody>
                    </table>
                </div>
            </div>

        </div>)
    }
}

export default VehicleStatAll;