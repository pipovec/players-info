import React, { Component } from 'react';
import './App.css';

import PlayerInfo from './PlayerInfo';
import PlayersStatAll from './PlayersStatAll';

const URL = 'https://api.worldoftanks.eu/wot/account/list/?application_id=883ff6ceefb13177357ffea34d6fb06f&search=';
const URL2 = 'https://api.worldoftanks.eu/wot/account/info/?application_id=883ff6ceefb13177357ffea34d6fb06f&account_id=';

class App extends Component {
  constructor() {
    super();
    this.state = {
        account_id: '',
        nickname: '',
        playerStat: '',
    };

    this.findNick = this.findNick.bind(this);
    this.changeInputValue = this.changeInputValue.bind(this);
    this.loadPlayerStat =  this.loadPlayerStat.bind(this);
    this.doRequest = this.doRequest.bind(this);
  }

  changeInputValue( e ) {
    this.setState({nickname: e.target.value});
  };

  doRequest(event) {    
    event.preventDefault();
    this.findNick();    
  }

  
  findNick() { 
    let id; 
    fetch( URL + this.state.nickname, id)
    .then( (resp) => {
        return resp.json();
    })
    .then( (result) => {
      this.setState({account_id: result.data[0].account_id, nickname: result.data[0].nickname });      
      return result.data[0].account_id;
    })
    .then( (account_id) => {            
      this.loadPlayerStat(account_id);
    });
    document.title = "Hracske staty | "+ this.state.nickname; 

  };

  
  loadPlayerStat(account_id) {           
    fetch( URL2 + account_id)    
    .then((resp) => {
        if( resp.status !== 200 ){
          console.log('Chyba, status kod: '+ resp.status);
        }
        else {
          return resp.json();
        }
        
    })
    .then ( (result) => {
      if(result.status === "ok") {
        this.setState({playerStat: result.data});
      }else{
        this.setState({playerStat: {"Status": 'not found'}});
      }
      
    });
  };

  render() {
    let player;
    let stat_all;
    let dlzka = JSON.stringify(this.state.account_id).length;    
    

    if( dlzka > 5) {
      player    =   <PlayerInfo account_id={this.state.account_id} data={this.state.playerStat}/>;
      stat_all  =   <div><PlayersStatAll data={this.state.playerStat} account_id={this.state.account_id} /></div>
    }else {
      player = <div></div>;
    }

    return (
      <div className="ReactApp">
        <form onSubmit={this.doRequest}>
          <input type="text" value={this.state.nickname} onChange={this.changeInputValue}/>
          <input type="submit" value="Najdi" />
        </form>
        <div className="card mt-1">{player}</div>
        <div className="card mt-1">{stat_all}</div>
      </div>
    );
  }
}

export default App;
