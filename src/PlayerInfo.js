import React, { Component } from 'react';

class PlayerInfo extends Component {


    readPlayerInfoHeaders() {
                
        const keys = Object.getOwnPropertyNames(this.props.data);
        const head = Object.getOwnPropertyNames(this.props.data[keys]);
        
        const Headers = head.map( (k) => {            
          return k !== "statistics" && k!=='client_language' && k!== 'private' ? <th className="text-center" key={k}>{k}</th> : null
        })
        return Headers;
    }

    readPlayerInfoData() {
        const keys = Object.getOwnPropertyNames(this.props.data);
        const data = Object.getOwnPropertyNames(this.props.data[keys]);

        const Data = data.map( (k) => {        
            if(k !== "statistics" && k!== 'client_language' && k!== 'private') {   
                if( k === 'last_battle_time' || k === 'created_at' || k === 'updated_at' || k === 'logout_at' ) {
                    let time = this.timeConverter(this.props.data[keys][k])
                    return   <td className="text-center" key={k+1}>{time}</td>
                }
                else {
                    return   <td className="text-center" key={k+1}> {this.props.data[keys][k]}</td>
                }
                 
            }
          })
          return Data;

    }

    timeConverter(UNIX_timestamp){
        var a = new Date(UNIX_timestamp * 1000);
        var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
        var year = a.getFullYear();
        var month = months[a.getMonth()];
        var date = a.getDate();
        var hour = a.getHours();
        var min = a.getMinutes();
        var sec = a.getSeconds();
        var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec ;
        return time;
    }

    render() {   
        const head = this.readPlayerInfoHeaders();
        const data = this.readPlayerInfoData();

        return(
            <div className="mb-1">   
                <h3>Info about player</h3>
                <table className="table mb-1"> 
                    <thead><tr>{head}</tr></thead>
                    <tbody>
                        <tr>{data}</tr>
                    </tbody>      
                    
                </table>
            </div>
        );
    };


}

export default PlayerInfo;
