import React, { Component } from 'react';

class DeltaComponent extends Component {
   

    render() {
        var trieda
        var result
        var mark = ""
                
        if(typeof this.props.past === 'undefined' ) {
            trieda = "text-center"
            result = 0.00
        }        
        else {
            if (this.props.past !== 0) {
                
                let now = this.props.now
                let past = this.props.past
    
                result = now - past
    
                //console.log(now +" - "+past)
                if (result > 0.00) {trieda = "bg-green text-center"; mark = "+";}
                if (result < 0.00) {trieda = "bg-red text-center"; mark = "";};
                if (result === 0.00) {trieda = "text-center"; mark = "";};
            }
        }

        return (
            
            <td className={trieda}>{mark}{result.toFixed(2)}</td>
        )
    }


}

export default DeltaComponent;