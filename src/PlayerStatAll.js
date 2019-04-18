import React, { Component } from 'react';
import DeltaComponent from './DeltaComponent.js'

class PlayerStatAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoadForm: false
        }        
    }



    readPlayerStatHeaders() {

        let All
        if (typeof this.props.data !== 'undefined') {
            let all = Object.keys(this.props.data)
            

            All = all.map((k) => {
                return <tr key={k + 989}><td className="text-right">{k}</td><td className="text-center">{this.props.data[k]}</td><DeltaComponent now={this.props.data[k]} past={this.props.snapShot[k]} /></tr>
            })
        }

        return All;
    }


    render() {
        const headers = this.readPlayerStatHeaders();

        return (
            <div>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th colSpan="2" className="text-center">Players statistics all</th>
                            <th>Delta</th>
                        </tr>
                    </thead>
                    <tbody>
                        {headers}
                    </tbody>
                </table>
            </div>
        )
    }

}

export default PlayerStatAll;