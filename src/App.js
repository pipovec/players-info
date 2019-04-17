import React, { Component } from 'react';
import './template.css';

import PlayerInfo from './PlayerInfo';
import Menu from './Menu';

const URL = 'https://api.worldoftanks.eu/wot/account/list/?application_id=883ff6ceefb13177357ffea34d6fb06f&search='
const URL2 = 'https://api.worldoftanks.eu/wot/account/info/?application_id=883ff6ceefb13177357ffea34d6fb06f&account_id='
const URL3 = 'https://api.worldoftanks.eu/wot/tanks/stats/?application_id=883ff6ceefb13177357ffea34d6fb06f'
const vehicleFileds = 'tank_id,all.battles,all.damage_dealt,all.frags,all.wins,all.spotted,all.dropped_capture_points'


class App extends Component {
  constructor() {
    super();
    this.state = {
      account_id: '',      
      playerStat: '',
      vehicleStat: '',
      statPlayers: false,
      statVehicle: false,
      checked: true,
    };

    this.findNick = this.findNick.bind(this);    
    this.loadPlayerStat = this.loadPlayerStat.bind(this);
    this.doRequest = this.doRequest.bind(this);
  }
  

  doRequest(event) {
    let nick = event.target.nickname.value;   
    
    event.preventDefault();
    document.title = "Hracske staty | " + nick;
    this.findNick(nick);
  }


  findNick(nick) {
    let id;
    fetch(URL + nick, id)
      .then((resp) => {
        return resp.json();
      })
      .then((result) => {
        //this.setState({ account_id: result.data[0].account_id });
        return result.data[0].account_id;
      })
      .then((account_id) => {
        this.loadPlayerStat(account_id);
        this.loadVehicleStat(account_id);
      });
    

  };


  loadPlayerStat(id) {
    fetch(URL2 + id)
      .then((resp) => {
        if (resp.status !== 200) {
          console.log('Chyba, status kod: ' + resp.status);
        }
        else {
          return resp.json();
        }

      })
      .then((result) => {
        if (result.status === "ok") {
          this.setState({ playerStat: result.data, statPlayers: true, account_id: id });
        } else {
          this.setState({ playerStat: { "Status": 'not found' } });
        }

      });
  };

  loadVehicleStat(id){
    
    fetch(URL3, {
      method: 'POST',      
      body: "&account_id="+id+"&fields"+vehicleFileds 
    })
    .then((res) => res.json())      
    .then((result) => {
      
      this.setState({vehicleStat: result })
    });

  }

  render() {
    let playerInfo = <div></div>;       

    
    /** Podmienene zobrazenie hracskych statov */
    let menu        
    if ( this.state.statPlayers) {
      menu = <div><Menu  account_id={this.state.account_id} data={this.state.playerStat}/></div>;
    }
    else{
      
    }


    if (this.state.statPlayers) {
      playerInfo = <div className="shadow"><PlayerInfo account_id={this.state.account_id} data={this.state.playerStat} /></div>;      
    }
    else {

    }

    return (
      <div className="">
        <form onSubmit={this.doRequest}>
          <input type="text" name="nickname" />
          <input type="submit" value="Najdi" />
        </form>
        {playerInfo}        
        {menu}
      </div>
    );
  }
}

export default App;
