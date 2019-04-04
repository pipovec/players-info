import React, { Component } from 'react';

class PlayerInfo extends Component {


    readPlayerInfoHeaders() {
                
        const keys = Object.getOwnPropertyNames(this.props.data);
        const head = Object.getOwnPropertyNames(this.props.data[keys]);
        
        const Headers = head.map( (k) => {            
          return k !== "statistics" && k!=='client_language' && k!== 'private' ? <th key={k}>{k}</th> : null
        })
        return Headers;
    }

    readPlayerInfoData() {
        const keys = Object.getOwnPropertyNames(this.props.data);
        const data = Object.getOwnPropertyNames(this.props.data[keys]);

        const Data = data.map( (k) => {            
            return k !== "statistics" && k!== 'client_language' && k!== 'private' ? <td key={k+1}>{this.props.data[keys][k]}</td> : null
          })
          return Data;

    }

    render() {   
        const head = this.readPlayerInfoHeaders();
        const data = this.readPlayerInfoData();

        return(
            <div className="card-body">   
                <h3 className="card-title">Info about player</h3>
                <table className="table"> 
                    <thead className="thead-light"><tr>{head}</tr></thead>
                    <tbody>
                        <tr>{data}</tr>
                    </tbody>      
                    
                </table>
            </div>
        );
    };


}

export default PlayerInfo;
