import React, { Component } from 'react';

class DeltaComponent extends Component {
   

    render() {
        var trieda
        var result
        console.log(this.props.snapShot)
        if(typeof this.props.snapShot === 'undefined' ) {
            trieda = "text-center"
            result = 0.00
        }
        else {
            if (this.props.snapShot !== 0) {
                
                let now = this.props.now
                let past = this.props.past
    
                result = now - past
    
                //console.log(now +" - "+past)
                if (result > 0.00) trieda = "bg-green text-center";
                if (result < 0.00) trieda = "bg-red text-center";
            }
        }

        return (
            
            <td className={trieda}>{result}</td>
        )
    }


}

export default DeltaComponent;