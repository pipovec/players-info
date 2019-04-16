import React, { Component } from 'react';

class DeltaComponent extends Component {
    constructor(props) {
        super(props);
    }



    render() {
        let trieda = ""
        let result = 0
        if (this.props.snapShot != 0) {
            let result = this.props.now - this.props.snapShot


            if (result > 0) trieda = "bg-green";
            if (result < 0) trieda = "bg-red";
        }


        return (
            <td className={trieda}>{result}</td>
        )
    }


}

export default DeltaComponent;