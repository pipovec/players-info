import React, { Component } from 'react';

class DeltaComponent extends Component {
   

    render() {
        var trieda = "text-center"
        var result = 0.00

        if (this.props.snapShot !== 0) {
            result = (parseFloat(this.props.now).toPrecision(3) - parseFloat(this.props.snapShot).toPrecision(3))            
            console.log(this.props.now+" - "+this.props.snapShot)
            if (result > 0.00) trieda = "bg-green text-center";
            if (result < 0.00) trieda = "bg-red text-center";
        }


        return (
            
            <td className={trieda}>{result}</td>
        )
    }


}

export default DeltaComponent;