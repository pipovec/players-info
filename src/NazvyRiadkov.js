import React, { Component } from 'react';

class NazvyRiadkov extends Component {
        

    render() {
        var riadok;

        if(typeof this.props.stat !== "undefined") {
            var keys = Object.keys(this.props.stat);           
        
            riadok = keys.map((key) => 
                <tr key={key}><th>{key}</th></tr>
            );

        }
        

        
        return(
            <div>
                <h4>Nazvy kategorii</h4>
                <table id="1">
                    <tbody>
                        {riadok}
                    </tbody>
                </table>
            </div>
        );
    }

}

export default NazvyRiadkov;