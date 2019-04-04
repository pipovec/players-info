import React, { Component } from 'react';

class PlayerStat extends Component {
        

    render() {
        var riadok;
        console.log(this.props.stat);
        if(typeof this.props.stat !== "undefined") {
            var keys = Object.keys(this.props.stat);
        
        riadok = keys.map((value,index)=>            
            <tr key={index} ><td>{this.props.stat[value]}</td></tr>
        );
        
        }

        var nazov;

        if(typeof this.props.stat !== "undefined") {
            var keys = Object.keys(this.props.stat);           
        
            nazov = keys.map((key) => 
                <tr key={key} id="th"><th>{key}</th></tr>
            );

        }
        
        
        
        return(
            <div>
                <h4>{this.props.table}</h4>
                <div id="staty">
                    <table id={this.props.table}>
                        <tbody>
                            {nazov}
                        </tbody>
                    </table>
                </div>
                
                <div id="staty">
                <table id={this.props.table}>
                    <tbody>
                        {riadok}
                    </tbody>
                </table>
                </div>
                
            </div>
        );
    }

}

export default PlayerStat;