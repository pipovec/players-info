import React, { Component } from 'react';

class PlayerStatAll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showLoadForm: false
        }
        const statTable = 'all';
    }



    readPlayerStatHeaders() {

        let All
        if (typeof this.props.data !== 'undefined') {
            let all = Object.keys(this.props.data)

            All = all.map((k) => {
                return <tr key={k + 989}><td >{k}</td><td>{this.props.data[k]}</td></tr>
            })
        }

        return All;
    }


    render() {
        const headers = this.readPlayerStatHeaders();

        return (
            <div className="">
                
                <table className="table table-striped table-sm col-2">
                    <thead>
                    <h5 className="text-center">Players statistics all</h5>
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